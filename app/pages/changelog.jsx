import styled from "styled-components/native";
import { appColors } from "@constants";
import { appDetails } from "@utils";
import { PageContainer } from "@components";

const ChangelogContainer = styled.View``;

const StyledText = styled.Text`
  color: ${appColors.text};
  font-size: 16px;
`;

const Changelog = () => {
  return (
    <PageContainer>
      <ChangelogContainer>
        <StyledText>{appDetails.changelog}</StyledText>
      </ChangelogContainer>
    </PageContainer>
  );
};

export default Changelog;
