import { useEffect, useState } from "react";
import styled from "styled-components/native";
import PieChart from "react-native-pie-chart";
import { appColors } from "@constants";
import SizedBox from "./SizedBox";
import { Dimensions } from 'react-native';

const Container = styled.View`
  background-color: ${appColors.backgroundColor};
  align-items: center;
`;

const ChartContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const ExpensePieChart = ({ tagExpenseMap }) => {
  const [series, setSeries] = useState([]);
  const windowWidth = Dimensions.get('window').width;
  const chartSize = windowWidth * 0.5;
 
  useEffect(() => {
    if (!tagExpenseMap || tagExpenseMap.size === 0) {
      return;
    }
    
    const series = [];
    const legendItems = [];

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

      legendItems.push({
        id: tag.id,
        name: tag.name,
        color: tag.color,
        icon: tag.icon,
        value: tagTotal,
      });
    });

    setSeries(series);
  }, [tagExpenseMap]);
 
  const hasData = series.length > 0 && series.some((item) => item.value > 0);

  return (
    <Container>
      {hasData && (
        <>
          <ChartContainer>
            <PieChart
              widthAndHeight={chartSize}
              series={series}
              sliceColor={series.map((item) => item.color)}
              doughnut={true}
              cover={0.5}             
            />
          </ChartContainer>

          <SizedBox height={8} />
        </>
      )}
    </Container>
  );
};

export default ExpensePieChart;
