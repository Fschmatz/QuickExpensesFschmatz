import { View } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { ConfirmationDialog, DefaultPageContainer } from "@components";
import { deleteLoan, getLoans, fetchLoans } from "@loanDuck";
import LoanTile from "../../components/LoanTile";
import { useTheme, FAB } from "react-native-paper";

const LoansList = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const loans = useSelector(getLoans);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  const goToStoreLoanForInsert = () => {
    router.push({
      pathname: "/pages/storeLoan",
      params: { isInsert: true },
    });
  };

  const goToStoreLoanForUpdate = (loan) => {
    router.push({
      pathname: "/pages/storeLoan",
      params: { isUpdate: true, loanId: loan.id },
    });
  };

  const showDeleteConfirmation = (loan) => {
    setLoanToDelete(loan);
    setDialogVisible(true);
  };

  const handleConfirmDelete = () => {
    if (loanToDelete !== null) {
      dispatch(deleteLoan(loanToDelete));
    }
    setDialogVisible(false);
    setLoanToDelete(null);
  };

  const handleCancelDelete = () => {
    setDialogVisible(false);
    setLoanToDelete(null);
  };

  return (
    <DefaultPageContainer>
      <FlatList
        contentContainerStyle={{ gap: 8, paddingBottom: 75 }}
        data={loans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LoanTile
            loan={item}
            onDelete={showDeleteConfirmation}
            onEdit={goToStoreLoanForUpdate}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      />

      <ConfirmationDialog
        message="Marcar este empréstimo como pago?"
        visible={dialogVisible}
        setVisible={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />

      <FAB
        icon="add-outline"
        onPress={goToStoreLoanForInsert}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          borderRadius: 16,
          backgroundColor: theme.colors.primary,
        }}
        color={theme.colors.onPrimary}
      />
    </DefaultPageContainer>
  );
};

export default LoansList;
