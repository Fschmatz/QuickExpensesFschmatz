import { FlatList } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MonthlyExpenseCard, PageContainer } from "@components";
import { fetchMonthlyExpenses, getMonthlyExpenses } from "@expenseDuck";

const MonthlyExpensesList = () => {
  const dispatch = useDispatch();
  const monthlyExpenses = useSelector(getMonthlyExpenses);

  useEffect(() => {
    dispatch(fetchMonthlyExpenses());
  }, [dispatch]);

  return (
    <PageContainer isScrollView={false} containerPadding='0'>
      <FlatList
        contentContainerStyle={{ gap: 8, paddingBottom: 75 }}
        data={monthlyExpenses}
        keyExtractor={(item) => item.date.toString()}
        renderItem={({ item }) => <MonthlyExpenseCard monthlyExpense={item} />}
      />
    </PageContainer>
  );
};

export default MonthlyExpensesList;
