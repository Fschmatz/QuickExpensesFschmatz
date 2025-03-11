import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";
import ExpenseService from "../service/expenseService";
import ExpenseTagService from "../service/expenseTagService";
import TagService from "../service/tagService";
import { createTag } from "../entities/tag";
import ExpenseDAO from "../dao/expenseDAO";
import { dropAllTables } from "../db/database";
import * as Clipboard from "expo-clipboard";
import { PageContainer } from "../components/utils";
import { useDispatch } from "react-redux";
import { fetchTags } from "../redux/ducks/tagDuck";
//import { exportBackup, importBackup } from "../db/backup";

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.backgroundColor};
  padding: 12px;
  border-radius: 10px;
  margin: 10px 0px;
  width: 95%;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${AppColors.btnDeleteText};
  font-size: 16px;
  font-weight: 900;
`;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Debug = () => {
  const dispatch = useDispatch();

  const createButtonDebug = (
    onPress,
    text,
    backgroundColor = AppColors.btnDeleteBackground
  ) => (
    <Button onPress={onPress} backgroundColor={backgroundColor}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );

  const handleDeleteAllExpenses = async () => {
    await ExpenseService.deleteAll();
  };

  const handleDeleteAllTags = async () => {
    await TagService.deleteAll();
    reloadTags();
  };

  const handleCreateTags = async () => {
    const newTag1 = createTag(
      null,
      "Alimentação",
      "#f0fd62",
      "restaurant-outline"
    );
    await TagService.insert(newTag1);

    const newTag2 = createTag(null, "Compras", "#6ddab6", "bag-outline");
    await TagService.insert(newTag2);

    const newTag3 = createTag(
      null,
      "Contas",
      "#f75380",
      "document-text-outline"
    );
    await TagService.insert(newTag3);

    const newTag4 = createTag(null, "Gasolina", "#6d94da", "water-outline");
    await TagService.insert(newTag4);

    const newTag5 = createTag(null, "Lazer", "#b277cb", "balloon-outline");
    await TagService.insert(newTag5);

    const newTag6 = createTag(null, "Mercado", "#36A348", "cart-outline");
    await TagService.insert(newTag6);

    reloadTags();
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

  /*  const handleExportBackup = async () => {
    await exportBackup();
  };

  const handleImportBackup = async () => {
    await importBackup();
    reloadTags();
  }; */

  const reloadTags = async () => {
    dispatch(fetchTags());
  };

  return (
    <PageContainer>
      <Container>
        {createButtonDebug(
          handleDropTables,
          "### Dropar Tabelas ###",
          "#a11212"
        )}
        {createButtonDebug(
          handleDeleteAllExpenses,
          "Excluir Despesas",
          "#aa3737"
        )}
        {createButtonDebug(handleDeleteAllTags, "Excluir Tags", "#aa3737")}
        {createButtonDebug(handleInsertExpenses, "Criar Despesas", "#1e5b94")}
        {createButtonDebug(handleCreateTags, "Criar Tags", "#1e5b94")}
        {createButtonDebug(handleCopyAllExpenses, "Copiar Despesas")}
        {createButtonDebug(handleCopyAllTags, "Copiar Tags")}
        {createButtonDebug(
          handleCopyAllMonthlyExpenses,
          "Copiar Despesas Mensais"
        )}
        {createButtonDebug(handleCopyAllExpensesTags, "Copiar Tags_Despesas")}

        {/* {createButtonDebug(handleExportBackup, "Criar Backup", "#bb5e28")}
          {createButtonDebug(handleImportBackup, "Importar Backup", "#bb5e28")} */}
      </Container>
    </PageContainer>
  );
};

export default Debug;
