import React, { useState, useEffect } from "react";
import { useTheme, Button, TextInput, IconButton } from "react-native-paper";
import { TouchableOpacity, KeyboardAvoidingView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { tagIcons, tagColors } from "@constants";
import { showToast } from "@utils";
import { addTag, updateTag, deleteTag } from "@tagDuck";
import { selectTagById } from "@tagSelector";
import { createTag } from "../../entities/tag";
import { DefaultPageContainer, SizedBox, ListTile, ConfirmationDialog } from "@components";

const chunkArray = <T,>(arr: T[], rows: number): T[][] => {
  const perRow = Math.ceil(arr.length / rows);
  return Array.from({ length: rows }, (_, i) =>
    arr.slice(i * perRow, i * perRow + perRow),
  );
};

const StoreTag: React.FC = () => {
  const theme = useTheme();
  const { isInsert = "false", isUpdate = "false", tagId } = useLocalSearchParams<{
    isInsert?: string;
    isUpdate?: string;
    tagId?: string;
  }>();
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isUpdateBool = isUpdate === "true";
  const isInsertBool = isInsert === "true";
  const tagForUpdate = useAppSelector(selectTagById(tagId ?? ""));
  const [name, setName] = useState(isUpdateBool ? (tagForUpdate?.name ?? "") : "");
  const [selectedColor, setSelectedColor] = useState(
    isUpdateBool ? (tagForUpdate?.color ?? "#18c435") : "#18c435",
  );
  const [selectedIcon, setSelectedIcon] = useState(
    isUpdateBool ? (tagForUpdate?.icon ?? "bag-outline") : "bag-outline",
  );
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: isInsertBool ? "Nova Tag" : "Editar Tag",
      headerRight: () => {
        if (isUpdateBool) {
          return (
            <IconButton
              icon="delete-outline"
              onPress={() => setIsDialogVisible(true)}
              style={{
                marginRight: -8,
              }}
            />
          );
        }
        return null;
      },
    });
  }, [navigation, isInsertBool, isUpdateBool]);

  const handleConfirmDelete = () => {
    if (tagForUpdate?.id) {
      dispatch(deleteTag(tagForUpdate.id));
    }
    setIsDialogVisible(false);
    showToast("Tag excluída!");
    router.back();
  };

  const handleCancelDelete = () => {
    setIsDialogVisible(false);
  };

  const handleCreateTag = () => {
    if (!name.trim()) {
      showToast("Informe um nome!");
      return;
    }
    if (!selectedColor) {
      showToast("Selecione uma cor!");
      return;
    }
    if (!selectedIcon) {
      showToast("Selecione um ícone!");
      return;
    }

    if (isInsertBool) {
      const newTag = createTag(undefined, name, selectedColor, selectedIcon);
      showToast("Tag criada com sucesso!");
      dispatch(addTag(newTag));
    }

    if (isUpdateBool) {
      if (tagForUpdate) {
        const updatedTag = {
          ...tagForUpdate,
          name: name,
          color: selectedColor,
          icon: selectedIcon,
        };
        showToast("Tag atualizada com sucesso!");
        dispatch(updateTag(updatedTag));
      }
    }

    router.back();
  };

  return (
    <DefaultPageContainer>
      <Animated.View entering={FadeIn.duration(400)}>
        <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
          <TextInput
            label="Nome"
            mode="outlined"
            value={name}
            onChangeText={setName}
            maxLength={20}
            autoFocus={isInsertBool}
          />

          <SizedBox height={12} />

          <ListTile
            title="Cor:"
            titleColor={theme.colors.onPrimaryContainer}
            boldText={true}
            disabled={true}
          />

          <View style={{ gap: 12 }}>
            {chunkArray(tagColors, 2).map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {row.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedColor(color)}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: color,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectedColor === color && (
                      <Ionicons name="checkmark" size={28} color="#000" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <SizedBox height={12} />

          <ListTile
            title="Ícone:"
            titleColor={theme.colors.onPrimaryContainer}
            boldText={true}
            disabled={true}
          />

          <View style={{ gap: 12 }}>
            {chunkArray(tagIcons, 3).map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {row.map((icon, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedIcon(icon)}
                    style={{
                      borderRadius: 50,
                      padding: 10,
                      backgroundColor:
                        selectedIcon === icon
                          ? theme.colors.primary
                          : "transparent",
                    }}
                  >
                    <Ionicons
                      name={icon as any}
                      size={28}
                      color={
                        selectedIcon === icon
                          ? theme.colors.onPrimary
                          : theme.colors.onBackground
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          <View style={{ marginTop: 25 }}>
            <Button
              mode="contained"
              icon="content-save-outline"
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
              onPress={handleCreateTag}
              style={{ borderRadius: 25 }}
              labelStyle={{ fontSize: 16, fontWeight: "500" }}
            >
              Salvar
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
      
      <ConfirmationDialog
        visible={isDialogVisible}
        setVisible={setIsDialogVisible}
        message={`Deseja excluir "${tagForUpdate?.name || "a tag"}"?`}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />
    </DefaultPageContainer>
  );
};

export default StoreTag;
