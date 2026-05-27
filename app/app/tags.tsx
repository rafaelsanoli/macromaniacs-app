import { CheckCircle2, Lock, Tag } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useClaimMission, useDailyMissions, useEquipTag } from "@/hooks/useBackendReadyData";
import type { DailyMission } from "@/types/achievements";
import { useAppTheme } from "@/store/theme.store";

export default function TagsScreen() {
  const theme = useAppTheme();
  const { data, isLoading } = useDailyMissions();
  const claimMission = useClaimMission();
  const equipTag = useEquipTag();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Perfil"
        title="Tags de jogo"
        subtitle="Missoes diarias para liberar titulos do perfil."
      />
      {isLoading || !data ? (
        <LoadingManiac />
      ) : (
        <>
          <ManiacCard strong style={styles.currentTag}>
            <Tag color={theme.colors.accent} size={24} />
            <View style={styles.currentCopy}>
              <Text style={[styles.currentTitle, { color: theme.colors.text }]}>
                Tag equipada
              </Text>
              <Text style={[styles.currentValue, { color: theme.colors.mutedText }]}>
                {data.equippedTag?.hashtag ?? "Nenhuma tag equipada"}
              </Text>
            </View>
          </ManiacCard>

          <View style={styles.list}>
            {data.missions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onClaim={() => claimMission.mutate(mission.id)}
                onEquip={() => equipTag.mutate(mission.rewardTag.id)}
                pending={claimMission.isPending || equipTag.isPending}
              />
            ))}
          </View>
        </>
      )}
    </Screen>
  );
}

function MissionCard({
  mission,
  onClaim,
  onEquip,
  pending,
}: {
  mission: DailyMission;
  onClaim: () => void;
  onEquip: () => void;
  pending: boolean;
}) {
  const theme = useAppTheme();
  const percentage = Math.min(100, Math.round((mission.progress / mission.target) * 100));
  const locked = mission.status === "locked";
  const completed = mission.status === "completed";
  const claimed = mission.status === "claimed" || mission.rewardTag.unlocked;

  return (
    <ManiacCard strong={claimed} style={styles.mission}>
      <View style={styles.missionTop}>
        <View style={[styles.iconWrap, { borderColor: theme.colors.border }]}>
          {claimed ? (
            <CheckCircle2 color={theme.colors.accent} size={28} />
          ) : locked ? (
            <Lock color={theme.colors.mutedText} size={28} />
          ) : (
            <Tag color={theme.colors.accent} size={28} />
          )}
        </View>
        <View style={styles.missionCopy}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {mission.title}
          </Text>
          <Text style={[styles.description, { color: theme.colors.mutedText }]}>
            {mission.description}
          </Text>
        </View>
      </View>

      <View style={[styles.progressTrack, { backgroundColor: theme.colors.border }]}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: theme.colors.accent, width: `${percentage}%` },
          ]}
        />
      </View>
      <Text style={[styles.progressText, { color: theme.colors.mutedText }]}>
        {mission.progress}/{mission.target}
      </Text>

      <View style={styles.rewardRow}>
        <Text style={[styles.tag, { color: theme.colors.text }]}>
          {mission.rewardTag.hashtag}
        </Text>
        {completed ? (
          <ManiacButton
            label="Resgatar"
            loading={pending}
            onPress={onClaim}
            variant="secondary"
          />
        ) : claimed ? (
          <ManiacButton
            label={mission.rewardTag.equipped ? "Equipada" : "Equipar"}
            loading={pending}
            onPress={onEquip}
            variant="secondary"
          />
        ) : null}
      </View>
    </ManiacCard>
  );
}

const styles = StyleSheet.create({
  currentTag: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  currentCopy: {
    flex: 1,
  },
  currentTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  currentValue: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 4,
  },
  list: {
    gap: 12,
  },
  mission: {
    gap: 12,
  },
  missionTop: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  missionCopy: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
  },
  description: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
  progressTrack: {
    borderRadius: 999,
    height: 8,
    overflow: "hidden",
  },
  progressFill: {
    borderRadius: 999,
    height: "100%",
  },
  progressText: {
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
  },
  rewardRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  tag: {
    flex: 1,
    fontSize: 13,
    fontWeight: "900",
  },
});
