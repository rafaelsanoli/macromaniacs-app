import { useMutation } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Camera, FileText, Image, Keyboard } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { OnboardingOptionCard } from "@/components/onboarding/OnboardingOptionCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { dietService, type DietScanPayload } from "@/services/diet.service";
import { useAppTheme } from "@/store/theme.store";

type ScanSource = DietScanPayload["sourceType"];

const scanOptions: {
  id: ScanSource;
  title: string;
  description: string;
  icon: typeof FileText;
}[] = [
  {
    id: "pdf",
    title: "PDF da nutri",
    description: "Seleciona o arquivo do plano alimentar.",
    icon: FileText,
  },
  {
    id: "image",
    title: "Foto do papel",
    description: "Tira foto da dieta impressa.",
    icon: Camera,
  },
  {
    id: "image",
    title: "Imagem salva",
    description: "Usa print, foto antiga ou arquivo da galeria.",
    icon: Image,
  },
  {
    id: "text",
    title: "Texto manual",
    description: "Cola sua dieta e segue o jogo.",
    icon: Keyboard,
  },
];

export default function DietScanScreen() {
  const theme = useAppTheme();
  const [sourceType, setSourceType] = useState<ScanSource>("pdf");
  const [text, setText] = useState("");
  const [file, setFile] = useState<Pick<
    DietScanPayload,
    "fileUri" | "fileName" | "mimeType"
  > | null>(null);
  const scanMutation = useMutation({
    mutationFn: () =>
      dietService.scanDiet({
        sourceType,
        text,
        fileUri: file?.fileUri,
        fileName: file?.fileName,
        mimeType: file?.mimeType,
      }),
    onSuccess: () => router.push("/onboarding/diet-processing"),
  });

  const pickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "application/pdf",
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setSourceType("pdf");
      setFile({
        fileUri: asset.uri,
        fileName: asset.name,
        mimeType: asset.mimeType ?? "application/pdf",
      });
    }
  };

  const pickImage = async (fromCamera: boolean) => {
    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 0.8 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setSourceType("image");
      setFile({
        fileUri: asset.uri,
        fileName: asset.fileName ?? "diet-image.jpg",
        mimeType: asset.mimeType ?? "image/jpeg",
      });
    }
  };

  const handleOptionPress = (index: number, id: ScanSource) => {
    setSourceType(id);
    if (index === 0) {
      void pickPdf();
    }
    if (index === 1) {
      void pickImage(true);
    }
    if (index === 2) {
      void pickImage(false);
    }
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Scanner"
        title="Joga a dieta pra IA."
        subtitle="Escolha PDF, imagem, foto ou texto manual."
      />
      <View style={styles.options}>
        {scanOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <OnboardingOptionCard
              key={`${option.title}-${index}`}
              description={option.description}
              icon={<Icon color="#FFFFFF" size={22} />}
              onPress={() => handleOptionPress(index, option.id)}
              selected={
                sourceType === option.id &&
                (option.id === "text" || (option.id === "pdf" && index === 0))
              }
              title={option.title}
            />
          );
        })}
      </View>
      {file ? (
        <Text style={[styles.fileName, { color: theme.colors.mutedText }]}>
          Arquivo selecionado: {file.fileName}
        </Text>
      ) : null}
      <ManiacInput
        label="Texto da dieta"
        multiline
        onChangeText={(value) => {
          setText(value);
          setSourceType("text");
        }}
        placeholder="Cole aqui sua dieta, se preferir texto manual"
        style={styles.textArea}
        value={text}
      />
      <ManiacButton
        label="Processar dieta"
        loading={scanMutation.isPending}
        onPress={() => scanMutation.mutate()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: 12,
    marginBottom: 12,
  },
  fileName: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
  },
  textArea: {
    minHeight: 110,
    paddingTop: 14,
    textAlignVertical: "top",
  },
});
