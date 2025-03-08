import styled from "styled-components/native";
import AppDetails from "../utils/appDetails";
import AppColors from "../utils/constants/appColors";
import ListTileWithIcon from "../components/ListTileWithIcon";
import { ScrollView, Linking } from "react-native";
import { PageContainer, Separator, SizedBox } from "../components/utils";

const CurrentVersionContainer = styled.View`
  width: 100%;
  height: 50px;
  background-color: ${AppColors.btnDeleteBackground};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
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

const LinkButton = styled.TouchableOpacity``;

const LinkText = styled.Text`
  color: #3498db;
  font-size: 16px;
  text-decoration: underline;
`;

const Settings = () => {
  const openGitHubRepo = () => {
    Linking.openURL(AppDetails.repositoryLink);
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
          title="Sobre"
          icon="information-circle-outline"
          titleColor={AppColors.btnDeleteText}
          iconColor={AppColors.btnDeleteText}
          padding='16px 0px'
        />

        <LinkButton onPress={openGitHubRepo}>
          <LinkText>Código-Fonte no GitHub</LinkText>
        </LinkButton>

        <SizedBox height={10}/>

        <Separator />

        <ListTileWithIcon
          title="Changelog"
          icon="document-text-outline"
          titleColor={AppColors.btnDeleteText}
          iconColor={AppColors.btnDeleteText}
          padding='16px 0px 0px 0px'
        />

        <ChangelogContainer>
          <StyledText>{AppDetails.changelog}</StyledText>
        </ChangelogContainer>
      </ScrollView>
    </PageContainer>
  );
};

export default Settings;
