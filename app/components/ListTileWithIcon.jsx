import React from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Icon = styled(Ionicons)``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-left: 16px;
  color: ${(props) => props.color || AppColors.text};
`;

const ListTileWithIcon = ({
  title,
  icon,
  iconColor = AppColors.text,
  titleColor = AppColors.text,
}) => {
  return (
    <Container>
      {icon && <Icon name={icon} size={24} color={iconColor} />}

      <Title color={titleColor}>{title}</Title>
    </Container>
  );
};

export default ListTileWithIcon;
