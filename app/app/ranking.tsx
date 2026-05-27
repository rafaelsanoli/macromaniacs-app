import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MedalBadge } from "@/components/achievements/MedalBadge";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useRanking } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

const periods = [
  { label: "Semana", value: "week" },
  { label: "Mes", value: "month" },
  { label: "Geral", value: "all" },
];

const metrics = [
  { label: "Pontos", value: "points" },
  { label: "Streak", value: "streak" },
  { label: "Proteina", value: "protein" },
];

export default function RankingScreen() {
  const theme = useAppTheme();
  const [period, setPeriod] = useState("week");
  const [metric, setMetric] = useState("points");
  const { data: ranking, isLoading } = useRanking(period, metric);

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Ranking"
        title="A briga da semana."
        subtitle="Ranking do grupo por periodo e criterio."
      />
      <ChipRow options={periods} value={period} onChange={setPeriod} />
      <ChipRow options={metrics} value={metric} onChange={setMetric} />
      {isLoading || !ranking ? (
        <LoadingManiac />
      ) : (
        <View style={styles.list}>
          {ranking.entries.map((entry) => (
            <ManiacCard key={entry.userId} strong={entry.isCurrentUser}>
              <View style={styles.row}>
                <Text style={[styles.position, { color: theme.colors.accent }]}>
                  #{entry.position}
                </Text>
                <View style={styles.copyWrap}>
                  <Text style={[styles.name, { color: theme.colors.text }]}>
                    {entry.name}
                  </Text>
                  <Text style={[styles.meta, { color: theme.colors.mutedText }]}>
                    @{entry.username} - {entry.streak} dias - {entry.points} pts
                  </Text>
                </View>
              </View>
              {entry.medals[0] ? (
                <View style={styles.medal}>
                  <MedalBadge medal={entry.medals[0]} />
                </View>
              ) : null}
            </ManiacCard>
          ))}
        </View>
      )}
    </Screen>
  );
}

function ChipRow({
  onChange,
  options,
  value,
}: {
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  value: string;
}) {
  const theme = useAppTheme();

  return (
    <View style={styles.chips}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.chip,
              {
                backgroundColor: selected ? theme.colors.text : theme.colors.card,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: selected ? theme.colors.background : theme.colors.text },
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  list: {
    gap: 14,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  position: {
    fontSize: 26,
    fontWeight: "900",
    width: 52,
  },
  copyWrap: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "900",
  },
  meta: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },
  medal: {
    marginTop: 14,
  },
});
