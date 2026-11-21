import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { useRouter } from "expo-router";
import { useTheme, FAB } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TagTile, EmptyState, SegmentedList } from "@components";
import { FAB_BUTTON } from "@constants";
import { getTags } from "@tagDuck";
import { TagItem } from "../../entities/tag";

const TagsList: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(
    () => createStyles(theme, insets.bottom),
    [theme, insets.bottom],
  );
  const router = useRouter();
  const tags = useAppSelector(getTags);

  const goToStoreTagForInsert = () => {
    router.push({
      pathname: "/pages/storeTag" as any,
      params: { isInsert: "true" },
    });
  };

  const goToStoreTagForUpdate = (tag: TagItem) => {
    router.push({
      pathname: "/pages/storeTag" as any,
      params: { isUpdate: "true", tagId: String(tag.id) },
    });
  };

  return (
    <View style={styles.container}>
      {tags.length === 0 ? (
        <EmptyState
          icon="pricetag-outline"
          title="Nenhuma tag"
          subtitle="Crie uma tag para categorizar suas despesas."
        />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          <SegmentedList>
            {tags.map((tag) => (
              <TagTile
                key={tag.id?.toString() ?? tag.name}
                tag={tag}
                onPress={() => goToStoreTagForUpdate(tag)}
              />
            ))}
          </SegmentedList>
        </ScrollView>
      )}

      <FAB
        icon="plus"
        onPress={goToStoreTagForInsert}
        style={styles.fab}
        color={theme.colors.onPrimary}
      />
    </View>
  );
};

const createStyles = (theme: MD3Theme, bottomInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
    },
    scrollView: {
      flex: 1,
    },
    listContent: {
      paddingTop: 12,
      paddingBottom: 75 + bottomInset,
      flexGrow: 1,
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: bottomInset,
      borderRadius: FAB_BUTTON.borderRadius,
      backgroundColor: theme.colors.primary,
    },
  });

export default TagsList;
