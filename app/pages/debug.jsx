import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";
import ExpenseService from "../service/expenseService";
import ExpenseTagService from "../service/expenseTagService";
import TagService from "../service/tagService";
import { createTag } from "../entities/tag";
import PageContainer from "../components/PageContainer";
import ExpenseDAO from "../dao/expenseDAO";
import { ScrollView } from "react-native";
import { dropAllTables } from "../db/database";
import * as Clipboard from "expo-clipboard";

const Button = styled.TouchableOpacity`
  background-color: ${AppColors.btnDeleteBackground};
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0px;
  width: 80%;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${AppColors.btnDeleteText};
  font-size: 18px;
  font-weight: bold;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Debug = () => {
  const handleDeleteAllExpenses = async () => {
    await ExpenseService.deleteAll();
  };

  const handleDeleteAllTags = async () => {
    await TagService.deleteAll();
  };

  const handleCreateTags = async () => {
    const newTag1 = createTag(null, "Mercado", "#ff6c61", "cart-outline");
    await TagService.insert(newTag1);
    const newTag2 = createTag(
      null,
      "Restaurante",
      "#73d3ff",
      "restaurant-outline"
    );
    await TagService.insert(newTag2);
  };

  const handleInsertExpenses = async () => {
    await ExpenseDAO.insert("2025-01-01", "150.00");
    await ExpenseDAO.insert("2025-01-15", "150.00");
    await ExpenseDAO.insert("2025-01-09", "150.00");

    await ExpenseDAO.insert("2025-02-25", "100.00");
    await ExpenseDAO.insert("2025-02-19", "100.00");
    await ExpenseDAO.insert("2025-02-01", "100.00");

    await ExpenseDAO.insert("2025-03-19", "20.00");
    await ExpenseDAO.insert("2025-03-10", "20.00");
    await ExpenseDAO.insert("2025-03-15", "20.00");
  };

  const handleDropTables = async () => {
    await dropAllTables();
  };

  const handleCopyAllExpenses = async () => {
    const data = await ExpenseService.fetchAll();
    await Clipboard.setStringAsync(JSON.stringify(data));
  };

  const handleCopyAllTags = async () => {
    const data = await TagService.fetchAll();
    await Clipboard.setStringAsync(JSON.stringify(data));
  };

  const handleCopyAllMonthlyExpenses = async () => {
    const data = await ExpenseService.fetchMonthly();
    await Clipboard.setStringAsync(JSON.stringify(data));
  };

  const handleCopyAllExpensesTags = async () => {
    const data = await ExpenseTagService.fetchAll();
    await Clipboard.setStringAsync(JSON.stringify(data));
  };

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 75 }}>
        <Container>
          <Button onPress={handleDropTables}>
            <ButtonText>### Drop All Tables ###</ButtonText>
          </Button>

          <Button onPress={handleInsertExpenses}>
            <ButtonText>Insert Some Expenses</ButtonText>
          </Button>

          <Button onPress={handleDeleteAllExpenses}>
            <ButtonText>Delete All Expenses</ButtonText>
          </Button>

          <Button onPress={handleDeleteAllTags}>
            <ButtonText>Delete All Tags</ButtonText>
          </Button>

          <Button onPress={handleCreateTags}>
            <ButtonText>Create Tags</ButtonText>
          </Button>

          <Button onPress={handleCopyAllExpenses}>
            <ButtonText>Copy All Expenses</ButtonText>
          </Button>

          <Button onPress={handleCopyAllTags}>
            <ButtonText>Copy All Tags</ButtonText>
          </Button>

          <Button onPress={handleCopyAllMonthlyExpenses}>
            <ButtonText>Copy All Monthly Expenses</ButtonText>
          </Button>

          <Button onPress={handleCopyAllExpensesTags}>
            <ButtonText>Copy All Expenses Tags</ButtonText>
          </Button>
        </Container>
      </ScrollView>
    </PageContainer>
  );
};

export default Debug;
