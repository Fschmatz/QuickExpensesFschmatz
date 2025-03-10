import React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";

const Container = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.padding || "0px"};
  border-radius: 12px;
`;

const Icon = styled(Ionicons)``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: ${(props) => props.boldText ? '500' : '400'};
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
  boldText = false,
}) => {
  return (
    <Container
      padding={padding}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      style={({ pressed }) => [
        pressed && { opacity: 0.4, backgroundColor: "#dadada" },
      ]}
    >
      {icon && <Icon name={icon} size={24} color={iconColor} />}
      <Title color={titleColor} marginLeft={icon ? "16px" : "0px"} boldText={boldText}>
        {title}
      </Title>
    </Container>
  );
};

export default ListTileWithIcon;
