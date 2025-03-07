import styled from "styled-components/native";
import AppDetails from "../utils/appDetails";
import AppColors from "../utils/constants/appColors";
import ListTileWithIcon from "../components/ListTileWithIcon";
import PageContainer from "../components/PageContainer";
import { ScrollView } from "react-native";

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

const ChangelogContainer = styled.View`
  padding: 0px 4px;
`;

const StyledText = styled.Text`
  color: ${AppColors.text};
  font-size: 14px;
`;

const Settings = () => {
  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 75 }}>
        <CurrentVersionContainer>
          <CurrentVersionText>
            {AppDetails.appName} v{AppDetails.appVersion}
          </CurrentVersionText>
        </CurrentVersionContainer>

        <ListTileWithIcon
          title="Changelog"
          icon="document-text-outline"
          titleColor={AppColors.btnDeleteText}
          iconColor={AppColors.btnDeleteText}
        />

        <ChangelogContainer>
          <StyledText>{AppDetails.changelog}</StyledText>
        </ChangelogContainer>
      </ScrollView>
    </PageContainer>
  );
};

export default Settings;
