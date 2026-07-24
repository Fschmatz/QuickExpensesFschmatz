import { useState, useEffect } from "react";
import { useTheme, Button, Text, TextInput } from "react-native-paper";
import { KeyboardAvoidingView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import { showToast, formatCurrencyInput, completeCurrencyZeros } from "@utils";
import { selectLoanById } from "@loanSelector";
import { createLoan } from "../../entities/loan";
import { addLoan, updateLoan } from "@loanDuck";
import { DefaultPageContainer, SizedBox } from "@components";

const StoreLoan = () => {
  const theme = useTheme();
  const { isInsert = false, isUpdate = false, loanId } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch();
  const loanForUpdate = isUpdate ? useSelector(selectLoanById(loanId)) : "";
  const [name, setName] = useState(isUpdate ? loanForUpdate.name : "");
  const [value, setValue] = useState(
    isUpdate
      ? completeCurrencyZeros(
          formatCurrencyInput(loanForUpdate.value.toString().replace(".", ",")),
        )
      : "0",
  );
  const [note, setNote] = useState(isUpdate ? loanForUpdate.note : "");

  useEffect(() => {
    navigation.setOptions({
      title: isInsert ? "Novo Empréstimo" : "Editar Empréstimo",
    });
  }, [navigation]);

  const handleSaveLoan = () => {
    if (!name.trim()) {
      showToast("Informe um nome!");
      return;
    }
    if (!value) {
      showToast("Selecione um valor!");
      return;
    }

    if (isInsert) {
      const newLoan = createLoan(null, name, parseForDb(value), note, null);
      showToast("Empréstimo criado com sucesso!");
      dispatch(addLoan(newLoan));
    }

    if (isUpdate) {
      const updatedLoan = {
        ...loanForUpdate,
        name: name,
        value: parseForDb(value),
        note: note,
      };
      showToast("Empréstimo atualizado com sucesso!");
      dispatch(updateLoan(updatedLoan));
    }

    router.back();
  };

  function parseForDb(val) {
    return val.replace(/\./g, "").replace(",", ".");
  }

  function handleValueChange(text) {
    setValue(formatCurrencyInput(text, 10));
  }

  return (
    <DefaultPageContainer>
      <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
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

        <TextInput
          label="Nota"
          mode="outlined"
          value={note}
          onChangeText={setNote}
          maxLength={250}
          multiline={true}
          numberOfLines={5}
        />

        <View style={{ marginTop: 25 }}>
          <Button
            mode="contained"
            icon="content-save-outline"
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
            onPress={handleSaveLoan}
            style={{ borderRadius: 25 }}
            labelStyle={{ fontSize: 16, fontWeight: "500" }}
          >
            Salvar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </DefaultPageContainer>
  );
};

export default StoreLoan;
