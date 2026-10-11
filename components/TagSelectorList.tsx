import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import TagChip from "./TagChip";
import { TagItem } from "../entities/tag";
import { useAppSelector } from "../redux/hooks";
import { getTags } from "@tagDuck";

export interface TagSelectorListProps {
  tags?: TagItem[];
  selectedTag?: TagItem | null;
  onSelectTag: (tag: TagItem) => void;
  isStoreExpensePage?: boolean;
}

const TagSelectorList: React.FC<TagSelectorListProps> = ({
  tags: propsTags,
  selectedTag,
  onSelectTag,
  isStoreExpensePage = false,
}) => {
  const reduxTags = useAppSelector(getTags);
  const tags = propsTags ?? reduxTags;

  const isSelected = (tagId?: number) =>
    Boolean(selectedTag?.id && tagId && selectedTag.id === tagId);

  const content = (
    <View style={styles.tagsContainer}>
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
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {content}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
});

export default TagSelectorList;
