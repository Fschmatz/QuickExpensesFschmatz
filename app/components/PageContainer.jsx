import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";

const Container = styled.View`
  flex: 1;
  background-color: ${AppColors.background};
  padding: 8px 16px;
`;

const PageContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PageContainer;
