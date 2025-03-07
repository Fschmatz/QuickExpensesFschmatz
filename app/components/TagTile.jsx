import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 8px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 15px;
`;

const TagIcon = styled(Ionicons)`
  margin-right: 16px;
`;

const TagName = styled.Text`
  flex: 1;
  color: ${AppColors.text};
  font-size: 16px;
  font-weight: bold;
`;

const TagTile = ({ tag, onDelete, onEdit }) => {
  return (
    <Container>
      <TagIcon name={tag.icon} size={24} color={tag.color} />

      <TagName>{tag.name}</TagName>

      <ButtonContainer>
        <TouchableOpacity onPress={() => onEdit(tag)}>
          <Ionicons name="create-outline" size={24} color={AppColors.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(tag)}>
          <Ionicons name="trash-outline" size={24} color={AppColors.text} />
        </TouchableOpacity>
      </ButtonContainer>
    </Container>
  );
};

export default TagTile;
