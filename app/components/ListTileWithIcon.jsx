import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.padding || "0px"};
`;

const Icon = styled(Ionicons)``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-left: ${(props) => props.marginLeft || "0px"};
  color: ${(props) => props.color || AppColors.text};
`;

const ListTileWithIcon = ({
  title,
  icon,
  iconColor = AppColors.text,
  titleColor = AppColors.text,
  padding = "16px 0px",
  onPress,
  disabled = true,
}) => {
  return (
    <Container
      padding={padding}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && <Icon name={icon} size={24} color={iconColor} />}
      <Title color={titleColor} marginLeft={icon ? "16px" : "0px"}>
        {title}
      </Title>
    </Container>
  );
};

export default ListTileWithIcon;
