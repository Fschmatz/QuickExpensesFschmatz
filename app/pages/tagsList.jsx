import { View } from "react-native";
import { useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useTheme, FAB, Divider } from "react-native-paper";
import { ConfirmationDialog, TagTile } from "@components";
import { deleteTag, getTags } from "@tagDuck";

const TagsList = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const tags = useSelector(getTags);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);

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

  const showDeleteConfirmation = (tag) => {
    setTagToDelete(tag);
    setDialogVisible(true);
  };

  const handleConfirmDelete = () => {
    if (tagToDelete !== null) {
      dispatch(deleteTag(tagToDelete));
    }
    setDialogVisible(false);
    setTagToDelete(null);
  };

  const handleCancelDelete = () => {
    setDialogVisible(false);
    setTagToDelete(null);
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
        contentContainerStyle={{ gap: 8, paddingBottom: 75 }}
        showsVerticalScrollIndicator={false}
        data={tags}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TagTile
            tag={item}
            onDelete={showDeleteConfirmation}
            onEdit={goToStoreTagForUpdate}
          />
        )}
        ItemSeparatorComponent={() => <Divider style={{ opacity: 0.1 }} />}
      />

      <ConfirmationDialog
        message="Deseja excluir esta tag?"
        visible={dialogVisible}
        setVisible={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
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
