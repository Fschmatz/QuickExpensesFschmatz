import React, { useState, useEffect } from "react";
import { useTheme, Button, TextInput, IconButton } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { TouchableOpacity, KeyboardAvoidingView, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { tagIcons, tagColors } from "@constants";
import { showToast, useStyles } from "@utils";
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
  const styles = useStyles(createStyles);
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
              style={styles.headerDeleteButton}
            />
          );
        }
        return null;
      },
    });
  }, [navigation, isInsertBool, isUpdateBool, styles.headerDeleteButton]);

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
        <KeyboardAvoidingView behavior={"height"} style={styles.keyboardView}>
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

          <View style={styles.gridContainer}>
            {chunkArray(tagColors, 2).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedColor(color)}
                    style={[styles.colorCircle, { backgroundColor: color }]}
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

          <View style={styles.gridContainer}>
            {chunkArray(tagIcons, 3).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((icon, index) => {
                  const isSelected = selectedIcon === icon;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedIcon(icon)}
                      style={[
                        styles.iconButton,
                        isSelected && styles.iconButtonSelected,
                      ]}
                    >
                      <Ionicons
                        name={icon as any}
                        size={28}
                        color={
                          isSelected
                            ? theme.colors.onPrimary
                            : theme.colors.onBackground
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              icon="content-save-outline"
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
              onPress={handleCreateTag}
              style={styles.saveButton}
              labelStyle={styles.buttonLabel}
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

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    headerDeleteButton: {
      marginRight: -8,
    },
    keyboardView: {
      flex: 1,
    },
    gridContainer: {
      gap: 12,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    colorCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    iconButton: {
      borderRadius: 50,
      padding: 10,
      backgroundColor: "transparent",
    },
    iconButtonSelected: {
      backgroundColor: theme.colors.primary,
    },
    buttonContainer: {
      marginTop: 25,
    },
    saveButton: {
      borderRadius: 25,
    },
    buttonLabel: {
      fontSize: 16,
      fontWeight: "500",
    },
  });

export default StoreTag;
