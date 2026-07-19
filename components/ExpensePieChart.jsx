import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";
import { View, Dimensions } from "react-native";
import PieChart from "react-native-pie-chart";


const ExpensePieChart = ({ tagExpenseMap }) => {
  const theme = useTheme();
  const [series, setSeries] = useState([]);
  const windowWidth = Dimensions.get("window").width;
  const chartSize = windowWidth * 0.45;

  useEffect(() => {
    if (!tagExpenseMap || tagExpenseMap.size === 0) {
      return;
    }

    const series = [];

    Array.from(tagExpenseMap.entries()).forEach(([key, data]) => {
      const { tag, expenses } = data;

      // Calcular o total de despesas para a tag
      const tagTotal = expenses.reduce((sum, expense) => {
        const amount = parseFloat(expense.value || 0);
        return isNaN(amount) ? sum : sum + amount;
      }, 0);

      series.push({
        value: tagTotal,
        color: tag.color,
      });
    });

    setSeries(series);
  }, [tagExpenseMap]);

  const hasData = series.length > 0 && series.some((item) => item.value > 0);

  return (
    <View style={{ backgroundColor: theme.colors.backgroundColor, alignItems: "center" }}>
      {hasData && (
        <>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <PieChart
              widthAndHeight={chartSize}
              series={series}
              sliceColor={series.map((item) => item.color)}
              doughnut={true}
              cover={0.4}
            />
          </View>

          <View style={{ height: 8 }} />
        </>
      )}
    </View>
  );
};

export default ExpensePieChart;
