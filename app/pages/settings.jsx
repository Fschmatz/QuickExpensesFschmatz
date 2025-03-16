import { Linking } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { appDetails } from "@utils";
import { appColors } from "@constants";
import { PageContainer, ListTileWithIcon, Separator } from "@components";
import { exportBackup, importBackup } from "../../db/backup";
import { fetchTags } from "@tagDuck";

const CurrentVersionContainer = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${appColors.btnDeleteBackground};
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-top: 8px;
  margin-bottom: 25px;
`;

const CurrentVersionText = styled.Text`
  color: ${appColors.btnDeleteText};
  font-size: 16px;
  font-weight: 600;
`;

const Settings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
    <PageContainer>
      <CurrentVersionContainer>
        <CurrentVersionText>
          {appDetails.appName} v{appDetails.appVersion}
        </CurrentVersionText>
      </CurrentVersionContainer>

      <Separator />

      <ListTileWithIcon
        title="Backup"
        titleColor={appColors.btnDeleteText}
        iconColor={appColors.btnDeleteText}
        boldText={true}
      />

      <ListTileWithIcon
        title="Exportar"
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

      <ListTileWithIcon
        title="Debug"
        icon="bug-outline"
        disabled={false}
        onPress={navigateToDebug}
      />
    </PageContainer>
  );
};

export default Settings;
