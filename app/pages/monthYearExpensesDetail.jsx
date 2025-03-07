import { FlatList } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchByMonthYear } from "../redux/ducks/expenseDuck";
import { useLocalSearchParams } from "expo-router";
import PageContainer from "../components/PageContainer";
import styled from "styled-components/native";
import AppColors from "../utils/constants/appColors";

const StyledText = styled.Text`
  color: ${AppColors.text};
`;

const MonthYearExpensesDetail = () => {
  const { date } = useLocalSearchParams();
  const dispatch = useDispatch();
  const expensesByMonthYear = useSelector(
    (state) => state.expenses.expensesByMonthYear
  );

  useEffect(() => {
    dispatch(fetchByMonthYear(date));
  }, [dispatch]);

  return (
    <PageContainer>
      <FlatList
        contentContainerStyle={{ gap: 8, paddingBottom: 75 }}
        data={expensesByMonthYear}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: { id } }) => (
          <StyledText>{`ID: ${id}`}</StyledText>
        )}
      />
    </PageContainer>
  );
};

export default MonthYearExpensesDetail;
