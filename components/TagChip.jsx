import { Chip } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useMaterialYouColor } from "@utils";

const TagChip = ({ tag, isSelected, onSelectTag, isStoreExpensePage }) => {
  const theme = useTheme();
  const { primaryContainer, onPrimaryContainer } = useMaterialYouColor(
    tag.color,
  );
  const getBackgroundColor = () =>
    isSelected
      ? primaryContainer
      : isStoreExpensePage
        ? theme.colors.elevation.level2
        : theme.colors.background;

  const getTextColor = () =>
    isSelected ? onPrimaryContainer : theme.colors.onBackground;

  const getIconColor = () => (isSelected ? onPrimaryContainer : tag.color);

  return (
    <Chip
      icon={() => <Ionicons name={tag.icon} size={16} color={getIconColor()} />}
      onPress={() => onSelectTag(tag)}
      style={{
        backgroundColor: getBackgroundColor(),
        borderRadius: 50,
      }}
      contentStyle={{
        paddingLeft: 6,
        paddingRight: 0,
      }}
      textStyle={{
        color: getTextColor(),
        fontSize: 14,
        fontWeight: "500",
        marginRight: 12,
        marginLeft: 8,
      }}
    >
      {tag.name}
    </Chip>
  );
};

export default TagChip;
