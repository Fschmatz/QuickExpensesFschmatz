import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import ExpenseCard from "./ExpenseCard";
import { formatMoney, useStyles } from "@utils";
import { TagItem } from "../entities/tag";
import { ExpenseItem } from "../entities/expense";
import { CARD, FONT_WEIGHT } from "@constants";

export interface ExpensesDetailCardProps {
  tag: TagItem;
  expenses: ExpenseItem[];
  totalTag: number;
  percentage: number | string;
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
    <View style={styles.cardContainer}>
      {/* Header com Ícone, Nome da Tag e Porcentagem juntos */}
      <View style={styles.headerRow}>
        <Ionicons
          name={tag.icon as keyof typeof Ionicons.glyphMap}
          size={22}
          color={tag.color}
        />
        <Text variant="titleSmall" style={styles.headerTitle}>
          {tag.name} - {percentage}%
        </Text>
      </View>

      {/* Lista de Despesas */}
      <View style={styles.expensesListContainer}>
        {expenses.map((expense, index) => (
          <React.Fragment key={expense.id || index}>
            <ExpenseCard expense={expense} onPress={onPressExpense} />
            {index < expenses.length - 1 && (
              <Divider style={styles.itemDivider} />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Divisor único antes do total */}
      <Divider style={styles.divider} />

      {/* Footer com Total da categoria */}
      <View style={styles.footerRow}>
        <Text variant="titleSmall" style={styles.footerLabel}>
          Total
        </Text>
        <Text variant="titleSmall" style={styles.footerValue}>
          R$ {formatMoney(totalTag)}
        </Text>
      </View>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: theme.colors.elevation.level3,
      borderRadius: CARD.borderRadius,
      paddingTop: 14,
      paddingBottom: 14,
      paddingHorizontal: 0,
      overflow: "hidden",
      marginVertical: 8,
      elevation: 0,
      shadowColor: "transparent",
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 8,
      paddingHorizontal: 16,
    },
    headerTitle: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.bold,
    },
    expensesListContainer: {
      gap: 0,
    },
    itemDivider: {
      marginHorizontal: 16,
      marginVertical: 0,
      backgroundColor: theme.colors.outline,
      opacity: 0.2,
    },
    divider: {
      marginHorizontal: 16,
      backgroundColor: theme.colors.outline,
      opacity: 0.6,
    },
    footerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      marginTop: 10,
    },
    footerLabel: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.bold,
    },
    footerValue: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.bold,
    },
  });

export default ExpensesDetailCard;
