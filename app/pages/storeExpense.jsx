import { useState, useEffect } from "react";
import { useTheme, Button, Text } from "react-native-paper";
import { TextInput, KeyboardAvoidingView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { showToast, formatCurrencyInput, completeCurrencyZeros } from "@utils";
import { HomeTagsList, DefaultPageContainer, SizedBox } from "@components";
import { fetchTags, getTags } from "@tagDuck";
import { addExpense, updateExpense, selectExpenseById } from "@expenseDuck";

const inputStyle = {
  backgroundColor: "transparent",
  borderRadius: 4,
  fontSize: 16,
  height: 50,
  borderWidth: 1,
  borderColor: "#d1d1d1",
  padding: 8,
};

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
    <DefaultPageContainer style={{ paddingHorizontal: 16 }}>
      <KeyboardAvoidingView behavior={"height"}>
        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onBackground, marginBottom: 8 }}
        >
          Nome:
        </Text>
        <TextInput
          style={[inputStyle, { color: theme.colors.onBackground }]}
          placeholder=""
          value={name}
          onChangeText={setName}
          maxLength={30}
        />

        <SizedBox height="24" />

        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onBackground, marginBottom: 8 }}
        >
          Valor:
        </Text>
        <TextInput
          style={[inputStyle, { color: theme.colors.onBackground }]}
          onChangeText={handleValueChange}
          value={value}
          maxLength={10}
          placeholder=""
          keyboardType="numeric"
        />

        <SizedBox height="24" />

        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onBackground, marginBottom: 8 }}
        >
          Tags:
        </Text>

        <SizedBox height="5" />

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
    </DefaultPageContainer>
  );
};

export default StoreExpense;
