export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
};

export type Medal = {
  id: string;
  name: string;
  category: string;
  level: "bronze" | "silver" | "gold" | "diamond";
  rarity: "common" | "rare" | "epic" | "legendary" | "maniac";
  description: string;
  visualSlot: string;
  unlocked: boolean;
  equipped: boolean;
};

export type GameTag = {
  id: string;
  name: string;
  hashtag: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary" | "maniac";
  unlocked: boolean;
  equipped: boolean;
};

export type DailyMission = {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  status: "locked" | "active" | "completed" | "claimed";
  rewardTag: GameTag;
};
