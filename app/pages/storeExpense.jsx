import { useState, useEffect } from "react";
import {
  useTheme,
  Button,
  Text,
  IconButton,
  TextInput,
} from "react-native-paper";
import { KeyboardAvoidingView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
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

const StoreExpense = () => {
  const theme = useTheme();
  const {
    isInsert = false,
    isUpdate = false,
    expenseId,
    date,
  } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch();

  const tags = useSelector(getTags);
  const expenseForUpdate =
    isUpdate === "true" || isUpdate === true
      ? useSelector(selectExpenseById(expenseId))
      : null;

  const [name, setName] = useState(
    expenseForUpdate ? expenseForUpdate.name : "",
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
  const [selectedTag, setSelectedTag] = useState(
    expenseForUpdate?.tags?.[0] || null,
  );
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      title:
        isInsert === "true" || isInsert === true
          ? "Nova Despesa"
          : "Editar Despesa",
      headerRight: () => {
        if (isUpdate === "true" || isUpdate === true) {
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
  }, [navigation, isInsert, isUpdate]);

  const handleSaveExpense = () => {
    if (!value || value === "0") {
      showToast("Selecione um valor!");
      return;
    }

    const payload = {
      id: expenseId,
      name: name || null,
      value: parseForDb(value),
      tagId: selectedTag?.id || null,
      date: date || (expenseForUpdate ? expenseForUpdate.createdDate : null),
    };

    if (isInsert === "true" || isInsert === true) {
      dispatch(addExpense(payload));
      showToast("Despesa criada com sucesso!");
    } else {
      dispatch(updateExpense(payload));
      showToast("Despesa atualizada com sucesso!");
    }

    setTimeout(() => router.back(), 300);
  };

  const handleSelectTag = (tag) => {
    if (selectedTag && selectedTag.id === tag.id) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(
      deleteExpense({
        expenseId: expenseId,
        date: date || (expenseForUpdate ? expenseForUpdate.createdDate : null),
      }),
    );
    setIsDialogVisible(false);
    showToast("Despesa excluída!");
    setTimeout(() => router.back(), 300);
  };

  const handleCancelDelete = () => {
    setIsDialogVisible(false);
  };

  function parseForDb(val) {
    return val.replace(/\./g, "").replace(",", ".");
  }

  function handleValueChange(text) {
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

        <SizedBox height="24" />

        <TextInput
          label="Valor"
          mode="outlined"
          value={value}
          onChangeText={handleValueChange}
          maxLength={10}
          keyboardType="numeric"
          left={<TextInput.Affix text="R$" />}
        />

        <SizedBox height="24" />

        <HomeTagsList
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={handleSelectTag}
          isStoreExpensePage={true}
        />

        <SizedBox height="24" />

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
