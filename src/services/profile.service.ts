import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockBadges, mockMedals } from "@/mocks/achievements.mock";
import { mockAvatar, mockUser } from "@/mocks/user.mock";
import type { Badge, Medal } from "@/types/achievements";
import type { Avatar } from "@/types/avatar";
import type { User } from "@/types/user";

export type ProfileSummary = {
  user: User;
  avatar: Avatar;
  badges: Badge[];
  medals: Medal[];
};

const mockProfileService = {
  getProfile: async (): Promise<ProfileSummary> => ({
    user: mockUser,
    avatar: mockAvatar,
    badges: mockBadges,
    medals: mockMedals,
  }),
};

const apiProfileService = {
  getProfile: async (): Promise<ProfileSummary> => {
    const response = await api.get<ProfileSummary>("/profile");
    return response.data;
  },
};

export const profileService = USE_MOCKS
  ? mockProfileService
  : apiProfileService;
