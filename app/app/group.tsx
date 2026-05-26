import { router } from "expo-router";
import { MessageCircle, Trophy, UsersRound } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { mockGroup } from "@/mocks/group.mock";
import { useAppTheme } from "@/store/theme.store";

export default function GroupScreen() {
  const theme = useAppTheme();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Clube"
        title={mockGroup.name}
        subtitle={mockGroup.currentChallenge}
      />
      <ManiacCard strong>
        <View style={styles.row}>
          <UsersRound color={theme.colors.accent} size={28} />
          <View>
            <Text style={[styles.number, { color: theme.colors.text }]}>
              {mockGroup.membersCount} maniacs
            </Text>
            <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
              Convite {mockGroup.inviteCode}
            </Text>
          </View>
        </View>
      </ManiacCard>
      <View style={styles.actions}>
        <ManiacButton
          icon={<MessageCircle color="#FFFFFF" size={18} />}
          label="Abrir feed"
          onPress={() => router.push("/app/feed")}
        />
        <ManiacButton
          icon={<Trophy color={theme.colors.text} size={18} />}
          label="Ver ranking"
          onPress={() => router.push("/app/ranking")}
          variant="secondary"
        />
        <ManiacButton
          icon={<MessageCircle color={theme.colors.text} size={18} />}
          label="Abrir chat"
          onPress={() => router.push("/app/chat")}
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  number: {
    fontSize: 24,
    fontWeight: "900",
  },
  copy: {
    fontSize: 14,
    fontWeight: "800",
  },
  actions: {
    gap: 10,
    marginTop: 16,
  },
});
