import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockUser } from "@/mocks/user.mock";
import type { User } from "@/types/user";

type AuthPayload = {
  email: string;
  password: string;
};

const mockAuthService = {
  login: async (_payload: AuthPayload): Promise<User> => mockUser,
  register: async (_payload: AuthPayload & { name: string; username: string }): Promise<User> =>
    ({ ...mockUser, onboardingCompleted: false }),
  me: async (): Promise<User> => mockUser,
};

const apiAuthService = {
  login: async (payload: AuthPayload): Promise<User> => {
    const response = await api.post<User>("/auth/login", payload);
    return response.data;
  },
  register: async (
    payload: AuthPayload & { name: string; username: string },
  ): Promise<User> => {
    const response = await api.post<User>("/auth/register", payload);
    return response.data;
  },
  me: async (): Promise<User> => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },
};

export const authService = USE_MOCKS ? mockAuthService : apiAuthService;
