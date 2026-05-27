import { router, type Href, useLocalSearchParams } from "expo-router";
import { CheckCircle2, PackageCheck } from "lucide-react-native";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useBarcodeCheckIn, useProduct } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function ProductReviewScreen() {
  const theme = useAppTheme();
  const params = useLocalSearchParams<{ barcode?: string }>();
  const barcode = params.barcode ?? "7891000315507";
  const { data: product, isLoading } = useProduct(barcode);
  const confirmMutation = useBarcodeCheckIn();
  const [servingSize, setServingSize] = useState("100");
  const servingNumber = Number(servingSize.replace(",", ".")) || 100;
  const factor = servingNumber / 100;
  const calculatedMacros = useMemo(
    () => ({
      calories: Math.round((product?.caloriesPer100g ?? 0) * factor),
      protein: Math.round((product?.proteinPer100g ?? 0) * factor),
      carbs: Math.round((product?.carbsPer100g ?? 0) * factor),
      fat: Math.round((product?.fatPer100g ?? 0) * factor),
    }),
    [factor, product],
  );

  const handleConfirm = () => {
    confirmMutation.mutate(
      { barcode, servingSize: servingNumber },
      {
        onSuccess: () => {
          router.push("/app/check-in-success" as Href);
        },
      },
    );
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Produto"
        title="Produto encontrado."
        subtitle="Confere a porcao e manda pro contador."
      />
      {isLoading || !product ? (
        <LoadingManiac />
      ) : (
        <>
          <ManiacCard strong style={styles.product}>
            <View style={[styles.icon, { backgroundColor: theme.colors.primary }]}>
              <PackageCheck color="#FFFFFF" size={36} />
            </View>
            <Text style={[styles.name, { color: theme.colors.text }]}>
              {product.name}
            </Text>
            <Text style={[styles.brand, { color: theme.colors.mutedText }]}>
              {product.brand} - porcao base {product.servingSize}
            </Text>
          </ManiacCard>

          <View style={styles.form}>
            <ManiacInput
              keyboardType="numeric"
              label="Quantidade consumida em gramas"
              onChangeText={setServingSize}
              placeholder="100"
              value={servingSize}
            />
          </View>

          <View style={styles.grid}>
            <MacroTile label="Kcal" value={calculatedMacros.calories} unit="" />
            <MacroTile label="Proteina" value={calculatedMacros.protein} unit="g" />
            <MacroTile label="Carbo" value={calculatedMacros.carbs} unit="g" />
            <MacroTile label="Gordura" value={calculatedMacros.fat} unit="g" />
          </View>

          <ManiacButton
            icon={<CheckCircle2 color="#FFFFFF" size={18} />}
            label="Confirmar check-in"
            loading={confirmMutation.isPending}
            onPress={handleConfirm}
          />
        </>
      )}
    </Screen>
  );
}

function MacroTile({
  label,
  value,
  unit,
}: {
  label: string;
  value?: number | null;
  unit: string;
}) {
  const theme = useAppTheme();

  return (
    <ManiacCard style={styles.tile}>
      <Text style={[styles.tileValue, { color: theme.colors.text }]}>
        {value ?? 0}
        {unit}
      </Text>
      <Text style={[styles.tileLabel, { color: theme.colors.mutedText }]}>
        {label}
      </Text>
    </ManiacCard>
  );
}

const styles = StyleSheet.create({
  product: {
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  icon: {
    alignItems: "center",
    borderRadius: 24,
    height: 76,
    justifyContent: "center",
    width: 76,
  },
  name: {
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },
  brand: {
    fontSize: 14,
    fontWeight: "800",
  },
  form: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  tile: {
    flexBasis: "47%",
    flexGrow: 1,
  },
  tileValue: {
    fontSize: 22,
    fontWeight: "900",
  },
  tileLabel: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 4,
    textTransform: "uppercase",
  },
});
