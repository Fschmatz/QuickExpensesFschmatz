import React, { useMemo } from "react";
import { View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { BarChart } from "react-native-gifted-charts";
import { getMonthName } from "@utils";
import { MonthlyExpenseItem } from "../entities/monthlyExpense";

export interface MonthlyExpensesLineChartProps {
  filteredExpenses?: MonthlyExpenseItem[];
}

const MonthlyExpensesLineChart: React.FC<MonthlyExpensesLineChartProps> = ({
  filteredExpenses,
}) => {
  const theme = useTheme();
  const windowWidth = Dimensions.get("window").width;

  const chartData = useMemo(() => {
    if (!filteredExpenses || filteredExpenses.length === 0) return [];

    const currentDate = new Date();
    const currentYearMonth = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;

    // filteredExpenses vem DESC do banco, inverto eles aqui
    return [...filteredExpenses].reverse().map((expense) => {
      const fullMonthName = getMonthName(expense.date);
      const shortMonthName = fullMonthName
        ? fullMonthName.substring(0, 3) + "."
        : "";

      const isCurrentMonth = expense.date.startsWith(currentYearMonth);

      return {
        value: expense.value,
        label: shortMonthName,
        frontColor: isCurrentMonth
          ? theme.colors.tertiary
          : theme.colors.primary,
      };
    });
  }, [filteredExpenses, theme]);

  if (chartData.length === 0) return null;

  const chartWidth = windowWidth - 48;
  const totalItems = chartData.length;
  const spacing = (chartWidth * 0.25) / totalItems;
  const barWidth = (chartWidth * 0.75) / totalItems;

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 4,
      }}
    >
      <BarChart
        data={chartData}
        width={chartWidth}
        height={160}
        frontColor={theme.colors.primary}
        barWidth={barWidth}
        spacing={spacing}
        initialSpacing={spacing / 2}
        barBorderTopLeftRadius={8}
        barBorderTopRightRadius={8}
        hideRules
        hideYAxisText
        xAxisColor={theme.colors.outlineVariant}
        yAxisColor="transparent"
        yAxisLabelWidth={0}
        xAxisLabelTextStyle={{
          color: theme.colors.onSurfaceVariant,
          fontSize: 11,
        }}
        noOfSections={3}
        rulesColor={theme.colors.outlineVariant}
        showVerticalLines={false}
        isAnimated
        disableScroll
        disablePress
      />
    </View>
  );
};

export default MonthlyExpensesLineChart;
