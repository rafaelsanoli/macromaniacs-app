import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { queryClient } from "@/lib/queryClient";
import { useAppTheme } from "@/store/theme.store";

export default function RootLayout() {
  const theme = useAppTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={theme.name === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </QueryClientProvider>
  );
}
