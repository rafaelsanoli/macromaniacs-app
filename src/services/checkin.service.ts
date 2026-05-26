import { USE_MOCKS } from "@/constants/config";
import { api } from "@/lib/api";
import { mockCheckInResult } from "@/mocks/checkin.mock";
import type { CheckInResult } from "@/types/checkin";

const mockCheckInService = {
  confirmBarcode: async (): Promise<CheckInResult> => mockCheckInResult,
  confirmPlannedMeal: async (): Promise<CheckInResult> => ({
    ...mockCheckInResult,
    checkInId: "checkin_planned_lunch_001",
    pointsEarned: 22,
    macrosAdded: {
      calories: 680,
      protein: 48,
      carbs: 82,
      fat: 16,
    },
  }),
};

const apiCheckInService = {
  confirmBarcode: async (): Promise<CheckInResult> => {
    const response = await api.post<CheckInResult>("/checkins/barcode");
    return response.data;
  },
  confirmPlannedMeal: async (): Promise<CheckInResult> => {
    const response = await api.post<CheckInResult>("/checkins/planned-meal");
    return response.data;
  },
};

export const checkInService = USE_MOCKS ? mockCheckInService : apiCheckInService;
