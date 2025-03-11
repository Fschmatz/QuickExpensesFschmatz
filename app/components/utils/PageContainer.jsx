import styled from "styled-components/native";
import { AppColors } from "../../utils/constants/appColors";
import { ScrollView } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${AppColors.background};
  padding: ${(props) => props.padding};
`;

const PageContainer = ({
  children,
  containerPadding = "8px 16px",
  scrollViewPaddingBottom = 75,
  addScrollView = true,
}) => {
  return (
    <Container padding={containerPadding}>
      {addScrollView ? (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: scrollViewPaddingBottom,
          }}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </Container>
  );
};

export default PageContainer;
