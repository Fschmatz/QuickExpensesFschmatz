import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import ExpenseCard from "./ExpenseCard";
import { formatMoney, useStyles } from "@utils";
import { TagItem } from "../entities/tag";
import { ExpenseItem } from "../entities/expense";

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
      {/* Header com Ícone, Nome da Tag e Porcentagem */}
      <View style={styles.headerRow}>
        <View style={styles.tagInfo}>
          <Ionicons
            name={tag.icon as keyof typeof Ionicons.glyphMap}
            size={20}
            color={tag.color}
          />
          <Text variant="titleSmall" style={styles.tagName}>
            {tag.name}
          </Text>
        </View>
        <Text
          variant="titleSmall"
          style={[styles.percentageText, { color: tag.color }]}
        >
          {percentage}%
        </Text>
      </View>

      <Divider bold style={styles.divider} />

      {/* Lista de Despesas */}
      <View style={styles.expensesListContainer}>
        {expenses.map((expense, index) => (
          <Fragment key={expense.id || index}>
            <ExpenseCard expense={expense} onPress={onPressExpense} />
            <Divider bold style={styles.divider} />
          </Fragment>
        ))}
      </View>

      {/* Footer com Total */}
      <View style={styles.footerRow}>
        <Text variant="titleSmall" style={styles.footerLabel}>
          Total:
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
      backgroundColor: theme.colors.elevation.level1,
      borderRadius: 20,
      paddingBottom: 12,
      marginVertical: 8,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginRight: 12,
      marginLeft: 12,
      marginVertical: 12,
    },
    tagInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    tagName: {
      color: theme.colors.onBackground,
      fontWeight: "bold",
    },
    percentageText: {
      fontWeight: "bold",
    },
    divider: {
      backgroundColor: theme.colors.background,
    },
    expensesListContainer: {
      backgroundColor: theme.colors.elevation.level3,
    },
    footerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 12,
      marginHorizontal: 12,
    },
    footerLabel: {
      color: theme.colors.onBackground,
      fontWeight: "bold",
    },
    footerValue: {
      color: theme.colors.onBackground,
      fontWeight: "bold",
    },
  });

export default ExpensesDetailCard;
