import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockDietDraft, mockDietPlan } from "@/mocks/diet.mock";
import type { DietDraft, DietPlan } from "@/types/diet";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockDietService = {
  scanDiet: async (): Promise<DietDraft> => {
    await wait(700);
    return mockDietDraft;
  },
  getDraft: async (): Promise<DietDraft> => mockDietDraft,
  getActiveDiet: async (): Promise<DietPlan> => mockDietPlan,
  confirmDiet: async (): Promise<DietPlan> => mockDietPlan,
};

const apiDietService = {
  scanDiet: async (): Promise<DietDraft> => {
    const response = await api.post<DietDraft>("/diet/scan");
    return response.data;
  },
  getDraft: async (): Promise<DietDraft> => {
    const response = await api.get<DietDraft>("/diet/active");
    return response.data;
  },
  getActiveDiet: async (): Promise<DietPlan> => {
    const response = await api.get<DietPlan>("/diet/active");
    return response.data;
  },
  confirmDiet: async (): Promise<DietPlan> => {
    const response = await api.post<DietPlan>("/diet/confirm");
    return response.data;
  },
};

export const dietService = USE_MOCKS ? mockDietService : apiDietService;
