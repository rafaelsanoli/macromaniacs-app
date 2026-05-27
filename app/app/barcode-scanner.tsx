import { router, type Href } from "expo-router";
import { Search, ScanBarcode } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useAppTheme } from "@/store/theme.store";

export default function BarcodeScannerScreen() {
  const theme = useAppTheme();
  const [barcode, setBarcode] = useState("7891000315507");

  const handleSearch = () => {
    const value = barcode.trim();
    if (!value) return;
    router.push(`/app/product-review?barcode=${encodeURIComponent(value)}` as Href);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={[styles.eyebrow, { color: theme.colors.primarySoft }]}>
          Scanner
        </Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Codigo de barras
        </Text>
        <ManiacCard strong style={styles.scanner}>
          <View style={[styles.frame, { borderColor: theme.colors.accent }]}>
            <ScanBarcode color={theme.colors.accent} size={96} />
          </View>
          <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
            Digite o codigo para buscar o produto. A rota do backend pode trocar isso pela camera.
          </Text>
        </ManiacCard>
        <View style={styles.form}>
          <ManiacInput
            keyboardType="number-pad"
            label="Codigo de barras"
            onChangeText={setBarcode}
            placeholder="7891000315507"
            value={barcode}
          />
          <ManiacButton
            icon={<Search color="#FFFFFF" size={18} />}
            label="Buscar produto"
            onPress={handleSearch}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 20,
    marginTop: 8,
    textAlign: "center",
  },
  scanner: {
    alignItems: "center",
    gap: 18,
  },
  frame: {
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: 28,
    borderWidth: 3,
    justifyContent: "center",
    width: "82%",
  },
  copy: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
  form: {
    gap: 14,
    marginTop: 18,
  },
});
