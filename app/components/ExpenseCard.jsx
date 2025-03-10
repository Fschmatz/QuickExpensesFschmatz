import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";
import { formatDate, formatMoney, isEmpty } from "../utils/functionUtils";
import TagChip from "./TagChip";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CardContainer = styled.Pressable`
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

const ExpenseCard = ({ expense, onDelete }) => {
  return (
    <CardContainer
      onLongPress={() => onDelete(expense)}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      style={({ pressed }) => [
        pressed && { opacity: 0.5, backgroundColor: "#FFFFFF" },
      ]}
    >
      <TopRowContainer>
        <DateText>{formatDate(expense.createdDate, "dd/mm/yyyy")}</DateText>
        <ValueText>R$ {formatMoney(expense.value)}</ValueText>
      </TopRowContainer>
    </CardContainer>
  );
};

export default ExpenseCard;
