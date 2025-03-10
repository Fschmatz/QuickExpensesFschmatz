import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";
import { formatDate, formatMoney } from "../utils/functionUtils";
import { useRouter } from "expo-router";

const CardContainer = styled.Pressable`
  background-color: ${AppColors.primaryContainer};
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
  color: ${AppColors.text};
`;

const DateText = styled.Text`
  font-size: 16px;
  color: ${AppColors.text};
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
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      style={({ pressed }) => [
        pressed && { opacity: 0.5, backgroundColor: "#FFFFFF" },
      ]}
    >
      <CardContent>
        <DateText>{formatDate(monthlyExpense.date, "mm/yyyy")}</DateText>
        <ValueText>R$ {formatMoney(monthlyExpense.value)}</ValueText>
      </CardContent>
    </CardContainer>
  );
};

export default MonthlyExpenseCard;
