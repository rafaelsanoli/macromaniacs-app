import { USE_MOCKS } from "@/constants/config";
import { mockDailyMacros } from "@/mocks/macros.mock";
import type { DailyMacros } from "@/types/macros";
import { api } from "@/lib/api";

const mockHomeService = {
  getDailyMacros: async (): Promise<DailyMacros> => mockDailyMacros,
};

const apiHomeService = {
  getDailyMacros: async (): Promise<DailyMacros> => {
    const response = await api.get<DailyMacros>("/macros/today");
    return response.data;
  },
};

export const homeService = USE_MOCKS ? mockHomeService : apiHomeService;
