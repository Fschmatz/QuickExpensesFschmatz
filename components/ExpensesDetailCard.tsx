import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { formatMoney, formatDate, useStyles } from "@utils";
import ExpenseCard from "./ExpenseCard";
import { TagItem } from "../entities/tag";
import { ExpenseItem } from "../entities/expense";

export interface ExpensesDetailCardProps {
  tag: TagItem;
  expenses: ExpenseItem[];
  totalTag: number;
  percentage: string;
  onPressExpense: (expense: ExpenseItem) => void;
}

const ExpensesDetailCard: React.FC<ExpensesDetailCardProps> = ({
  tag,
  expenses,
  totalTag,
  percentage,
  onPressExpense,
}) => {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Text variant="titleMedium" style={styles.tagName}>
            {tag.name}
          </Text>
          <Text
            variant="titleMedium"
            style={[styles.percentage, { color: tag.color }]}
          >
            {percentage}%
          </Text>
        </View>

        <Text variant="titleMedium" style={styles.totalTag}>
          R$ {formatMoney(totalTag)}
        </Text>
      </View>

      <Divider style={styles.divider} />

      {/* Expenses List */}
      <View style={styles.expensesContainer}>
        {expenses.map((expense, index) => (
          <Fragment key={expense.id ?? index}>
            <ExpenseCard
              title={formatDate(expense.createdDate, "dd/mm/yyyy")}
              subtitle={expense.name}
              value={formatMoney(expense.value)}
              onPress={() => onPressExpense(expense)}
            />
            {index < expenses.length - 1 && (
              <Divider style={styles.expenseDivider} />
            )}
          </Fragment>
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    card: {
      elevation: 0,
      backgroundColor: theme.colors.elevation.level3,
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 16,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
    },
    headerTitleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    tagName: {
      fontWeight: "bold",
      color: theme.colors.onBackground,
    },
    percentage: {
      fontWeight: "bold",
    },
    totalTag: {
      fontWeight: "bold",
      color: theme.colors.onBackground,
    },
    divider: {
      backgroundColor: theme.colors.background,
      height: 1,
    },
    expensesContainer: {
      paddingVertical: 0,
    },
    expenseDivider: {
      backgroundColor: theme.colors.background,
      height: 1,
    },
  });

export default ExpensesDetailCard;
