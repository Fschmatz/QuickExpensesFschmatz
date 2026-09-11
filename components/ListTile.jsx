import { useTheme, List } from "react-native-paper";

const ListTile = ({
  title,
  subtitle,
  titleColor,
  onPress,
  disabled = false,
  boldText = false,
  left,
  right,
}) => {
  const theme = useTheme();
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
      left={left}
      onPress={onPress}
      disabled={disabled}
      style={{ paddingHorizontal: 0 }}
      right={right}
    />
  );
};

export default ListTile;
