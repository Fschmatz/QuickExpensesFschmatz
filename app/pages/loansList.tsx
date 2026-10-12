import React, { useState, useEffect, useMemo } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from "expo-router";
import { ConfirmationDialog, EmptyState, LoanTile } from "@components";
import { FAB_BUTTON } from "@constants";
import { deleteLoan, getLoans, fetchLoans } from "@loanDuck";
import { useTheme, FAB } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LoanItem } from "../../entities/loan";

const LoansList: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(theme, insets.bottom), [theme, insets.bottom]);
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
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={loans}
        keyExtractor={(item) => item.id?.toString() ?? item.name}
        renderItem={({ item }) => (
          <LoanTile
            loan={item}
            onDelete={showDeleteConfirmation}
            onEdit={goToStoreLoanForUpdate}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
        style={styles.fab}
        color={theme.colors.onPrimary}
      />
    </View>
  );
};

const createStyles = (theme: MD3Theme, bottomInset: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
    },
    listContent: {
      gap: 8,
      paddingBottom: 75 + bottomInset,
      flexGrow: 1,
    },
    separator: {
      height: 2,
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: bottomInset,
      borderRadius: FAB_BUTTON.borderRadius,
      backgroundColor: theme.colors.primary,
    },
  });

export default LoansList;
