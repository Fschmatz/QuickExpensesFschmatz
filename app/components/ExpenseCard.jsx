import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";
import { formatDate, formatMoney, isEmpty } from "../utils/functionUtils";
import TagChip from "./TagChip";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CardContainer = styled.View`
  background-color: ${AppColors.primaryContainer};
  padding: 12px 16px;
  border-radius: 12px;
`;

const TopRowContainer = styled.View`
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

const BottomRowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ExpenseCard = ({ expense, onDelete }) => {
  return (
    <CardContainer>
      <TopRowContainer>
        <DateText>{formatDate(expense.createdDate, "dd/mm/yyyy")}</DateText>
        <ValueText>R$ {formatMoney(expense.value)}</ValueText>
      </TopRowContainer>

      <BottomRowContainer>
        <View style={{ flex: 1 }}>
          {!isEmpty(expense.tags) && (
            <TagsContainer>
              {expense.tags.map((tag) => (
                <TagChip key={tag.id} tag={tag} />
              ))}
            </TagsContainer>
          )}
        </View>
        <TouchableOpacity onPress={() => onDelete(expense)}>
          <Ionicons
            name="trash-outline"
            size={20}
            color={AppColors.text}     
            style={{ marginTop: !isEmpty(expense.tags) ? 12 : 5}}      
          />
        </TouchableOpacity>
      </BottomRowContainer>
    </CardContainer>
  );
};

export default ExpenseCard;
