import React, { useState, useEffect } from "react";
import {
  useTheme,
  Button,
  IconButton,
  TextInput,
} from "react-native-paper";
import { KeyboardAvoidingView } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { showToast, formatCurrencyInput, completeCurrencyZeros } from "@utils";
import {
  HomeTagsList,
  DefaultPageContainer,
  SizedBox,
  ConfirmationDialog,
} from "@components";
import { fetchTags, getTags } from "@tagDuck";
import {
  addExpense,
  updateExpense,
  selectExpenseById,
  deleteExpense,
} from "@expenseDuck";
import { TagItem } from "../../entities/tag";

const StoreExpense: React.FC = () => {
  const theme = useTheme();
  const {
    isInsert = "false",
    isUpdate = "false",
    expenseId,
    date,
  } = useLocalSearchParams<{
    isInsert?: string;
    isUpdate?: string;
    expenseId?: string;
    date?: string;
  }>();
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isUpdateBool = isUpdate === "true";
  const isInsertBool = isInsert === "true";

  const tags = useAppSelector(getTags);
  const expenseForUpdate = isUpdateBool
    ? useAppSelector(selectExpenseById(expenseId ?? ""))
    : null;

  const [name, setName] = useState(
    expenseForUpdate ? (expenseForUpdate.name ?? "") : "",
  );
  const [value, setValue] = useState(
    expenseForUpdate
      ? completeCurrencyZeros(
          formatCurrencyInput(
            expenseForUpdate.value.toString().replace(".", ","),
          ),
        )
      : "0",
  );
  const [selectedTag, setSelectedTag] = useState<TagItem | null>(
    expenseForUpdate?.tags?.[0] || null,
  );
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      title: isInsertBool ? "Nova Despesa" : "Editar Despesa",
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

  const handleSaveExpense = () => {
    if (!value || value === "0") {
      showToast("Selecione um valor!");
      return;
    }

    const numericValue = parseFloat(parseForDb(value));

    if (isInsertBool) {
      dispatch(
        addExpense({
          value: numericValue,
          name: name || null,
          tagId: selectedTag?.id || null,
        }),
      );
      showToast("Despesa criada com sucesso!");
    } else {
      if (expenseId) {
        dispatch(
          updateExpense({
            id: Number(expenseId),
            name: name || null,
            value: numericValue,
            tagId: selectedTag?.id || null,
            date: date || (expenseForUpdate ? expenseForUpdate.createdDate : undefined),
          }),
        );
        showToast("Despesa atualizada com sucesso!");
      }
    }

    setTimeout(() => router.back(), 300);
  };

  const handleSelectTag = (tag: TagItem) => {
    if (selectedTag && selectedTag.id === tag.id) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  const handleConfirmDelete = () => {
    if (expenseId) {
      dispatch(
        deleteExpense({
          expenseId: Number(expenseId),
          date: (date || (expenseForUpdate ? expenseForUpdate.createdDate : "")) ?? "",
        }),
      );
    }
    setIsDialogVisible(false);
    showToast("Despesa excluída!");
    setTimeout(() => router.back(), 300);
  };

  const handleCancelDelete = () => {
    setIsDialogVisible(false);
  };

  function parseForDb(val: string) {
    return val.replace(/\./g, "").replace(",", ".");
  }

  function handleValueChange(text: string) {
    setValue(formatCurrencyInput(text, 10));
  }

  return (
    <DefaultPageContainer>
      <KeyboardAvoidingView behavior={"height"}>
        <TextInput
          label="Nome"
          mode="outlined"
          value={name}
          onChangeText={setName}
          maxLength={30}
        />

        <SizedBox height={24} />

        <TextInput
          label="Valor"
          mode="outlined"
          value={value}
          onChangeText={handleValueChange}
          maxLength={10}
          keyboardType="numeric"
          left={<TextInput.Affix text="R$" />}
        />

        <SizedBox height={24} />

        <HomeTagsList
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={handleSelectTag}
          isStoreExpensePage={true}
        />

        <SizedBox height={24} />

        <Button
          mode="contained"
          icon="content-save-outline"
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          onPress={handleSaveExpense}
          style={{ borderRadius: 25 }}
          labelStyle={{ fontSize: 16, fontWeight: "500" }}
        >
          Salvar
        </Button>
      </KeyboardAvoidingView>

      <ConfirmationDialog
        visible={isDialogVisible}
        setVisible={setIsDialogVisible}
        message={`Deseja excluir "${expenseForUpdate?.name || "a despesa"}"?`}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />
    </DefaultPageContainer>
  );
};

export default StoreExpense;
