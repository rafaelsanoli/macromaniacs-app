import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Camera, CheckCircle2, Image } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { usePhotoCheckIn } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function PhotoCheckInScreen() {
  const theme = useAppTheme();
  const confirmMutation = usePhotoCheckIn();
  const [file, setFile] = useState<{
    fileUri: string;
    fileName?: string;
    mimeType?: string;
  } | null>(null);

  const pickImage = async (camera: boolean) => {
    const permission = camera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = camera
      ? await ImagePicker.launchCameraAsync({ quality: 0.8 })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          quality: 0.8,
        });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setFile({
        fileUri: asset.uri,
        fileName: asset.fileName ?? "plate-photo.jpg",
        mimeType: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Foto"
        title="Foto do prato"
        subtitle="Envie a imagem para a rota estimar os macros."
      />
      <ManiacCard strong style={styles.card}>
        <Camera color={theme.colors.accent} size={48} />
        <Text style={[styles.copy, { color: theme.colors.text }]}>
          {file ? file.fileName ?? "Imagem selecionada" : "Selecione uma imagem do prato."}
        </Text>
      </ManiacCard>
      <View style={styles.actions}>
        <ManiacButton
          icon={<Camera color="#FFFFFF" size={18} />}
          label="Tirar foto"
          onPress={() => pickImage(true)}
        />
        <ManiacButton
          icon={<Image color={theme.colors.text} size={18} />}
          label="Escolher imagem"
          variant="secondary"
          onPress={() => pickImage(false)}
        />
      </View>
      <ManiacButton
        icon={<CheckCircle2 color="#FFFFFF" size={18} />}
        label="Confirmar foto"
        loading={confirmMutation.isPending}
        disabled={!file}
        onPress={() =>
          confirmMutation.mutate(file ?? undefined, {
            onSuccess: () => router.push("/app/check-in-success"),
          })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  actions: {
    gap: 12,
    marginBottom: 18,
  },
  copy: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
    textAlign: "center",
  },
});
