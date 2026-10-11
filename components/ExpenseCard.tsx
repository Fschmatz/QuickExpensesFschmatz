import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { formatDate, formatMoney, useStyles } from "@utils";
import { ExpenseItem } from "../entities/expense";

export interface ExpenseCardProps {
  expense: ExpenseItem;
  onPress: (expense: ExpenseItem) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onPress }) => {
  const styles = useStyles(createStyles);

  return (
    <TouchableRipple onPress={() => onPress(expense)} style={styles.ripple}>
      <View style={styles.container}>
        <Text variant="titleSmall" style={styles.titleText}>
          {formatDate(expense.createdDate, "dd/mm/yyyy")}{" "}
          {expense.name
            ? "- " +
              (expense.name.length > 15
                ? expense.name.substring(0, 18) + "..."
                : expense.name)
            : ""}
        </Text>

        <Text variant="titleSmall" style={styles.valueText}>
          R$ {formatMoney(expense.value)}
        </Text>
      </View>
    </TouchableRipple>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    ripple: {
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    titleText: {
      color: theme.colors.onBackground,
    },
    valueText: {
      color: theme.colors.onBackground,
    },
  });

export default ExpenseCard;
