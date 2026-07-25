import { IconButton as PaperIconButton, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({
  icon,
  size = 24,
  color,
  onPress,
  hitSlop = 15,
  disabled = false,
  style,
}) => {
  const theme = useTheme();
  const resolvedColor = color ?? theme.colors.onBackground;

  return (
    <PaperIconButton
      icon={({ size: s, color: c }) => (
        <Ionicons name={icon} size={s} color={disabled ? "#999" : c} />
      )}
      iconColor={resolvedColor}
      size={size}
      onPress={onPress}
      disabled={disabled}
      hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
      style={[{ margin: 0 }, style]}
    />
  );
};

export default IconButton;
