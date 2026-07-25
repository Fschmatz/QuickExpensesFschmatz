import { View, ScrollView } from "react-native";
import TagChip from "./TagChip";

const HomeTagsList = ({
  tags,
  selectedTag,
  onSelectTag,
  isStoreExpensePage = false,
}) => {
  const isSelected = (tagId) => selectedTag?.id === tagId;

  const content = (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
      }}
    >
      {tags.map((tag) => (
        <TagChip
          key={tag.id}
          tag={tag}
          isSelected={isSelected(tag.id)}
          onSelectTag={onSelectTag}
          isStoreExpensePage={isStoreExpensePage}
        />
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
