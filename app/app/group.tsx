import { MessageCircle, UsersRound } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { EmptyState } from "@/components/ui/EmptyState";
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
      <View style={styles.gap} />
      <EmptyState
        icon={<MessageCircle color={theme.colors.primary} size={28} />}
        title="Feed e chat entram na próxima fase."
        description="A base social já está separada em mocks e services para ligar o clube sem backend."
      />
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
  gap: {
    height: 16,
  },
});
