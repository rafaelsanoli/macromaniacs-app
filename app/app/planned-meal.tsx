import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router, type Href } from "expo-router";
import { CheckCircle2, Utensils } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { mockDietPlan } from "@/mocks/diet.mock";
import { checkInService } from "@/services/checkin.service";
import { useAppTheme } from "@/store/theme.store";

export default function PlannedMealScreen() {
  const theme = useAppTheme();
  const queryClient = useQueryClient();
  const confirmMutation = useMutation({
    mutationFn: checkInService.confirmPlannedMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["daily-macros"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      router.push("/app/check-in-success" as Href);
    },
  });

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Refeição planejada"
        title="Escolhe a marmita."
        subtitle="Cumpriu o plano? O ranking precisa saber."
      />
      <View style={styles.list}>
        {mockDietPlan.meals.map((meal, index) => (
          <ManiacCard key={meal.id} strong={index === 1}>
            <View style={styles.row}>
              <View style={[styles.icon, { backgroundColor: theme.colors.primary }]}>
                <Utensils color="#FFFFFF" size={22} />
              </View>
              <View style={styles.copy}>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                  {meal.name}
                </Text>
                <Text style={[styles.meta, { color: theme.colors.mutedText }]}>
                  {meal.time} · {meal.macros.protein}g proteína ·{" "}
                  {meal.macros.calories} kcal
                </Text>
              </View>
            </View>
          </ManiacCard>
        ))}
      </View>
      <ManiacButton
        icon={<CheckCircle2 color="#FFFFFF" size={18} />}
        label="Confirmar almoço"
        loading={confirmMutation.isPending}
        onPress={() => confirmMutation.mutate()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    marginBottom: 18,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  icon: {
    alignItems: "center",
    borderRadius: 18,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  copy: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  meta: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
});
