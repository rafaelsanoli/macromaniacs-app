import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { CheckCircle2, Plus, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { dietService } from "@/services/diet.service";
import type { DietMeal } from "@/types/diet";
import type { MacroSummary } from "@/types/macros";
import { useAppTheme } from "@/store/theme.store";

const emptyTargets: MacroSummary = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
};

export default function DietReviewScreen() {
  const theme = useAppTheme();
  const [targets, setTargets] = useState<MacroSummary>(emptyTargets);
  const [meals, setMeals] = useState<DietMeal[]>([]);
  const { data: draft, isLoading } = useQuery({
    queryKey: ["diet-draft"],
    queryFn: dietService.getDraft,
  });
  const confirmMutation = useMutation({
    mutationFn: dietService.confirmDiet,
    onSuccess: () => router.push("/onboarding/group-entry"),
  });

  useEffect(() => {
    if (draft) {
      setTargets(draft.dailyTargets);
      setMeals(draft.meals);
    }
  }, [draft]);

  const updateTarget = (key: keyof MacroSummary, value: string) => {
    setTargets((current) => ({
      ...current,
      [key]: Number(value) || 0,
    }));
  };

  const updateMeal = (mealId: string, updates: Partial<DietMeal>) => {
    setMeals((current) =>
      current.map((meal) => (meal.id === mealId ? { ...meal, ...updates } : meal)),
    );
  };

  const removeMeal = (mealId: string) => {
    setMeals((current) => current.filter((meal) => meal.id !== mealId));
  };

  const addMeal = () => {
    setMeals((current) => [
      ...current,
      {
        id: `meal_${Date.now()}`,
        name: "Nova refeicao",
        time: "",
        items: [],
        macros: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      },
    ]);
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Revisao"
        title="Confere a dieta."
        subtitle="Ajuste metas e refeicoes antes de confirmar."
      />
      {isLoading || !draft ? (
        <LoadingManiac />
      ) : (
        <>
          <ManiacCard strong style={styles.targets}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Metas diarias
            </Text>
            <View style={styles.grid}>
              <ManiacInput
                keyboardType="number-pad"
                label="Kcal"
                onChangeText={(value) => updateTarget("calories", value)}
                value={String(targets.calories)}
              />
              <ManiacInput
                keyboardType="number-pad"
                label="Proteina"
                onChangeText={(value) => updateTarget("protein", value)}
                value={String(targets.protein)}
              />
              <ManiacInput
                keyboardType="number-pad"
                label="Carbo"
                onChangeText={(value) => updateTarget("carbs", value)}
                value={String(targets.carbs)}
              />
              <ManiacInput
                keyboardType="number-pad"
                label="Gordura"
                onChangeText={(value) => updateTarget("fat", value)}
                value={String(targets.fat)}
              />
            </View>
          </ManiacCard>

          <View style={styles.meals}>
            {meals.map((meal) => (
              <ManiacCard key={meal.id}>
                <View style={styles.mealHeader}>
                  <View style={styles.mealFields}>
                    <ManiacInput
                      label="Refeicao"
                      onChangeText={(value) => updateMeal(meal.id, { name: value })}
                      value={meal.name}
                    />
                    <ManiacInput
                      label="Horario"
                      onChangeText={(value) => updateMeal(meal.id, { time: value })}
                      value={meal.time ?? ""}
                    />
                  </View>
                  <ManiacButton
                    icon={<Trash2 color="#FFFFFF" size={16} />}
                    label="Remover"
                    onPress={() => removeMeal(meal.id)}
                    variant="secondary"
                  />
                </View>
                <Text style={[styles.mealMacros, { color: theme.colors.mutedText }]}>
                  {meal.macros.calories} kcal · {meal.macros.protein}g proteina ·{" "}
                  {meal.macros.carbs}g carbo · {meal.macros.fat}g gordura
                </Text>
                {meal.items.map((item) => (
                  <Text
                    key={item.id}
                    style={[styles.item, { color: theme.colors.mutedText }]}
                  >
                    - {item.food} · {item.quantity}
                  </Text>
                ))}
              </ManiacCard>
            ))}
          </View>

          <View style={styles.actions}>
            <ManiacButton
              icon={<Plus color="#FFFFFF" size={18} />}
              label="Adicionar refeicao"
              onPress={addMeal}
              variant="secondary"
            />
      <ManiacButton
        icon={<CheckCircle2 color="#FFFFFF" size={18} />}
        label="Confirmar dieta"
        loading={confirmMutation.isPending}
        onPress={() => confirmMutation.mutate({ dailyTargets: targets, meals })}
      />
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  targets: {
    gap: 14,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
  grid: {
    gap: 10,
  },
  meals: {
    gap: 12,
    marginBottom: 18,
  },
  mealHeader: {
    gap: 10,
  },
  mealFields: {
    gap: 10,
  },
  mealMacros: {
    fontSize: 13,
    fontWeight: "800",
    marginTop: 12,
  },
  item: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 6,
  },
  actions: {
    gap: 10,
  },
});
