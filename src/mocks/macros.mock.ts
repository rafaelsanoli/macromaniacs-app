import type { DailyMacros } from "@/types/macros";

export const mockDailyMacros: DailyMacros = {
  calories: { consumed: 1450, target: 2300, remaining: 850, percentage: 63 },
  protein: { consumed: 142, target: 180, remaining: 38, percentage: 79 },
  carbs: { consumed: 180, target: 250, remaining: 70, percentage: 72 },
  fat: { consumed: 44, target: 70, remaining: 26, percentage: 63 },
  status: "in_progress",
};
