import { router } from "expo-router";
import { ShieldAlert } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { OnboardingOptionCard } from "@/components/onboarding/OnboardingOptionCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useAppTheme } from "@/store/theme.store";

export default function BodyDataScreen() {
  const theme = useAppTheme();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Dados físicos"
        title="Calcula o tabuleiro."
        subtitle="A gente usa isso para organizar suas metas, nao para dar sermão."
      />
      <View style={styles.grid}>
        <ManiacInput keyboardType="number-pad" label="Idade" placeholder="24" />
        <ManiacInput keyboardType="number-pad" label="Altura" placeholder="178 cm" />
        <ManiacInput keyboardType="decimal-pad" label="Peso" placeholder="82 kg" />
      </View>
      <View style={styles.options}>
        <OnboardingOptionCard
          description="Bater macros com constancia."
          selected
          title="Ganhar performance"
        />
        <OnboardingOptionCard
          description="Organizar dieta sem virar planilha."
          title="Definir rotina"
        />
      </View>
      <View style={[styles.notice, { borderColor: theme.colors.border }]}>
        <ShieldAlert color={theme.colors.accent} size={18} />
        <Text style={[styles.noticeText, { color: theme.colors.mutedText }]}>
          Nao substitui medico ou nutricionista. O app gamifica dados fornecidos
          por voce.
        </Text>
      </View>
      <ManiacButton
        label="Escanear dieta"
        onPress={() => router.push("/onboarding/diet-scan")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: 12,
  },
  options: {
    gap: 12,
    marginVertical: 16,
  },
  notice: {
    alignItems: "flex-start",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
    padding: 14,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
  },
});
