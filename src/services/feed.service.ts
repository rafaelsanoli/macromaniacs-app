import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockFeedPosts } from "@/mocks/feed.mock";
import type { FeedPost } from "@/types/feed";

const mockFeedService = {
  getGroupFeed: async (): Promise<FeedPost[]> => mockFeedPosts,
};

const apiFeedService = {
  getGroupFeed: async (groupId = "current"): Promise<FeedPost[]> => {
    const response = await api.get<FeedPost[]>(`/groups/${groupId}/feed`);
    return response.data;
  },
};

export const feedService = USE_MOCKS ? mockFeedService : apiFeedService;
