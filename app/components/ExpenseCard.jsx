import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";
import { formatDate, formatMoney, isEmpty } from "../utils/functionUtils";
import TagChip from "./TagChip";

const CardContainer = styled.View`
  background-color: ${AppColors.primaryContainer};
  padding: 12px 16px;
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

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`;

const ExpenseCard = ({ expense }) => {
  return (
    <CardContainer>
      <CardContent>
        <DateText>{formatDate(expense.createdDate, "dd/mm/yyyy")}</DateText>
        <ValueText>R$ {formatMoney(expense.value)}</ValueText>
      </CardContent>

      {!isEmpty(expense.tags) && (
        <TagsContainer>
          {expense.tags.map((tag) => (
            <TagChip key={tag.id} tag={tag} />
          ))}
        </TagsContainer>
      )}
    </CardContainer>
  );
};

export default ExpenseCard;
