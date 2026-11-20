import React, { useMemo, useState } from "react";
import { useTheme, Text } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { TagItem } from "../entities/tag";
import { ExpenseItem } from "../entities/expense";
import { formatMoney, useStyles } from "@utils";
import { FONT_WEIGHT } from "@constants";

export interface ExpensePieChartProps {
  tagExpenseMap?: Map<
    number | string,
    { tag: TagItem; expenses: ExpenseItem[] }
  >;
  totalAllExpenses?: number;
}

interface PieDataItem {
  value: number;
  color: string;
  label: string;
  pct: string;
  formattedValue: string;
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({
  tagExpenseMap,
  totalAllExpenses,
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { chartData, totalCalculated } = useMemo(() => {
    if (!tagExpenseMap || tagExpenseMap.size === 0) {
      return { chartData: [], totalCalculated: 0 };
    }

    const entries = Array.from(tagExpenseMap.values());
    const rawItems: { tag: TagItem; value: number }[] = [];
    let sum = 0;

    entries.forEach(({ tag, expenses }) => {
      const tagTotal = expenses.reduce((acc, expense) => {
        const amount = parseFloat((expense.value ?? 0).toString());
        return isNaN(amount) ? acc : acc + amount;
      }, 0);

      if (tagTotal > 0) {
        rawItems.push({ tag, value: tagTotal });
        sum += tagTotal;
      }
    });

    const total = totalAllExpenses ?? sum;

    const data: PieDataItem[] = rawItems.map(({ tag, value }) => {
      const pctNumber = total > 0 ? (value / total) * 100 : 0;
      return {
        value,
        color: tag.color,
        label: tag.name,
        pct: `${pctNumber.toFixed(1)}%`,
        formattedValue: `R$ ${formatMoney(value)}`,
      };
    });

    return { chartData: data, totalCalculated: total };
  }, [tagExpenseMap, totalAllExpenses]);

  const hasData = chartData.length > 0;
  const selectedItem =
    selectedIndex >= 0 && selectedIndex < chartData.length
      ? chartData[selectedIndex]
      : null;

  return (
    <View style={styles.container}>
      {hasData && (
        <View style={styles.chartWrapper}>
          <PieChart
            data={chartData}
            donut
            radius={105}
            innerRadius={68}
            innerCircleColor={theme.colors.background}
            strokeWidth={3}
            strokeColor={theme.colors.background}
            focusOnPress
            toggleFocusOnPress
            extraRadius={8}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            isAnimated
            animationDuration={450}
            centerLabelComponent={() => (
              <View style={styles.centerLabelContainer}>
                <Text
                  variant="labelSmall"
                  style={styles.centerLabelTitle}
                  numberOfLines={1}
                >
                  {selectedItem
                    ? `${selectedItem.label} (${selectedItem.pct})`
                    : "Total do mês"}
                </Text>
                <Text
                  variant="titleMedium"
                  style={styles.centerLabelValue}
                  numberOfLines={1}
                >
                  {selectedItem
                    ? selectedItem.formattedValue
                    : `R$ ${formatMoney(totalCalculated)}`}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    chartWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    centerLabelContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 8,
      maxWidth: 130,
    },
    centerLabelTitle: {
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
    },
    centerLabelValue: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.bold,
      marginTop: 2,
      textAlign: "center",
    },
  });

export default ExpensePieChart;
