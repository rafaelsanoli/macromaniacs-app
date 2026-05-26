import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useAppTheme } from "@/store/theme.store";

export default function RegisterScreen() {
  const theme = useAppTheme();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Cadastro"
        title="Dieta registrada. Agora vira jogo."
        subtitle="Cria seu perfil, monta o avatar e entra no clube."
      />
      <View style={styles.form}>
        <ManiacInput label="Nome" placeholder="Rafael" />
        <ManiacInput autoCapitalize="none" label="Username" placeholder="rafael" />
        <ManiacInput
          autoCapitalize="none"
          keyboardType="email-address"
          label="E-mail"
          placeholder="voce@macro.app"
        />
        <ManiacInput label="Senha" placeholder="Minimo 6 caracteres" secureTextEntry />
        <Text style={[styles.disclaimer, { color: theme.colors.mutedText }]}>
          O MacroManiacs nao substitui acompanhamento medico ou nutricional. A
          gente organiza e gamifica informacoes fornecidas por voce.
        </Text>
        <ManiacButton
          icon={<Sparkles color="#FFFFFF" size={18} />}
          label="Criar avatar"
          onPress={() => router.push("/onboarding/avatar")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  disclaimer: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
  },
});
