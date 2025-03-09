import styled from "styled-components/native";
import AppDetails from "../utils/appDetails";
import AppColors from "../utils/constants/appColors";
import ListTileWithIcon from "../components/ListTileWithIcon";
import { ScrollView, Linking } from "react-native";
import { PageContainer, Separator, SizedBox } from "../components/utils";
import { exportBackup, importBackup } from "../db/backup";
import { useDispatch } from "react-redux";
import { fetchTags } from "../redux/ducks/tagDuck";
import ButtonWithIcon from "../components/ButtonWithIcon";

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

const ChangelogContainer = styled.View``;

const StyledText = styled.Text`
  color: ${AppColors.text};
  font-size: 14px;
`;

/* const LinkButton = styled.TouchableOpacity``;

const LinkText = styled.Text`
  color: #3498db;
  font-size: 16px;
  text-decoration: underline;
`; */

const Settings = () => {
  const dispatch = useDispatch();

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
        />

        <ListTileWithIcon
          title="Ver código-Fonte no GitHub"
          icon="link-outline"
          disabled={false}
          onPress={handleOpenGitHubRepo}
        />

        {/*   
        <LinkButton onPress={handleOpenGitHubRepo}>
          <LinkText></LinkText>
        </LinkButton> 
        */}

        <Separator />

        <ListTileWithIcon
          title="Changelog"
          titleColor={AppColors.btnDeleteText}
          iconColor={AppColors.btnDeleteText}
          padding="16px 0px 0px 0px"
        />

        <ChangelogContainer>
          <StyledText>{AppDetails.changelog}</StyledText>
        </ChangelogContainer>
      </ScrollView>
    </PageContainer>
  );
};

export default Settings;
