import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockRanking } from "@/mocks/ranking.mock";
import type { Ranking } from "@/types/ranking";

const mockRankingService = {
  getRanking: async (): Promise<Ranking> => mockRanking,
};

const apiRankingService = {
  getRanking: async (groupId = "current"): Promise<Ranking> => {
    const response = await api.get<Ranking>(`/groups/${groupId}/ranking`);
    return response.data;
  },
};

export const rankingService = USE_MOCKS
  ? mockRankingService
  : apiRankingService;
