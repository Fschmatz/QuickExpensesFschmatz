import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import ExpenseService from "../service/expenseService";
import TagService from "../service/tagService";
import ExpenseTagService from "../service/expenseTagService";
import AppDetails from "../utils/appDetails";
import { formatDate, showToast, isEmpty } from "../utils/functionUtils";
import * as DocumentPicker from "expo-document-picker";

export const exportBackup = async () => {
  try {
    const expenses = await ExpenseService.fetchAll();
    const tags = await TagService.fetchAll();
    const expensesTags = await ExpenseTagService.fetchAll();
    const backupDate = formatDate(
      new Date().toISOString().split("T")[0],
      "dd/mm/yyyy"
    );

    const backupData = {
      version: AppDetails.appVersion,
      createdAt: backupDate,
      data: {
        expenses,
        tags,
        expensesTags,
      },
    };

    //console.log(JSON.stringify(backupData));

    const jsonData = JSON.stringify(backupData, null, 2);
    const filename = `${AppDetails.backupFileName}.json`;
    const filePath = `${FileSystem.cacheDirectory}${filename}`;

    await FileSystem.writeAsStringAsync(filePath, jsonData, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const fileInfo = await FileSystem.getInfoAsync(filePath);

    if (!fileInfo.exists) {
      showToast("Erro ao criar arquivo de backup!");
    }

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(filePath, {
        mimeType: "application/json",
        dialogTitle: "Salvar backup",
        UTI: "public.json",
      });

      showToast("Backup salvo!");
    }
  } catch (error) {
    showToast("Erro ao exportar backup!");
  }
};

export const importBackup = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return;
    }

    const file = result.assets[0];
    
    if (!file.name || file.name !== `${AppDetails.backupFileName}.json`) {
      showToast("Arquivo inválido!");
      return;
    }

    const response = await fetch(file.uri);
    const text = await response.text();
    const jsonData = JSON.parse(text);
    const expenses = jsonData?.data?.expenses ?? [];
    const tags = jsonData?.data?.tags ?? [];
    const expensesTags = jsonData?.data?.expensesTags ?? [];

    if (!isEmpty(expenses)) {
      await ExpenseService.importFromBackup(expenses);
    }

    if (!isEmpty(tags)) {
      await TagService.importFromBackup(tags);
    }

    if (!isEmpty(expensesTags)) {
      await ExpenseTagService.importFromBackup(expensesTags);
    }

    showToast("Backup importado com sucesso!");
  } catch (error) {
    showToast("Erro ao importar backup!");
  }
};

export default { exportBackup, importBackup };
