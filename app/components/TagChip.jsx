import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import AppColors from "../utils/constants/appColors";

const ChipContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${AppColors.background};
  border-radius: 50px;
  padding: 8px 12px;
  gap: 6px;
`;

const ChipText = styled.Text`
  color: ${AppColors.text};
  font-size: 14px;
  font-weight: 500;
`;

const TagChip = ({ tag }) => {
  {/* Pequeno truque para deixar os Sem Tag por ultimo nos detalhes */}
  const name = tag.name === "zzzzz" ? "Sem Tag" : tag.name;

  return (
    <ChipContainer>
      <Ionicons name={tag.icon} size={18} color={tag.color} />      
      <ChipText>{name}</ChipText>
    </ChipContainer>
  );
};

export default TagChip;
