import { useTheme, List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const ListTileWithIcon = ({
  title,
  subtitle,
  icon,
  iconColor,
  titleColor,
  onPress,
  disabled = true,
  boldText = false,
}) => {
  const theme = useTheme();
  const resolvedIconColor = iconColor ?? theme.colors.onBackground;
  const resolvedTitleColor = titleColor ?? theme.colors.onBackground;

  return (
    <List.Item
      title={title}
      description={subtitle || null}
      titleStyle={{
        color: resolvedTitleColor,
        fontWeight: boldText ? "600" : "400",
      }}
      descriptionStyle={{ color: theme.colors.outline }}
      left={
        icon
          ? (props) => (
              <List.Icon
                {...props}
                icon={({ size }) => (
                  <Ionicons name={icon} size={size} color={resolvedIconColor} />
                )}
              />
            )
          : null
      }
      onPress={onPress}
      disabled={disabled}
      style={{ paddingHorizontal: 0 }}
    />
  );
};

export default ListTileWithIcon;
