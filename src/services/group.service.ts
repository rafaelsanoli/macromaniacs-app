import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockGroup } from "@/mocks/group.mock";
import type { Group } from "@/types/group";

const mockGroupService = {
  createGroup: async (): Promise<Group> => mockGroup,
  joinGroup: async (_inviteCode: string): Promise<Group> => mockGroup,
};

const apiGroupService = {
  createGroup: async (): Promise<Group> => {
    const response = await api.post<Group>("/groups");
    return response.data;
  },
  joinGroup: async (inviteCode: string): Promise<Group> => {
    const response = await api.post<Group>("/groups/join", { inviteCode });
    return response.data;
  },
};

export const groupService = USE_MOCKS ? mockGroupService : apiGroupService;
