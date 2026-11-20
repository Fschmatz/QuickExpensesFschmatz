import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import ExpenseCard from "./ExpenseCard";
import SegmentedList from "./SegmentedList";
import { formatMoney, useStyles, useMaterialYouColor } from "@utils";
import { TagItem } from "../entities/tag";
import { ExpenseItem } from "../entities/expense";
import { FONT_WEIGHT } from "@constants";

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
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const isUntagged = !tag.id || tag.name === "Sem Tag";
  const { primaryContainer, onPrimaryContainer } = useMaterialYouColor(
    isUntagged ? null : tag.color,
  );

  const chipBackgroundColor = isUntagged
    ? theme.colors.elevation.level5
    : primaryContainer;

  const chipTextColor = isUntagged
    ? theme.colors.onBackground
    : onPrimaryContainer;

  const expenseCount = expenses.length;
  const countLabel = `${expenseCount} ${expenseCount === 1 ? "despesa" : "despesas"}`;

  // Só exibe indicadores de maior/menor se houver 3 ou mais despesas e com valores distintos
  const { highestExpenseId, lowestExpenseId } = React.useMemo(() => {
    if (expenses.length < 3) {
      return { highestExpenseId: null, lowestExpenseId: null };
    }

    let max = -Infinity;
    let min = Infinity;
    let highestId: number | string | undefined = undefined;
    let lowestId: number | string | undefined = undefined;

    for (const exp of expenses) {
      const val = parseFloat(String(exp.value)) || 0;
      if (val > max) {
        max = val;
        highestId = exp.id;
      }
      if (val < min) {
        min = val;
        lowestId = exp.id;
      }
    }

    // Se todos os valores forem iguais, não destaca maior/menor
    if (max === min) {
      return { highestExpenseId: null, lowestExpenseId: null };
    }

    return { highestExpenseId: highestId, lowestExpenseId: lowestId };
  }, [expenses]);

  // Cálculo da Média e Mediana
  const { average, median } = React.useMemo(() => {
    if (expenses.length === 0) return { average: 0, median: 0 };

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

    return { average: avg, median: med };
  }, [expenses]);

  const statsText = React.useMemo(() => {
    if (expenses.length <= 1) return null;
    if (expenses.length === 2) {
      return `Média R$ ${formatMoney(average)}`;
    }
    return `Média R$ ${formatMoney(average)} · Mediana R$ ${formatMoney(median)}`;
  }, [expenses.length, average, median]);

  return (
    <SegmentedList style={styles.container} gap={2}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: chipBackgroundColor },
            ]}
          >
            <Ionicons
              name={tag.icon as keyof typeof Ionicons.glyphMap}
              size={20}
              color={chipTextColor}
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text variant="titleSmall" style={styles.headerTitle}>
              {tag.name}
            </Text>
            <Text variant="bodySmall" style={styles.headerSubtitle}>
              {countLabel}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.percentageChip,
            { backgroundColor: chipBackgroundColor },
          ]}
        >
          <Text
            variant="labelMedium"
            style={[styles.percentageText, { color: chipTextColor }]}
          >
            {percentage}%
          </Text>
        </View>
      </View>

      {/* Lista de Despesas */}
      {expenses.map((expense, index) => {
        const extremeType =
          expense.id === highestExpenseId
            ? "highest"
            : expense.id === lowestExpenseId
              ? "lowest"
              : null;

        return (
          <ExpenseCard
            key={expense.id || index}
            expense={expense}
            onPress={onPressExpense}
            extremeType={extremeType}
            chipBackgroundColor={chipBackgroundColor}
            chipTextColor={chipTextColor}
          />
        );
      })}

      {/* Footer */}
      <View style={styles.footerRow}>
        <View style={styles.footerLeft}>
          <Text variant="titleSmall" style={styles.footerLabel}>
            Total
          </Text>
          {statsText && (
            <Text variant="bodySmall" style={styles.footerStats}>
              {statsText}
            </Text>
          )}
        </View>
        <Text
          variant="titleSmall"
          style={[styles.footerValue, { color: chipTextColor }]}
        >
          R$ {formatMoney(totalTag)}
        </Text>
      </View>
    </SegmentedList>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      marginVertical: 8,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      flex: 1,
    },
    iconContainer: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
    },
    headerTextContainer: {
      flexDirection: "column",
    },
    headerTitle: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.bold,
    },
    headerSubtitle: {
      color: theme.colors.onSurfaceVariant,
    },
    percentageChip: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    percentageText: {
      fontWeight: FONT_WEIGHT.bold,
    },
    footerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    footerLeft: {
      flexDirection: "column",
      gap: 2,
    },
    footerLabel: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.bold,
    },
    footerStats: {
      color: theme.colors.onSurfaceVariant,
    },
    footerValue: {
      fontWeight: FONT_WEIGHT.bold,
    },
  });

export default ExpensesDetailCard;
