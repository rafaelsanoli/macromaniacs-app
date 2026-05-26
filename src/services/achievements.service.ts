import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockBadges, mockMedals } from "@/mocks/achievements.mock";
import type { Badge, Medal } from "@/types/achievements";

export type AchievementsSummary = {
  badges: Badge[];
  medals: Medal[];
};

const mockAchievementsService = {
  getAchievements: async (): Promise<AchievementsSummary> => ({
    badges: mockBadges,
    medals: mockMedals,
  }),
};

const apiAchievementsService = {
  getAchievements: async (): Promise<AchievementsSummary> => {
    const [badges, medals] = await Promise.all([
      api.get<Badge[]>("/profile/badges"),
      api.get<Medal[]>("/profile/medals"),
    ]);
    return { badges: badges.data, medals: medals.data };
  },
};

export const achievementsService = USE_MOCKS
  ? mockAchievementsService
  : apiAchievementsService;
