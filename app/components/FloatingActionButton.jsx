import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppColors from "../utils/constants/appColors";

const FAB = styled(TouchableOpacity)`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: ${AppColors.btnConfirmBackground};
  width: 56px;
  height: 56px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

const FloatingActionButton = ({ onPress, icon, iconSize = 24 }) => {
  return (
    <FAB onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={icon} size={iconSize} color={AppColors.btnConfirmText} />
    </FAB>
  );
};

export default FloatingActionButton;
