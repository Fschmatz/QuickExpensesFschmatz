import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import {
  ConfirmationDialog,
  PageContainer,
  Separator,
  FloatingActionButton,
} from "@components";
import { deleteLoan, getLoans, fetchLoans } from "@loanDuck";
import LoanTile from "../../components/LoanTile";

const LoansList = () => {
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
    <PageContainer isScrollView={false} containerPadding="0">
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
        ItemSeparatorComponent={() => <Separator />}
      />

      <ConfirmationDialog
        message="Deseja excluir este empréstimo?"
        visible={dialogVisible}
        setVisible={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />

      <FloatingActionButton
        icon={"add-outline"}
        onPress={goToStoreLoanForInsert}
      />
    </PageContainer>
  );
};

export default LoansList;
