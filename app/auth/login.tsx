import { router } from "expo-router";
import { Apple, Dumbbell, Mail } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useAppTheme } from "@/store/theme.store";

export default function LoginScreen() {
  const theme = useAppTheme();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Login"
        title="Volta pro jogo."
        subtitle="Ranking atualizado. A turma nao esperou."
      />
      <View style={styles.form}>
        <ManiacInput
          autoCapitalize="none"
          keyboardType="email-address"
          label="E-mail"
          placeholder="voce@macro.app"
        />
        <ManiacInput label="Senha" placeholder="Sua senha" secureTextEntry />
        <ManiacButton
          icon={<Dumbbell color="#FFFFFF" size={18} />}
          label="Entrar"
          onPress={() => router.replace("/app/home")}
        />
        <ManiacButton
          icon={<Mail color={theme.colors.text} size={18} />}
          label="Google em breve"
          variant="secondary"
        />
        <ManiacButton
          icon={<Apple color={theme.colors.text} size={18} />}
          label="Apple em breve"
          variant="secondary"
        />
      </View>
      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={[styles.link, { color: theme.colors.primarySoft }]}>
          Novo no clube? Cria conta e vira maniac.
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: "900",
    marginTop: 18,
    textAlign: "center",
  },
});
