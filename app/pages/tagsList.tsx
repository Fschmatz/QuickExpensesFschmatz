import React from "react";
import { View, FlatList } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { useRouter } from "expo-router";
import { useTheme, FAB } from "react-native-paper";
import { TagTile, EmptyState } from "@components";
import { getTags } from "@tagDuck";
import { TagItem } from "../../entities/tag";

const TagsList: React.FC = () => {
  const theme = useTheme();
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
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
      }}
    >
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 8, paddingBottom: 75, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        data={tags}
        keyExtractor={(item) => item.id?.toString() ?? item.name}
        renderItem={({ item }) => (
          <TagTile
            tag={item}
            onPress={() => goToStoreTagForUpdate(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="pricetag-outline"
            title="Nenhuma tag"
            subtitle="Crie uma tag para categorizar suas despesas."
          />
        }
      />

      <FAB
        icon="plus"
        onPress={goToStoreTagForInsert}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          borderRadius: 16,
          backgroundColor: theme.colors.primary,
        }}
        color={theme.colors.onPrimary}
      />
    </View>
  );
};

export default TagsList;
