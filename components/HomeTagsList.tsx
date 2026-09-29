import React from "react";
import { View, ScrollView } from "react-native";
import TagChip from "./TagChip";
import { TagItem } from "../entities/tag";

export interface HomeTagsListProps {
  tags: TagItem[];
  selectedTag?: TagItem | null;
  onSelectTag: (tag: TagItem) => void;
  isStoreExpensePage?: boolean;
}

const HomeTagsList: React.FC<HomeTagsListProps> = ({
  tags,
  selectedTag,
  onSelectTag,
  isStoreExpensePage = false,
}) => {
  const isSelected = (tagId?: number) =>
    Boolean(selectedTag?.id && tagId && selectedTag.id === tagId);

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
