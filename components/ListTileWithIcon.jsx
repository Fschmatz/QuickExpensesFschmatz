import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { appColors } from "@constants";

const Container = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  padding: ${(props) => props.padding || "0px"};
  border-radius: 12px;
`;

const Icon = styled(Ionicons)``;

const TextContainer = styled.View`
  flex-direction: column;
  margin-left: ${(props) => props.marginLeft || "0px"};
  flex: 1;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: ${(props) => (props.boldText ? "500" : "400")};
  color: ${(props) => props.color || appColors.text};
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: ${appColors.placeholderText};
  margin-top: 2px;
`;

const ListTileWithIcon = ({
  title,
  subtitle,
  icon,
  iconColor = appColors.text,
  titleColor = appColors.text,
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
      android_ripple={appColors.androidRippleEffect}
      style={({ pressed }) => [pressed && appColors.androidRippleColor]}
      unstable_pressDelay={100}
    >
      {icon && <Icon name={icon} size={24} color={iconColor} />}
      <TextContainer marginLeft={icon ? "16px" : "0px"}>
        <Title
          color={titleColor}
          boldText={boldText}
        >
          {title}
        </Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TextContainer>
    </Container>
  );
};

export default ListTileWithIcon;
