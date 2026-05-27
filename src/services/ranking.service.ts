import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapRanking, unwrap } from "@/api/mappers";
import type { ApiEnvelope, ApiRanking } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockRanking } from "@/mocks/ranking.mock";
import type { Ranking } from "@/types/ranking";

export type RankingParams = {
  groupId?: string;
  period?: string;
  metric?: string;
};

const mockRankingService = {
  getRanking: async (params?: RankingParams): Promise<Ranking> => ({
    ...mockRanking,
    period: params?.period ?? mockRanking.period,
  }),
};

const apiRankingService = {
  getRanking: async (params?: RankingParams): Promise<Ranking> => {
    const response = await api.get<ApiEnvelope<ApiRanking>>(
      endpoints.groups.ranking(params?.groupId ?? "current"),
      {
        params: {
          period: params?.period,
          metric: params?.metric,
        },
      },
    );
    return mapRanking(unwrap(response.data));
  },
};

export const rankingService = USE_MOCKS
  ? mockRankingService
  : apiRankingService;
