import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockCheckInResult } from "@/mocks/checkin.mock";
import { useDemoStore } from "@/store/demo.store";
import type { CheckInResult } from "@/types/checkin";

const mockCheckInService = {
  getLastResult: async (): Promise<CheckInResult> => useDemoStore.getState().lastCheckIn,
  confirmBarcode: async (): Promise<CheckInResult> =>
    useDemoStore.getState().addCheckIn("barcode", "Rafael escaneou um produto.", {
      calories: 146,
      protein: 18,
      carbs: 9,
      fat: 3,
    }),
  confirmPlannedMeal: async (): Promise<CheckInResult> =>
    useDemoStore.getState().addCheckIn("planned_meal", "Rafael registrou o almoco.", {
      calories: 680,
      protein: 48,
      carbs: 82,
      fat: 16,
    }),
  confirmPhoto: async (): Promise<CheckInResult> =>
    useDemoStore.getState().addCheckIn("photo", "Rafael registrou foto do prato.", {
      calories: 520,
      protein: 35,
      carbs: 58,
      fat: 14,
    }),
  confirmManual: async (): Promise<CheckInResult> =>
    useDemoStore.getState().addCheckIn("manual", "Rafael registrou check-in manual.", {
      calories: 600,
      protein: 40,
      carbs: 70,
      fat: 15,
    }),
};

const apiCheckInService = {
  getLastResult: async (): Promise<CheckInResult> => mockCheckInResult,
  confirmBarcode: async (): Promise<CheckInResult> => {
    const response = await api.post<CheckInResult>("/checkins/barcode");
    return response.data;
  },
  confirmPlannedMeal: async (): Promise<CheckInResult> => {
    const response = await api.post<CheckInResult>("/checkins/planned-meal");
    return response.data;
  },
  confirmPhoto: async (): Promise<CheckInResult> => {
    const response = await api.post<CheckInResult>("/checkins/photo");
    return response.data;
  },
  confirmManual: async (): Promise<CheckInResult> => {
    const response = await api.post<CheckInResult>("/checkins/manual");
    return response.data;
  },
};

export const checkInService = USE_MOCKS ? mockCheckInService : apiCheckInService;
