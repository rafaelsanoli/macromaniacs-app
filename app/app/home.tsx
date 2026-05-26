import { router, type Href } from "expo-router";
import { Flame, Plus, Utensils } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { AvatarPreview } from "@/components/avatar/AvatarPreview";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { MacroCounterCard } from "@/components/macros/MacroCounterCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { mockAvatar, mockUser } from "@/mocks/user.mock";
import { useDemoStore } from "@/store/demo.store";
import { useAppTheme } from "@/store/theme.store";

export default function HomeScreen() {
  const theme = useAppTheme();
  const macros = useDemoStore((state) => state.dailyMacros);

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Home"
        title={`Bora, ${mockUser.name}.`}
        subtitle="Vai deixar a Ana passar?"
      />

      <ManiacCard style={styles.profileCard}>
        <AvatarPreview avatar={mockAvatar} size={84} />
        <View style={styles.profileCopy}>
          <Text style={[styles.profileTitle, { color: theme.colors.text }]}>
            Streak pegando fogo.
          </Text>
          <Text style={[styles.profileText, { color: theme.colors.mutedText }]}>
            6 dias limpo no jogo. Ranking #2 no clube.
          </Text>
        </View>
        <Flame color={theme.colors.accent} size={28} />
      </ManiacCard>

      <MacroCounterCard macros={macros} />

      <ManiacCard style={styles.nextMeal}>
        <Utensils color={theme.colors.accent} size={24} />
        <View style={styles.profileCopy}>
          <Text style={[styles.profileTitle, { color: theme.colors.text }]}>
            Próxima refeição: Almoço
          </Text>
          <Text style={[styles.profileText, { color: theme.colors.mutedText }]}>
            Frango, arroz, feijão e salada. Só mais um check-in limpo.
          </Text>
        </View>
      </ManiacCard>

      <ManiacButton
        icon={<Plus color="#FFFFFF" size={20} />}
        label="Registrar check-in"
        onPress={() => router.push("/app/check-in")}
      />
      <View style={styles.secondaryAction}>
        <ManiacButton
          label="Ver diário de macros"
          onPress={() => router.push("/app/macros" as Href)}
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    marginBottom: 16,
  },
  profileCopy: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },
  profileText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  nextMeal: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    marginVertical: 16,
  },
  secondaryAction: {
    marginTop: 10,
  },
});
