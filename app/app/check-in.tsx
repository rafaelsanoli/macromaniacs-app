import { router, type Href } from "expo-router";
import { Camera, ClipboardList, Keyboard, ScanBarcode } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { CheckInOptionCard } from "@/components/checkin/CheckInOptionCard";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";

const options = [
  {
    title: "Código de barras",
    copy: "Produto encontrado via backend Flask depois. Agora é mock.",
    icon: ScanBarcode,
    route: "/app/barcode-scanner" as Href,
  },
  {
    title: "Refeição planejada",
    copy: "Confirma almoço, jantar ou lanche da dieta.",
    icon: ClipboardList,
    route: "/app/planned-meal" as Href,
  },
  {
    title: "Foto do prato",
    copy: "IA entra depois. A tela já reserva o fluxo.",
    icon: Camera,
    route: "/app/check-in-success" as Href,
  },
  {
    title: "Manual",
    copy: "Registra na raça quando o produto some do mapa.",
    icon: Keyboard,
    route: "/app/check-in-success" as Href,
  },
];

export default function CheckInScreen() {
  return (
    <Screen>
      <ScreenHeader
        eyebrow="Check-in"
        title="Registra a refeição."
        subtitle="Dieta registrada. Agora vira jogo."
      />
      <View style={styles.list}>
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <CheckInOptionCard
              key={option.title}
              description={option.copy}
              icon={<Icon color="#FFFFFF" size={24} />}
              onPress={() => router.push(option.route)}
              title={option.title}
            />
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
  },
});
