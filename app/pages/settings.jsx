import { useEffect } from "react";
import { useTheme, Card } from "react-native-paper";
import { Linking, View, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { appDetails } from "@utils";
import {
  ListTileWithIcon,
  SettingsSwitch,
  DefaultPageContainer,
  CardList,
} from "@components";
import { exportBackup, importBackup } from "../../db/backup";
import { fetchTags } from "@tagDuck";
import { fetchAppParameters } from "@appParameterDuck";
import { selectAppParameterByKey } from "@appParameterSelector";

const Settings = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const lastBackupDate = useSelector(selectAppParameterByKey("lastBackupDate"));

  useEffect(() => {
    dispatch(fetchAppParameters());
  }, [dispatch]);

  const navigateToChangelog = () => navigation.navigate("pages/changelog");
  const navigateToDebug = () => navigation.navigate("pages/debug");

  const handleOpenGitHubRepo = () => {
    Linking.openURL(appDetails.repositoryLink);
  };

  const handleExportBackup = async () => {
    await exportBackup();
  };

  const handleImportBackup = async () => {
    await importBackup();
    dispatch(fetchTags());
  };

  return (
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
        title="Geral"
        titleColor={theme.colors.onPrimaryContainer}
        iconColor={theme.colors.onPrimaryContainer}
        boldText={true}
      />

      <CardList>
        <SettingsSwitch
          title="Mostrar total anual"
          subtitle="Exibe o total anual na página das despesas mensais"
          parameterKey="showTotalYear"
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
          disabled={false}
          onPress={handleExportBackup}
        />

        <ListTileWithIcon
          title="Importar"
          icon="download-outline"
          disabled={false}
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
          disabled={false}
          onPress={handleOpenGitHubRepo}
        />

        <ListTileWithIcon
          title="Changelog"
          icon="document-text-outline"
          disabled={false}
          onPress={navigateToChangelog}
        />
      </CardList>
    </DefaultPageContainer>
  );
};

export default Settings;
