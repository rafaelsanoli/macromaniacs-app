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
    cardStrong: "#2A2A2A",
    text: colors.offWhite,
    mutedText: colors.mutedTextDark,
    border: "rgba(255, 255, 255, 0.16)",
    primary: "#374151",
    primarySoft: "#E5E7EB",
    accent: "#FFFFFF",
    danger: "#FFFFFF",
    success: "#FFFFFF",
    tabBar: "#111111",
  },
  spacing,
  radius,
};

export const lightTheme: AppTheme = {
  name: "light",
  colors: {
    background: colors.white,
    backgroundAlt: "#F9FAFB",
    card: colors.white,
    cardStrong: "#F3F4F6",
    text: "#111111",
    mutedText: colors.mutedTextLight,
    border: "#E5E7EB",
    primary: "#111111",
    primarySoft: "#374151",
    accent: "#111111",
    danger: "#111111",
    success: "#111111",
    tabBar: colors.white,
  },
  spacing,
  radius,
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};
