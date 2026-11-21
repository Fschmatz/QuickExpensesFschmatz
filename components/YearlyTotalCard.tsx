import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { formatMoney, useStyles } from "@utils";
import { CARD, FONT_WEIGHT } from "@constants";
import { MonthlyExpenseItem } from "../entities/monthlyExpense";

export interface YearlyTotalCardProps {
  selectedYear?: string | number;
  expenses: MonthlyExpenseItem[];
}

const YearlyTotalCard: React.FC<YearlyTotalCardProps> = ({ expenses = [] }) => {
  const styles = useStyles(createStyles);

  const { total, average, median } = useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return { total: 0, average: 0, median: 0 };
    }

    const values = expenses
      .map((e) => parseFloat(String(e.value)) || 0)
      .sort((a, b) => a - b);

    const sum = values.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / values.length;

    const mid = Math.floor(values.length / 2);
    const med =
      values.length % 2 !== 0
        ? values[mid]
        : (values[mid - 1] + values[mid]) / 2;

    return { total: sum, average: avg, median: med };
  }, [expenses]);

  const statsText = useMemo(() => {
    if (!expenses || expenses.length <= 1) return null;
    if (expenses.length === 2) {
      return `Média R$ ${formatMoney(average)}`;
    }
    return `Média R$ ${formatMoney(average)} · Mediana R$ ${formatMoney(median)}`;
  }, [expenses, average, median]);

  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>R$ {formatMoney(total)}</Text>
      {statsText && <Text style={styles.statsText}>{statsText}</Text>}
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: CARD.borderRadius,
      borderWidth: 1,
      borderColor: theme.colors.tertiaryContainer,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },
    totalText: {
      fontSize: 18,
      fontWeight: FONT_WEIGHT.bold,
      color: theme.colors.onTertiaryContainer,
    },
    statsText: {
      fontSize: 12,
      color: theme.colors.onSurfaceVariant,
    },
  });

export default YearlyTotalCard;
