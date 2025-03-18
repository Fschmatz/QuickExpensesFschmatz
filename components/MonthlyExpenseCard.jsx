import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { appColors } from "@constants";
import { formatDate, formatMoney } from "@utils";

const CardContainer = styled.Pressable`
  background-color: ${appColors.primaryContainer};
  padding: 16px;
  border-radius: 12px;
`;

const CardContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ValueText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${appColors.text};
`;

const DateText = styled.Text`
  font-size: 16px;
  color: ${appColors.text};
`;

const MonthlyExpenseCard = ({ monthlyExpense }) => {
  const router = useRouter();

  const navigateToMonthlyExpenseDetail = (date) => {
    router.push({
      pathname: "/pages/monthYearExpensesDetail",
      params: { date },
    });
  };

  return (
    <CardContainer
      onPress={() => navigateToMonthlyExpenseDetail(monthlyExpense.date)}
      android_ripple={appColors.androidRippleEffect}
      style={({ pressed }) => [pressed && appColors.androidRippleColor]}
    >
      <CardContent>
        <DateText>{formatDate(monthlyExpense.date, "mm/yyyy")}</DateText>
        <ValueText>R$ {formatMoney(monthlyExpense.value)}</ValueText>
      </CardContent>
    </CardContainer>
  );
};

export default MonthlyExpenseCard;
