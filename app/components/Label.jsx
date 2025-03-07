import React from "react";
import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";

const Label = styled.Text`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8;
  color: ${AppColors.text};
`;

const SizedBox = ({ children }) => {
  return <Label>{children}</Label>;
};

export default SizedBox;
