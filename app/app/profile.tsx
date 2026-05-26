import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import { MedalBadge } from "@/components/achievements/MedalBadge";
import { AvatarPreview } from "@/components/avatar/AvatarPreview";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { profileService } from "@/services/profile.service";
import { useAppTheme } from "@/store/theme.store";

export default function ProfileScreen() {
  const theme = useAppTheme();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
  });

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Perfil"
        title="Seu avatar no jogo."
        subtitle="Medalhas, badges e status de maniac."
      />
      {isLoading || !profile ? (
        <LoadingManiac />
      ) : (
        <>
          <ManiacCard strong style={styles.hero}>
            <AvatarPreview avatar={profile.avatar} size={132} />
            <Text style={[styles.name, { color: theme.colors.text }]}>
              {profile.user.name}
            </Text>
            <Text style={[styles.username, { color: theme.colors.mutedText }]}>
              @{profile.user.username} · Hoje você não foi frango.
            </Text>
          </ManiacCard>
          <Text style={[styles.section, { color: theme.colors.text }]}>
            Medalhas equipadas
          </Text>
          <View style={styles.medals}>
            {profile.medals.map((medal) => (
              <MedalBadge key={medal.id} medal={medal} />
            ))}
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    gap: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: "900",
    marginTop: 8,
  },
  username: {
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  section: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 22,
    marginBottom: 12,
  },
  medals: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
