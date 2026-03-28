import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { KeyboardAvoidingView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { appColors } from "@constants";
import { showToast, formatCurrencyInput, completeCurrencyZeros } from "@utils";
import {
  ButtonWithIcon,
  Label,
  PageContainer,
  SizedBox,
  HomeTagsList,
} from "@components";
import { fetchTags, getTags } from "@tagDuck";
import { addExpense, updateExpense, selectExpenseById } from "@expenseDuck";

const NameInput = styled.TextInput`
  background-color: transparent;
  border-radius: 4px;
  font-size: 16px;
  height: 50px;
  border-width: 1px;
  border-color: #d1d1d1;
  color: ${appColors.text};
  padding: 8px;
`;

const StoreExpense = () => {
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

  useEffect(() => {
    dispatch(fetchTags());
    navigation.setOptions({
      title:
        isInsert === "true" || isInsert === true
          ? "Nova Despesa"
          : "Editar Despesa",
    });
  }, [navigation, dispatch]);

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

    router.back();
  };

  const handleSelectTag = (tag) => {
    if (selectedTag && selectedTag.id === tag.id) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  function parseForDb(val) {
    return val.replace(/\./g, "").replace(",", ".");
  }

  function handleValueChange(text) {
    setValue(formatCurrencyInput(text, 10));
  }

  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={"height"}>
        <Label>Nome:</Label>
        <NameInput
          placeholder=""
          value={name}
          onChangeText={setName}
          maxLength={30}
        />

        <SizedBox height={10} />

        <Label>Valor:</Label>
        <NameInput
          onChangeText={handleValueChange}
          value={value}
          maxLength={10}
          placeholder=""
          keyboardType="numeric"
        />

        <SizedBox height={10} />

        <Label>Tags:</Label>
        <SizedBox height={5} />
        <HomeTagsList
          tags={tags}
          selectedTag={selectedTag}
          onSelectTag={handleSelectTag}
          isStoreExpensePage={true}
        />

        <SizedBox height={10} />

        <ButtonWithIcon
          icon={"save-outline"}
          bgColor={appColors.btnConfirmBackground}
          textColor={appColors.btnConfirmText}
          text={"Salvar"}
          onPress={handleSaveExpense}
        />
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default StoreExpense;
