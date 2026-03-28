import styled from "styled-components/native";
import { appColors } from "@constants";
import { formatDate, formatMoney } from "@utils";

const CardContainer = styled.Pressable`
  padding: 8px 8px 8px 4px;
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

const TitleText = styled.Text`
  font-size: 14px;
  color: ${appColors.text};
`;

const ExpenseCard = ({ expense, onPress, onLongPress }) => {
  return (
    <CardContainer
      onPress={() => onPress(expense)}
      onLongPress={() => onLongPress(expense)}
      android_ripple={appColors.androidRippleEffect}
      style={({ pressed }) => [pressed && appColors.androidRippleColor]}
      unstable_pressDelay={100}
    >
      <TopRowContainer>
        <TitleText>
          {formatDate(expense.createdDate, "dd/mm/yyyy")}{" "}
          {expense.name
            ? "- " +
              (expense.name.length > 15
                ? expense.name.substring(0, 18) + "..."
                : expense.name)
            : ""}
        </TitleText>
        <ValueText>R$ {formatMoney(expense.value)}</ValueText>
      </TopRowContainer>
    </CardContainer>
  );
};

export default ExpenseCard;
