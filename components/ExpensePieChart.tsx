import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { View, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { TagItem } from "../entities/tag";
import { ExpenseItem } from "../entities/expense";
import { useStyles } from "@utils";

export interface ExpensePieChartProps {
  tagExpenseMap?: Map<
    number | string,
    { tag: TagItem; expenses: ExpenseItem[] }
  >;
}

interface PieDataItem {
  value: number;
  color: string;
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ tagExpenseMap }) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const [pieData, setPieData] = useState<PieDataItem[]>([]);
  const windowWidth = Dimensions.get("window").width;
  const chartSize = windowWidth * 0.45;

  useEffect(() => {
    if (!tagExpenseMap || tagExpenseMap.size === 0) {
      setPieData([]);
      return;
    }

    const data: PieDataItem[] = [];

    Array.from(tagExpenseMap.entries()).forEach(([, entry]) => {
      const { tag, expenses } = entry;

      // Calcular o total de despesas para a tag
      const tagTotal = expenses.reduce((sum, expense) => {
        const amount = parseFloat((expense.value ?? 0).toString());
        return isNaN(amount) ? sum : sum + amount;
      }, 0);

      if (tagTotal > 0) {
        data.push({
          value: tagTotal,
          color: tag.color,
        });
      }
    });

    setPieData(data);
  }, [tagExpenseMap]);

  const hasData = pieData.length > 0;

  return (
    <View style={styles.container}>
      {hasData && (
        <View style={styles.chartWrapper}>
          <PieChart
            data={pieData}
            radius={chartSize / 2.3}
            innerRadius={chartSize * 0.15}
            innerCircleColor={theme.colors.background}
            donut
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
    },
    chartWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default ExpensePieChart;
