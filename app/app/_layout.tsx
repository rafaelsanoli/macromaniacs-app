import { Tabs } from "expo-router";
import { CircleUserRound, House, Plus, Trophy, UsersRound } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useAppTheme } from "@/store/theme.store";

export default function AppTabsLayout() {
  const theme = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.mutedText,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: theme.colors.tabBar,
            borderTopColor: theme.colors.border,
          },
        ],
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <House color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: "Grupo",
          tabBarIcon: ({ color }) => <UsersRound color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="check-in"
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={[styles.checkIn, { backgroundColor: theme.colors.primary }]}>
              <Plus color="#FFFFFF" size={30} strokeWidth={3} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: "Ranking",
          tabBarIcon: ({ color }) => <Trophy color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <CircleUserRound color={color} size={22} />,
        }}
      />
      <Tabs.Screen name="macros" options={{ href: null }} />
      <Tabs.Screen name="barcode-scanner" options={{ href: null }} />
      <Tabs.Screen name="product-review" options={{ href: null }} />
      <Tabs.Screen name="planned-meal" options={{ href: null }} />
      <Tabs.Screen name="manual-check-in" options={{ href: null }} />
      <Tabs.Screen name="photo-check-in" options={{ href: null }} />
      <Tabs.Screen name="check-in-success" options={{ href: null }} />
      <Tabs.Screen name="feed" options={{ href: null }} />
      <Tabs.Screen name="chat" options={{ href: null }} />
      <Tabs.Screen name="diet" options={{ href: null }} />
      <Tabs.Screen name="medals" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    height: 76,
    paddingBottom: 12,
    paddingTop: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: "900",
  },
  checkIn: {
    alignItems: "center",
    borderRadius: 999,
    height: 58,
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#9B5CFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    width: 58,
  },
});
