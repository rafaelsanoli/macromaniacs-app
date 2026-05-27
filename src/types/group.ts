export type Group = {
  id: string;
  name: string;
  type?: "club" | "challenge";
  inviteCode: string;
  membersCount: number;
  currentChallenge: string;
  durationDays?: number | null;
  mode?: string | null;
  privacy?: "public" | "private";
};
