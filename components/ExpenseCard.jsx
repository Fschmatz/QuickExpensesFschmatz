import styled from "styled-components/native";
import { appColors } from "@constants";
import { formatDate, formatMoney } from "@utils";

const CardContainer = styled.Pressable` 
  padding: 8px 16px;
  border-radius: 12px;
`;

const TopRowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ValueText = styled.Text`
  font-size: 14px;
  color: ${appColors.text};
`;

const DateText = styled.Text`
  font-size: 14px;
  color: ${appColors.text};
`;

const ExpenseCard = ({ expense, onDelete }) => {
  return (
    <CardContainer
      onLongPress={() => onDelete(expense)}
      android_ripple={appColors.androidRippleEffect}
      style={({ pressed }) => [pressed && appColors.androidRippleColor]}
    >
      <TopRowContainer>
        <DateText>{formatDate(expense.createdDate, "dd/mm/yyyy")}</DateText>
        <ValueText>R$ {formatMoney(expense.value)}</ValueText>
      </TopRowContainer>
    </CardContainer>
  );
};

export default ExpenseCard;
