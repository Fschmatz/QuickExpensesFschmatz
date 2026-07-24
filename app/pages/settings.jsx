import { useEffect, useState } from "react";
import { useTheme, Card, Portal, ActivityIndicator } from "react-native-paper";
import { Linking, View, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { appDetails } from "@utils";
import {
  ListTileWithIcon,
  SettingsSwitch,
  DefaultPageContainer,
  CardList,
  SettingsThemeSegmented,
} from "@components";
import { exportBackup, importBackup } from "../../db/backup";
import { fetchTags } from "@tagDuck";
import { fetchAppParameters } from "@appParameterDuck";
import { fetchTotalExpensesCurrentMonth } from "@expenseDuck";
import { selectAppParameterByKey } from "@appParameterSelector";
import { appParameters } from "@constants";

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const lastBackupDate = useSelector(
    selectAppParameterByKey(appParameters.lastBackupDateParameter),
  );

  useEffect(() => {
    dispatch(fetchAppParameters());
  }, [dispatch]);

  const navigateToChangelog = () => navigation.navigate("pages/changelog");

  const handleOpenGitHubRepo = () => {
    Linking.openURL(appDetails.repositoryLink);
  };

  const handleExportBackup = async () => {
    setIsLoading(true);
    await exportBackup();
    setIsLoading(false);
  };

  const handleImportBackup = async () => {
    setIsLoading(true);
    await importBackup();
    dispatch(fetchTags());
    dispatch(fetchTotalExpensesCurrentMonth());
    setIsLoading(false);
  };

  return (
    <>
      <DefaultPageContainer>
        <View
          style={{
            height: 75,
            backgroundColor: theme.colors.tertiaryContainer,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            marginBottom: 10,
            marginTop: 8,
          }}
        >
          <Text
            style={{
              color: theme.colors.onTertiaryContainer,
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {appDetails.appName}
          </Text>
          <Text
            style={{
              color: theme.colors.onTertiaryContainer,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            v{appDetails.appVersion}
          </Text>
        </View>

        <ListTileWithIcon
          title="Tema"
          titleColor={theme.colors.onPrimaryContainer}
          iconColor={theme.colors.onPrimaryContainer}
          boldText={true}
        />
        <CardList>
          <SettingsThemeSegmented
            title="Tema do Aplicativo"
            subtitle="Escolha a aparência do aplicativo"
          />
        </CardList>

        <ListTileWithIcon
          title="Geral"
          titleColor={theme.colors.onPrimaryContainer}
          iconColor={theme.colors.onPrimaryContainer}
          boldText={true}
        />

        <CardList>
          <SettingsSwitch
            title="Mostrar total anual"
            subtitle="Exibe o total anual na página das despesas mensais"
            parameterKey={appParameters.showTotalYearParameter}
            defaultValue={false}
          />
        </CardList>

        <ListTileWithIcon
          title="Backup"
          titleColor={theme.colors.onPrimaryContainer}
          iconColor={theme.colors.onPrimaryContainer}
          boldText={true}
        />

        <CardList>
          <ListTileWithIcon
            title="Exportar"
            subtitle={
              lastBackupDate ? `Último backup: ${lastBackupDate}` : undefined
            }
            icon="push-outline"
            disabled={isLoading}
            onPress={handleExportBackup}
          />

          <ListTileWithIcon
            title="Importar"
            icon="download-outline"
            disabled={isLoading}
            onPress={handleImportBackup}
          />
        </CardList>

        <ListTileWithIcon
          title="Sobre"
          titleColor={theme.colors.onPrimaryContainer}
          iconColor={theme.colors.onPrimaryContainer}
          boldText={true}
        />

        <CardList>
          <ListTileWithIcon
            title="Ver código-fonte no GitHub"
            icon="link-outline"
            disabled={isLoading}
            onPress={handleOpenGitHubRepo}
          />

          <ListTileWithIcon
            title="Changelog"
            icon="document-text-outline"
            disabled={isLoading}
            onPress={navigateToChangelog}
          />
        </CardList>
      </DefaultPageContainer>

      {isLoading && (
        <Portal>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              },
            ]}
          >
            <ActivityIndicator size={60} color={theme.colors.primary} />
          </View>
        </Portal>
      )}
    </>
  );
};

export default Settings;
