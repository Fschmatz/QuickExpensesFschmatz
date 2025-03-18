import styled from "styled-components/native";
import { appColors } from "@constants";
import { ScrollView } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${appColors.background};
  padding: ${(props) => props.padding};
`;

const ContainerScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${appColors.background};
  padding: ${(props) => props.padding};
`;

const PageContainer = ({
  children,
  containerPadding = "8px 16px",
  scrollViewPaddingBottom = 75,
  isScrollView = true,
}) => {
  return isScrollView ? (
    <ContainerScrollView
      padding={containerPadding}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: scrollViewPaddingBottom,
      }}
    >
      {children}
    </ContainerScrollView>
  ) : (
    <Container padding={containerPadding}>{children}</Container>
  );
};

export default PageContainer;
