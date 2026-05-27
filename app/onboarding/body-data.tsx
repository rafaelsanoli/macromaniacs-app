import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { ShieldAlert } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { OnboardingOptionCard } from "@/components/onboarding/OnboardingOptionCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { onboardingService } from "@/services/onboarding.service";
import { useAppTheme } from "@/store/theme.store";

const goals = [
  { id: "cutting", title: "Cutting", description: "Ficar dentro da meta e bater proteina." },
  { id: "bulking", title: "Bulking", description: "Bater calorias e nao pular refeicao." },
  { id: "maintenance", title: "Manutencao", description: "Manter rotina e consistencia." },
  { id: "recomposition", title: "Recomposicao", description: "Acompanhar dieta e performance." },
  { id: "compete", title: "Apenas competir", description: "Entrar no ranking com a galera." },
  { id: "track", title: "Acompanhar dieta", description: "Organizar o plano sem complicar." },
] as const;

export default function BodyDataScreen() {
  const theme = useAppTheme();
  const [age, setAge] = useState("24");
  const [height, setHeight] = useState("178");
  const [weight, setWeight] = useState("82");
  const [goal, setGoal] = useState<(typeof goals)[number]["id"]>("cutting");
  const saveMutation = useMutation({
    mutationFn: () => onboardingService.saveBodyData({ age, height, weight, goal }),
    onSuccess: () => router.push("/onboarding/diet-scan"),
  });

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Dados fisicos"
        title="Calcula o tabuleiro."
        subtitle="Esses dados organizam seu perfil e seus desafios."
      />
      <View style={styles.grid}>
        <ManiacInput keyboardType="number-pad" label="Idade" onChangeText={setAge} value={age} />
        <ManiacInput
          keyboardType="number-pad"
          label="Altura em cm"
          onChangeText={setHeight}
          value={height}
        />
        <ManiacInput
          keyboardType="decimal-pad"
          label="Peso em kg"
          onChangeText={setWeight}
          value={weight}
        />
      </View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Objetivo atual
      </Text>
      <View style={styles.options}>
        {goals.map((item) => (
          <OnboardingOptionCard
            key={item.id}
            description={item.description}
            onPress={() => setGoal(item.id)}
            selected={goal === item.id}
            title={item.title}
          />
        ))}
      </View>
      <View style={[styles.notice, { borderColor: theme.colors.border }]}>
        <ShieldAlert color={theme.colors.accent} size={18} />
        <Text style={[styles.noticeText, { color: theme.colors.mutedText }]}>
          Nao substitui medico ou nutricionista. O app gamifica dados fornecidos
          por voce e nao prescreve dieta automaticamente.
        </Text>
      </View>
      <ManiacButton
        label="Escanear dieta"
        loading={saveMutation.isPending}
        onPress={() => saveMutation.mutate()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 18,
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
