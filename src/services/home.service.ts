import { USE_MOCKS } from "@/constants/config";
import type { DailyMacros } from "@/types/macros";
import { api } from "@/lib/api";
import { useDemoStore } from "@/store/demo.store";

const mockHomeService = {
  getDailyMacros: async (): Promise<DailyMacros> => useDemoStore.getState().dailyMacros,
};

const apiHomeService = {
  getDailyMacros: async (): Promise<DailyMacros> => {
    const response = await api.get<DailyMacros>("/macros/today");
    return response.data;
  },
};

export const homeService = USE_MOCKS ? mockHomeService : apiHomeService;
