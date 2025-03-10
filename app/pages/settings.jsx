import styled from "styled-components/native";
import AppDetails from "../utils/appDetails";
import AppColors from "../utils/constants/appColors";
import ListTileWithIcon from "../components/ListTileWithIcon";
import { ScrollView, Linking } from "react-native";
import { PageContainer, Separator } from "../components/utils";
import { exportBackup, importBackup } from "../db/backup";
import { useDispatch } from "react-redux";
import { fetchTags } from "../redux/ducks/tagDuck";
import { useNavigation } from "expo-router";

const CurrentVersionContainer = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${AppColors.btnDeleteBackground};
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-top: 8px;
  margin-bottom: 25px;
`;

const CurrentVersionText = styled.Text`
  color: ${AppColors.btnDeleteText};
  font-size: 16px;
  font-weight: 600;
`;

const Settings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigateToChangelog = () => navigation.navigate("pages/changelog");
  const navigateToDebug = () => navigation.navigate("pages/debug");

  const handleOpenGitHubRepo = () => {
    Linking.openURL(AppDetails.repositoryLink);
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 75 }}>
        <CurrentVersionContainer>
          <CurrentVersionText>
            {AppDetails.appName} v{AppDetails.appVersion}
          </CurrentVersionText>
        </CurrentVersionContainer>

        <Separator />

        <ListTileWithIcon
          title="Backup"
          titleColor={AppColors.btnDeleteText}
          iconColor={AppColors.btnDeleteText}
          boldText={true}
        />

        <ListTileWithIcon
          title="Exportar backup"
          icon="push-outline"
          disabled={false}
          onPress={handleExportBackup}
        />

        <ListTileWithIcon
          title="Importar backup"
          icon="download-outline"
          disabled={false}
          onPress={handleImportBackup}
        />

        <Separator />

        <ListTileWithIcon
          title="Sobre"
          titleColor={AppColors.btnDeleteText}
          iconColor={AppColors.btnDeleteText}
          boldText={true}
        />

        <ListTileWithIcon
          title="Ver código-Fonte no GitHub"
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
      </ScrollView>
    </PageContainer>
  );
};

export default Settings;
