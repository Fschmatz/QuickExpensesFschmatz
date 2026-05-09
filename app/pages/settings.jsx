import { useEffect } from "react";
import { Linking } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { appDetails } from "@utils";
import { appColors } from "@constants";
import {
  PageContainer,
  ListTileWithIcon,
  Separator,
  SettingsSwitch,
} from "@components";
import { exportBackup, importBackup } from "../../db/backup";
import { fetchTags } from "@tagDuck";
import { fetchAppParameters } from "@appParameterDuck";
import { selectAppParameterByKey } from "@appParameterSelector";

const CurrentVersionContainer = styled.View`
  height: 50px;
  background-color: ${appColors.btnDeleteBackground};
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin: 8px 16px 10px 16px;
`;

const CurrentVersionText = styled.Text`
  color: ${appColors.btnDeleteText};
  font-size: 16px;
  font-weight: 600;
`;

const Settings = () => {
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
    <PageContainer containerPadding="8px 0px">
      <CurrentVersionContainer>
        <CurrentVersionText>
          {appDetails.appName} v{appDetails.appVersion}
        </CurrentVersionText>
      </CurrentVersionContainer>

      <ListTileWithIcon
        title="Geral"
        titleColor={appColors.btnDeleteText}
        iconColor={appColors.btnDeleteText}
        boldText={true}
      />

      <SettingsSwitch
        title="Mostrar total anual"
        subtitle="Exibe o total anual na página das despesas mensais"
        parameterKey="showTotalYear"
        defaultValue={false}
      />

      <Separator />

      <ListTileWithIcon
        title="Backup"
        titleColor={appColors.btnDeleteText}
        iconColor={appColors.btnDeleteText}
        boldText={true}
      />

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

      <Separator />

      <ListTileWithIcon
        title="Sobre"
        titleColor={appColors.btnDeleteText}
        iconColor={appColors.btnDeleteText}
        boldText={true}
      />

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

      {/*  <ListTileWithIcon
        title="Debug"
        icon="bug-outline"
        disabled={false}
        onPress={navigateToDebug}
      /> */}
    </PageContainer>
  );
};

export default Settings;
