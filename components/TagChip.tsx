import React from "react";
import { StyleSheet } from "react-native";
import { Chip, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useMaterialYouColor } from "@utils";
import { FONT_WEIGHT } from "@constants";
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
      style={[styles.chip, { backgroundColor: getBackgroundColor() }]}
      {...({
        contentStyle: styles.content,
      } as any)}
      textStyle={[styles.text, { color: getTextColor() }]}
    >
      {tag.name}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 50,
  },
  content: {
    paddingLeft: 6,
    paddingRight: 0,
  },
  text: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.default,
    marginRight: 12,
    marginLeft: 8,
  },
});

export default TagChip;
