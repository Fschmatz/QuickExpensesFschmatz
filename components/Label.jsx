import styled from "styled-components/native";
import { appColors } from "@constants";

const Label = styled.Text`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  color: ${appColors.text};
`;

const SizedBox = ({ children }) => {
  return <Label>{children}</Label>;
};

export default SizedBox;
