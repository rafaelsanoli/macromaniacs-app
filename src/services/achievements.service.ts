import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapBadge, mapDailyMission, mapGameTag, mapMedal, unwrap } from "@/api/mappers";
import type { ApiBadge, ApiDailyMission, ApiEnvelope, ApiGameTag, ApiMedal } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockBadges, mockDailyMissions, mockGameTags, mockMedals } from "@/mocks/achievements.mock";
import type { Badge, DailyMission, GameTag, Medal } from "@/types/achievements";

export type AchievementsSummary = {
  badges: Badge[];
  medals: Medal[];
  tags: GameTag[];
};

export type DailyMissionsSummary = {
  missions: DailyMission[];
  equippedTag?: GameTag | null;
};

let mockTagsState = mockGameTags;
let mockMissionsState = mockDailyMissions;

const mockAchievementsService = {
  getAchievements: async (): Promise<AchievementsSummary> => ({
    badges: mockBadges,
    medals: mockMedals,
    tags: mockTagsState,
  }),
  getDailyMissions: async (): Promise<DailyMissionsSummary> => ({
    missions: mockMissionsState,
    equippedTag: mockTagsState.find((tag) => tag.equipped) ?? null,
  }),
  claimMission: async (missionId: string): Promise<DailyMission> => {
    const mission = mockMissionsState.find((item) => item.id === missionId) ?? mockMissionsState[0];
    const unlockedTag = { ...mission.rewardTag, unlocked: true };
    mockTagsState = mockTagsState.map((tag) => (tag.id === unlockedTag.id ? unlockedTag : tag));
    mockMissionsState = mockMissionsState.map((item) =>
      item.id === mission.id
        ? { ...item, progress: item.target, status: "claimed", rewardTag: unlockedTag }
        : item,
    );
    return mockMissionsState.find((item) => item.id === mission.id) ?? mission;
  },
  equipTag: async (tagId: string): Promise<GameTag> => {
    mockTagsState = mockTagsState.map((tag) => ({
      ...tag,
      equipped: tag.id === tagId,
      unlocked: tag.id === tagId ? true : tag.unlocked,
    }));
    const equippedTag = mockTagsState.find((tag) => tag.id === tagId) ?? mockTagsState[0];
    mockMissionsState = mockMissionsState.map((mission) => ({
      ...mission,
      rewardTag:
        mission.rewardTag.id === equippedTag.id
          ? equippedTag
          : mockTagsState.find((tag) => tag.id === mission.rewardTag.id) ?? mission.rewardTag,
    }));
    return equippedTag;
  },
};

const apiAchievementsService = {
  getAchievements: async (): Promise<AchievementsSummary> => {
    const [badges, medals, tags] = await Promise.all([
      api.get<ApiEnvelope<ApiBadge[]>>(endpoints.profile.badges),
      api.get<ApiEnvelope<ApiMedal[]>>(endpoints.profile.medals),
      api.get<ApiEnvelope<ApiGameTag[]>>(endpoints.achievements.tags),
    ]);
    return {
      badges: unwrap(badges.data).map(mapBadge),
      medals: unwrap(medals.data).map(mapMedal),
      tags: unwrap(tags.data).map(mapGameTag),
    };
  },
  getDailyMissions: async (): Promise<DailyMissionsSummary> => {
    const response = await api.get<
      ApiEnvelope<{
        missions?: ApiDailyMission[];
        equippedTag?: ApiGameTag | null;
        equipped_tag?: ApiGameTag | null;
      }>
    >(endpoints.achievements.dailyMissions);
    const data = unwrap(response.data);
    return {
      missions: (data.missions ?? []).map(mapDailyMission),
      equippedTag: data.equippedTag
        ? mapGameTag(data.equippedTag)
        : data.equipped_tag
          ? mapGameTag(data.equipped_tag)
          : null,
    };
  },
  claimMission: async (missionId: string): Promise<DailyMission> => {
    const response = await api.post<ApiEnvelope<ApiDailyMission>>(
      endpoints.achievements.claimMission(missionId),
    );
    return mapDailyMission(unwrap(response.data));
  },
  equipTag: async (tagId: string): Promise<GameTag> => {
    const response = await api.post<ApiEnvelope<ApiGameTag>>(endpoints.achievements.equipTag, {
      tagId,
      tag_id: tagId,
    });
    return mapGameTag(unwrap(response.data));
  },
};

export const achievementsService = USE_MOCKS
  ? mockAchievementsService
  : apiAchievementsService;
