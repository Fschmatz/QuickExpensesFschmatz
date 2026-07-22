import { View, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { darkenColor } from "@utils";

const HomeTagsList = ({
  tags,
  selectedTag,
  onSelectTag,
  isStoreExpensePage = false,
}) => {
  const theme = useTheme();
  const isSelected = (tagId) => selectedTag?.id === tagId;

  const safeDarkenColor = (color, percent) => {
    const darkened = darkenColor(color, percent);
    const rgbMatch = darkened.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);

      if (r <= 30 && g <= 30 && b <= 30) {
        return color;
      }
    }
    return darkened;
  };

  const getBackgroundColor = (tag) =>
    isSelected(tag.id)
      ? safeDarkenColor(tag.color, 40)
      : isStoreExpensePage
        ? theme.colors.elevation.level2
        : theme.colors.background;

  const getTextColor = (tag) =>
    isSelected(tag.id) ? theme.colors.onBackground : tag.color;

  const content = (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
      }}
    >
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          icon={() => (
            <Ionicons name={tag.icon} size={16} color={getTextColor(tag)} />
          )}
          onPress={() => onSelectTag(tag)}
          style={{
            backgroundColor: getBackgroundColor(tag),
            borderRadius: 50,
            paddingLeft: 4,
            paddingRight: 0,
          }}
          textStyle={{
            color: theme.colors.onBackground,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {tag.name}
        </Chip>
      ))}
    </View>
  );

  return isStoreExpensePage ? (
    content
  ) : (
    <ScrollView
      style={{ flex: 1, width: "100%" }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {content}
    </ScrollView>
  );
};

export default HomeTagsList;
