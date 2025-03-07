import React, { useEffect } from "react";
import { FlatList } from "react-native";
import AppColors from "../utils/constants/appColors";
import TagTile from "../components/TagTile";
import { useDispatch, useSelector } from "react-redux";
import { deleteTag, getTags } from "../redux/ducks/tagDuck";
import PageContainer from "../components/PageContainer";
import styled from "styled-components/native";
import FloatingActionButton from "../components/FloatingActionButton";
import { useRouter } from "expo-router";

const Separator = styled.View`
  height: 1px;
  background-color: ${AppColors.text};
  opacity: 0.1;
`;

const TagsList = () => {
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

  const handleDelete = (tagId) => {
    dispatch(deleteTag(tagId));
  };

  return (
    <PageContainer>
      <FlatList
        contentContainerStyle={{ gap: 8, paddingBottom: 75 }}
        data={tags}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TagTile
            tag={item}
            onDelete={handleDelete}
            onEdit={goToStoreTagForUpdate}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <FloatingActionButton
        icon={"add-outline"}
        onPress={goToStoreTagForInsert}
      />
    </PageContainer>
  );
};

export default TagsList;
