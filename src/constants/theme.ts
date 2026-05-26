import { colors } from "./colors";
import { radius, spacing } from "./spacing";

export type AppThemeName = "dark" | "light";

export type AppTheme = {
  name: AppThemeName;
  colors: {
    background: string;
    backgroundAlt: string;
    card: string;
    cardStrong: string;
    text: string;
    mutedText: string;
    border: string;
    primary: string;
    primarySoft: string;
    accent: string;
    danger: string;
    success: string;
    tabBar: string;
  };
  spacing: typeof spacing;
  radius: typeof radius;
};

export const darkTheme: AppTheme = {
  name: "dark",
  colors: {
    background: colors.darkPurple,
    backgroundAlt: colors.deepPurple,
    card: colors.cardPurple,
    cardStrong: "#452070",
    text: colors.offWhite,
    mutedText: colors.mutedTextDark,
    border: "rgba(199, 166, 255, 0.18)",
    primary: colors.vibrantPurple,
    primarySoft: colors.lightLavender,
    accent: colors.medalGold,
    danger: colors.coralAlert,
    success: colors.successGreen,
    tabBar: "#220B3D",
  },
  spacing,
  radius,
};

export const lightTheme: AppTheme = {
  name: "light",
  colors: {
    background: colors.offWhite,
    backgroundAlt: colors.softLavender,
    card: colors.white,
    cardStrong: colors.softLavender,
    text: colors.darkInk,
    mutedText: colors.mutedTextLight,
    border: "rgba(139, 77, 255, 0.18)",
    primary: colors.vibrantPurple,
    primarySoft: colors.mascotPurple,
    accent: colors.medalGold,
    danger: colors.coralAlert,
    success: "#15924C",
    tabBar: colors.white,
  },
  spacing,
  radius,
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};
