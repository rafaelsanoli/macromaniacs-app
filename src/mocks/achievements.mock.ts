import type { Badge, DailyMission, GameTag, Medal } from "@/types/achievements";

export const mockMedals: Medal[] = [
  {
    id: "medal_protein_gold",
    name: "Proteína Braba",
    category: "macros",
    level: "gold",
    rarity: "epic",
    description: "Bateu proteína por 5 dias seguidos.",
    visualSlot: "chest",
    unlocked: true,
    equipped: true,
  },
  {
    id: "medal_streak_bronze",
    name: "Streak Pegando Fogo",
    category: "streak",
    level: "bronze",
    rarity: "rare",
    description: "Manteve check-in por 3 dias.",
    visualSlot: "head",
    unlocked: true,
    equipped: false,
  },
];

export const mockBadges: Badge[] = [
  {
    id: "badge_clean_lunch",
    name: "Almoço Limpo",
    description: "Registrou um almoço dentro da meta.",
    icon: "flame",
    unlocked: true,
  },
  {
    id: "badge_first_scan",
    name: "Scanner Maniac",
    description: "Escaneou o primeiro produto.",
    icon: "scan-barcode",
    unlocked: true,
  },
];

export const mockGameTags: GameTag[] = [
  {
    id: "tag_easy_maniac",
    name: "EasyManiac",
    hashtag: "#EasyManiac",
    description: "Complete o plano alimentar do dia.",
    rarity: "common",
    unlocked: true,
    equipped: true,
  },
  {
    id: "tag_protein_master",
    name: "ProteinMaster",
    hashtag: "#ProteinMaster",
    description: "Bata a meta de proteina por 5 dias seguidos.",
    rarity: "rare",
    unlocked: false,
    equipped: false,
  },
  {
    id: "tag_discipline_flame",
    name: "DisciplineFlame",
    hashtag: "#DisciplineFlame",
    description: "Mantenha a meta por 7 dias consecutivos.",
    rarity: "epic",
    unlocked: false,
    equipped: false,
  },
];

export const mockDailyMissions: DailyMission[] = [
  {
    id: "mission_daily_plan",
    title: "Desafio diario",
    description: "Complete o seu plano alimentar por 1 dia seguido.",
    progress: 0,
    target: 1,
    status: "active",
    rewardTag: mockGameTags[0],
  },
  {
    id: "mission_protein_master",
    title: "Mestre das Proteinas",
    description: "Bata a meta de proteina por 5 dias seguidos.",
    progress: 0,
    target: 5,
    status: "locked",
    rewardTag: mockGameTags[1],
  },
  {
    id: "mission_focus_streak",
    title: "Sequencia de Foco",
    description: "Mantenha a sua meta por 7 dias consecutivos.",
    progress: 0,
    target: 7,
    status: "locked",
    rewardTag: mockGameTags[2],
  },
];
