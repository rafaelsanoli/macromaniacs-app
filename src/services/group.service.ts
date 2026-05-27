import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapGroup, unwrap } from "@/api/mappers";
import type { ApiEnvelope, ApiGroup } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockGroup } from "@/mocks/group.mock";
import type { Group } from "@/types/group";

export type GroupEntryPayload = {
  action: "create_club" | "join_group" | "create_challenge";
  name?: string;
  inviteCode?: string;
  durationDays?: number | null;
  mode?: string | null;
  privacy?: "public" | "private";
};

const mockGroupService = {
  getCurrentGroup: async (): Promise<Group> => mockGroup,
  createGroup: async (payload?: GroupEntryPayload): Promise<Group> => ({
    ...mockGroup,
    id: payload?.action === "create_challenge" ? "challenge_demo" : "group_demo",
    name: payload?.name || mockGroup.name,
    type: payload?.action === "create_challenge" ? "challenge" : "club",
    currentChallenge:
      payload?.action === "create_challenge"
        ? payload.name || "Desafio MacroManiacs"
        : mockGroup.currentChallenge,
    durationDays: payload?.durationDays ?? mockGroup.durationDays,
    mode: payload?.mode ?? mockGroup.mode,
    privacy: payload?.privacy ?? mockGroup.privacy,
  }),
  joinGroup: async (inviteCode: string): Promise<Group> => ({
    ...mockGroup,
    inviteCode: inviteCode || mockGroup.inviteCode,
  }),
};

const apiGroupService = {
  getCurrentGroup: async (): Promise<Group> => {
    const response = await api.get<ApiEnvelope<ApiGroup>>(endpoints.groups.current);
    return mapGroup(unwrap(response.data));
  },
  createGroup: async (payload?: GroupEntryPayload): Promise<Group> => {
    const response = await api.post<ApiEnvelope<ApiGroup>>(endpoints.groups.create, payload);
    return mapGroup(unwrap(response.data));
  },
  joinGroup: async (inviteCode: string): Promise<Group> => {
    const response = await api.post<ApiEnvelope<ApiGroup>>(endpoints.groups.join, {
      inviteCode,
    });
    return mapGroup(unwrap(response.data));
  },
};

export const groupService = USE_MOCKS ? mockGroupService : apiGroupService;
