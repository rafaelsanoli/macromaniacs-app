import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockAvatar, mockUser } from "@/mocks/user.mock";
import type { Avatar } from "@/types/avatar";
import type { User } from "@/types/user";

type BodyDataPayload = {
  age: string;
  height: string;
  weight: string;
  goal: string;
};

const mockOnboardingService = {
  saveAvatar: async (): Promise<Avatar> => mockAvatar,
  saveBodyData: async (_payload: BodyDataPayload): Promise<User> => mockUser,
};

const apiOnboardingService = {
  saveAvatar: async (): Promise<Avatar> => {
    const response = await api.post<Avatar>("/avatar");
    return response.data;
  },
  saveBodyData: async (payload: BodyDataPayload): Promise<User> => {
    const response = await api.post<User>("/profile/body-data", payload);
    return response.data;
  },
};

export const onboardingService = USE_MOCKS
  ? mockOnboardingService
  : apiOnboardingService;
