import React from "react";
import { Chip } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useMaterialYouColor } from "@utils";
import { TagItem } from "../entities/tag";

export interface TagChipProps {
  tag: TagItem;
  isSelected?: boolean;
  onSelectTag: (tag: TagItem) => void;
  isStoreExpensePage?: boolean;
}

const TagChip: React.FC<TagChipProps> = ({
  tag,
  isSelected = false,
  onSelectTag,
  isStoreExpensePage = false,
}) => {
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
      icon={() => (
        <Ionicons
          name={tag.icon as keyof typeof Ionicons.glyphMap}
          size={16}
          color={getIconColor()}
        />
      )}
      onPress={() => onSelectTag(tag)}
      style={{
        backgroundColor: getBackgroundColor(),
        borderRadius: 50,
      }}
      {...({
        contentStyle: {
          paddingLeft: 6,
          paddingRight: 0,
        },
      } as any)}
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
