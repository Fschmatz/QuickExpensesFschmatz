import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { KeyboardAvoidingView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { appColors } from "@constants";
import { showToast } from "@utils";
import { ButtonWithIcon, Label, PageContainer, SizedBox } from "@components";
import { selectLoanById } from "@loanSelector";
import { createLoan } from "../../entities/loan";
import { addLoan, updateLoan } from "@loanDuck";

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

const NoteInput = styled.TextInput`
  background-color: transparent;
  border-radius: 4px;
  font-size: 16px;
  height: 100px;
  border-width: 1px;
  border-color: #d1d1d1;
  color: ${appColors.text};
  padding: 8px;  
`;

const StoreLoan = () => {
  const { isInsert = false, isUpdate = false, loanId } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch();
  const loanForUpdate = isUpdate ? useSelector(selectLoanById(loanId)) : "";
  const [name, setName] = useState(isUpdate ? loanForUpdate.name : "");
  const [value, setValue] = useState(isUpdate ? cleanValue(loanForUpdate.value.toString()) : 0);
  const [note, setNote] = useState(isUpdate ? loanForUpdate.note : "");

  useEffect(() => {
    navigation.setOptions({
      title: isInsert ? "Novo Empréstimo" : "Editar Empréstimo",
    });
  }, [navigation]);

  const handleCreateTag = () => {
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
    setValue(cleanValue(text));
  }

  function cleanValue(text) {
    let cleaned = text.replace(/[^0-9,]/g, "");

    if ((cleaned.match(/,/g) || []).length > 1) {
      return;
    }

    if (cleaned.includes(",")) {
      const [intPart, decimalPart] = cleaned.split(",");
      cleaned = intPart + "," + decimalPart.slice(0, 2);
    }

    return cleaned;
  }

  return (
    <PageContainer>
      <KeyboardAvoidingView behavior={"height"} style={{ flex: 1 }}>
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
          maxLength={6}
          placeholder=""
          keyboardType="numeric"
        />

        <SizedBox height={10} />

        <Label>Nota:</Label>
        <NoteInput
          onChangeText={setNote}
          value={note}
          maxLength={100}
          placeholder=""
          multiline={true}      
          numberOfLines={3}      
          textAlignVertical="top" 
        />

        <View style={{ marginTop: 25 }}>
          <ButtonWithIcon
            icon={"save-outline"}
            bgColor={appColors.btnConfirmBackground}
            textColor={appColors.btnConfirmText}
            text={"Salvar"}
            onPress={handleCreateTag}
          />
        </View>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default StoreLoan;
