import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapFeedPost, unwrap } from "@/api/mappers";
import type { ApiEnvelope, ApiFeedPost } from "@/api/dtos";
import { api } from "@/lib/api";
import { useDemoStore } from "@/store/demo.store";
import type { FeedPost } from "@/types/feed";

const mockFeedService = {
  getGroupFeed: async (): Promise<FeedPost[]> => useDemoStore.getState().feedPosts,
  reactToPost: async (postId: string, type: string): Promise<FeedPost> => {
    const post = useDemoStore.getState().reactToPost(postId, type);
    if (!post) throw new Error("Post nao encontrado.");
    return post;
  },
};

const apiFeedService = {
  getGroupFeed: async (groupId = "current"): Promise<FeedPost[]> => {
    const response = await api.get<ApiEnvelope<ApiFeedPost[]>>(endpoints.groups.feed(groupId));
    return unwrap(response.data).map(mapFeedPost);
  },
  reactToPost: async (postId: string, type: string): Promise<FeedPost> => {
    const response = await api.post<ApiEnvelope<ApiFeedPost>>(endpoints.feed.reaction(postId), {
      type,
    });
    return mapFeedPost(unwrap(response.data));
  },
};

export const feedService = USE_MOCKS ? mockFeedService : apiFeedService;
