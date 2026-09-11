import { View } from "react-native";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useTheme, FAB, Divider } from "react-native-paper";
import { TagTile, EmptyState } from "@components";
import { getTags } from "@tagDuck";

const TagsList = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const tags = useSelector(getTags);

  const goToStoreTagForInsert = () => {
    router.push({
      pathname: "/pages/storeTag",
      params: { isInsert: true },
    });
  };

  const goToStoreTagForUpdate = (tag) => {
    router.push({
      pathname: "/pages/storeTag",
      params: { isUpdate: true, tagId: tag.id },
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
        keyExtractor={(item) => item.id.toString()}
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
