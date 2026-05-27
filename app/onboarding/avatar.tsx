import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Crown, Palette, Shirt, Smile } from "lucide-react-native";
import type React from "react";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AvatarPreview } from "@/components/avatar/AvatarPreview";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { mockAvatar } from "@/mocks/user.mock";
import type { AvatarPayload } from "@/services/onboarding.service";
import { onboardingService } from "@/services/onboarding.service";
import { useAppTheme } from "@/store/theme.store";

const options = {
  skinTone: ["light", "medium", "dark"],
  hairStyle: ["short", "curly", "buzz"],
  hairColor: ["black", "brown", "blonde"],
  expression: ["confident", "happy", "focused"],
  outfit: ["training", "casual", "club"],
  background: ["plain", "gym", "kitchen"],
};

export default function AvatarOnboardingScreen() {
  const theme = useAppTheme();
  const [avatar, setAvatar] = useState<AvatarPayload>({
    skinTone: mockAvatar.skinTone,
    hairStyle: mockAvatar.hairStyle,
    hairColor: mockAvatar.hairColor,
    expression: mockAvatar.expression,
    outfit: mockAvatar.outfit,
    accessory: mockAvatar.accessory,
    background: mockAvatar.background,
  });
  const saveMutation = useMutation({
    mutationFn: onboardingService.saveAvatar,
    onSuccess: () => router.push("/onboarding/body-data"),
  });

  const previewAvatar = {
    ...mockAvatar,
    ...avatar,
  };

  const setOption = (key: keyof AvatarPayload, value: string) => {
    setAvatar((current) => ({ ...current, [key]: value }));
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Avatar"
        title="Cria seu mascote."
        subtitle="Seu status no ranking vai aparecer nele."
      />
      <ManiacCard strong style={styles.preview}>
        <AvatarPreview avatar={previewAvatar} size={148} />
        <Text style={[styles.previewText, { color: theme.colors.text }]}>
          Configure o avatar inicial. Medalhas e acessorios entram depois por conquistas.
        </Text>
      </ManiacCard>
      <View style={styles.options}>
        <OptionGroup
          icon={<Palette color={theme.colors.text} size={18} />}
          label="Tom"
          onSelect={(value) => setOption("skinTone", value)}
          options={options.skinTone}
          value={avatar.skinTone}
        />
        <OptionGroup
          icon={<Crown color={theme.colors.text} size={18} />}
          label="Cabelo"
          onSelect={(value) => setOption("hairStyle", value)}
          options={options.hairStyle}
          value={avatar.hairStyle}
        />
        <OptionGroup
          icon={<Smile color={theme.colors.text} size={18} />}
          label="Expressao"
          onSelect={(value) => setOption("expression", value)}
          options={options.expression}
          value={avatar.expression}
        />
        <OptionGroup
          icon={<Shirt color={theme.colors.text} size={18} />}
          label="Roupa"
          onSelect={(value) => setOption("outfit", value)}
          options={options.outfit}
          value={avatar.outfit}
        />
      </View>
      <ManiacButton
        label="Salvar avatar"
        loading={saveMutation.isPending}
        onPress={() => saveMutation.mutate(avatar)}
      />
    </Screen>
  );
}

function OptionGroup({
  icon,
  label,
  onSelect,
  options,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  onSelect: (value: string) => void;
  options: string[];
  value: string;
}) {
  const theme = useAppTheme();

  return (
    <ManiacCard style={styles.group}>
      <View style={styles.groupHeader}>
        {icon}
        <Text style={[styles.groupLabel, { color: theme.colors.text }]}>{label}</Text>
      </View>
      <View style={styles.chips}>
        {options.map((option) => {
          const selected = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onSelect(option)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? theme.colors.text : theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: selected ? theme.colors.background : theme.colors.text },
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ManiacCard>
  );
}

const styles = StyleSheet.create({
  preview: {
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  previewText: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
    textAlign: "center",
  },
  options: {
    gap: 12,
    marginBottom: 18,
  },
  group: {
    gap: 12,
  },
  groupHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
  },
});
