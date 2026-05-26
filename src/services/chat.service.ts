import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { useDemoStore } from "@/store/demo.store";
import type { ChatMessage } from "@/types/chat";

const mockChatService = {
  getMessages: async (): Promise<ChatMessage[]> => useDemoStore.getState().chatMessages,
  sendMessage: async (message: string): Promise<ChatMessage> =>
    useDemoStore.getState().addChatMessage(message),
};

const apiChatService = {
  getMessages: async (groupId = "current"): Promise<ChatMessage[]> => {
    const response = await api.get<ChatMessage[]>(`/groups/${groupId}/chat`);
    return response.data;
  },
  sendMessage: async (
    message: string,
    groupId = "current",
  ): Promise<ChatMessage> => {
    const response = await api.post<ChatMessage>(`/groups/${groupId}/chat`, {
      message,
    });
    return response.data;
  },
};

export const chatService = USE_MOCKS ? mockChatService : apiChatService;
