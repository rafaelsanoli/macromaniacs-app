import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { PlusCircle, Ticket, Trophy } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { OnboardingOptionCard } from "@/components/onboarding/OnboardingOptionCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { groupService, type GroupEntryPayload } from "@/services/group.service";

const modes = [
  { id: "protein_war", title: "Protein War", description: "Ganha quem bater proteina mais vezes." },
  { id: "macro_precision", title: "Macro Precision", description: "Ganha quem ficar mais perto dos macros." },
  { id: "marmita_club", title: "Marmita Club", description: "Foco em seguir as refeicoes planejadas." },
  { id: "cutting_discipline", title: "Cutting Discipline", description: "Controle e consistencia." },
] as const;

export default function GroupEntryScreen() {
  const [action, setAction] = useState<GroupEntryPayload["action"]>("create_club");
  const [name, setName] = useState("Cutting dos Crias");
  const [inviteCode, setInviteCode] = useState("MANIAC7");
  const [durationDays, setDurationDays] = useState("7");
  const [mode, setMode] = useState<(typeof modes)[number]["id"]>("protein_war");
  const submitMutation = useMutation({
    mutationFn: async () => {
      if (action === "join_group") {
        return groupService.joinGroup(inviteCode);
      }
      return groupService.createGroup({
        action,
        name,
        inviteCode,
        durationDays: action === "create_challenge" ? Number(durationDays) || 7 : null,
        mode,
        privacy: "private",
      });
    },
    onSuccess: () => router.replace("/app/home"),
  });

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Clube"
        title="Agora chama a tropa."
        subtitle="Crie clube, entre por codigo ou abra um desafio."
      />
      <View style={styles.options}>
        <OnboardingOptionCard
          description="Comunidade continua com ranking, feed e chat."
          icon={<PlusCircle color="#FFFFFF" size={22} />}
          onPress={() => setAction("create_club")}
          selected={action === "create_club"}
          title="Criar clube"
        />
        <OnboardingOptionCard
          description="Usa o codigo de convite que voce recebeu."
          icon={<Ticket color="#FFFFFF" size={22} />}
          onPress={() => setAction("join_group")}
          selected={action === "join_group"}
          title="Entrar por codigo"
        />
        <OnboardingOptionCard
          description="Competicao com inicio, fim e modo de jogo."
          icon={<Trophy color="#FFFFFF" size={22} />}
          onPress={() => setAction("create_challenge")}
          selected={action === "create_challenge"}
          title="Criar desafio"
        />
      </View>

      {action === "join_group" ? (
        <ManiacInput
          autoCapitalize="characters"
          label="Codigo de convite"
          onChangeText={setInviteCode}
          placeholder="MANIAC7"
          value={inviteCode}
        />
      ) : (
        <View style={styles.form}>
          <ManiacInput
            label={action === "create_challenge" ? "Nome do desafio" : "Nome do clube"}
            onChangeText={setName}
            value={name}
          />
          {action === "create_challenge" ? (
            <ManiacInput
              keyboardType="number-pad"
              label="Duracao em dias"
              onChangeText={setDurationDays}
              value={durationDays}
            />
          ) : null}
          <View style={styles.options}>
            {modes.map((item) => (
              <OnboardingOptionCard
                key={item.id}
                description={item.description}
                onPress={() => setMode(item.id)}
                selected={mode === item.id}
                title={item.title}
              />
            ))}
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <ManiacButton
          label={
            action === "join_group"
              ? "Entrar no grupo"
              : action === "create_challenge"
                ? "Criar desafio"
                : "Criar clube"
          }
          loading={submitMutation.isPending}
          onPress={() => submitMutation.mutate()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: 12,
    marginBottom: 16,
  },
  form: {
    gap: 12,
  },
  footer: {
    marginTop: 18,
  },
});
