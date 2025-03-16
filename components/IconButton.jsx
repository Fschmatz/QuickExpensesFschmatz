import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { appColors } from "@constants";

const StyledButton = styled(TouchableOpacity)``;

const IconButton = ({
  icon,
  size = 24,
  color = appColors.text,
  onPress,
  hitSlop = 8,
  disabled = false,
  style,
}) => {
  return (
    <StyledButton
      onPress={onPress}
      disabled={disabled}
      hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
      activeOpacity={0.7}
      style={style}
    >
      <Ionicons name={icon} size={size} color={disabled ? "#999" : color} />
    </StyledButton>
  );
};

export default IconButton;
