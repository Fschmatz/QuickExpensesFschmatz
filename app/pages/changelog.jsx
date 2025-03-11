import { ScrollView } from "react-native";
import { PageContainer } from "../components/utils";
import AppDetails from "../utils/appDetails";
import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";

const ChangelogContainer = styled.View``;

const StyledText = styled.Text`
  color: ${AppColors.text};
  font-size: 16px;
`;

const Changelog = () => {
  return (
    <PageContainer>
      <ChangelogContainer>
        <StyledText>{AppDetails.changelog}</StyledText>
      </ChangelogContainer>
    </PageContainer>
  );
};

export default Changelog;
