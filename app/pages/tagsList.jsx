import { useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import {
  ConfirmationDialog,
  TagTile,
  PageContainer,
  Separator,
  FloatingActionButton,
} from "@components";
import { deleteTag, getTags } from "@tagDuck";

const TagsList = () => {
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
    <PageContainer isScrollView={false} containerPadding='0'>
      <FlatList
        contentContainerStyle={{ gap: 8, paddingBottom: 75 }}
        data={tags}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TagTile
            tag={item}
            onDelete={showDeleteConfirmation}
            onEdit={goToStoreTagForUpdate}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <ConfirmationDialog
        message="Deseja excluir esta tag?"
        visible={dialogVisible}
        setVisible={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />

      <FloatingActionButton
        icon={"add-outline"}
        onPress={goToStoreTagForInsert}
      />
    </PageContainer>
  );
};

export default TagsList;
