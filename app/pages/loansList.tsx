import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from "expo-router";
import { ConfirmationDialog, EmptyState } from "@components";
import { deleteLoan, getLoans, fetchLoans } from "@loanDuck";
import LoanTile from "../../components/LoanTile";
import { useTheme, FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LoanItem } from "../../entities/loan";

const LoansList: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loans = useAppSelector(getLoans);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState<LoanItem | null>(null);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  const goToStoreLoanForInsert = () => {
    router.push({
      pathname: "/pages/storeLoan" as any,
      params: { isInsert: "true" },
    });
  };

  const goToStoreLoanForUpdate = (loan: LoanItem) => {
    router.push({
      pathname: "/pages/storeLoan" as any,
      params: { isUpdate: "true", loanId: String(loan.id) },
    });
  };

  const showDeleteConfirmation = (loan: LoanItem) => {
    setLoanToDelete(loan);
    setDialogVisible(true);
  };

  const handleConfirmDelete = () => {
    if (loanToDelete !== null && loanToDelete.id) {
      dispatch(deleteLoan(loanToDelete.id));
    }
    setDialogVisible(false);
    setLoanToDelete(null);
  };

  const handleCancelDelete = () => {
    setDialogVisible(false);
    setLoanToDelete(null);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
      }}
    >
      <FlatList
        contentContainerStyle={{ gap: 8, paddingBottom: 75 + insets.bottom, flexGrow: 1 }}
        data={loans}
        keyExtractor={(item) => item.id?.toString() ?? item.name}
        renderItem={({ item }) => (
          <LoanTile
            loan={item}
            onDelete={showDeleteConfirmation}
            onEdit={goToStoreLoanForUpdate}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
        ListEmptyComponent={
          <EmptyState
            icon="cash-outline"
            title="Nenhum empréstimo"
            subtitle="Você não possui empréstimos registrados."
          />
        }
      />

      <ConfirmationDialog
        message="Marcar este empréstimo como pago?"
        visible={dialogVisible}
        setVisible={setDialogVisible}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />

      <FAB
        icon="plus"
        onPress={goToStoreLoanForInsert}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: insets.bottom,
          borderRadius: 16,
          backgroundColor: theme.colors.primary,
        }}
        color={theme.colors.onPrimary}
      />
    </View>
  );
};

export default LoansList;
