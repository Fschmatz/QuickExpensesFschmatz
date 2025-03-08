import { FlatList } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MonthlyExpenseCard from "../components/MonthlyExpenseCard";
import { fetchMonthlyExpenses, getMonthlyExpenses } from "../redux/ducks/expenseDuck";
import { PageContainer } from "../components/utils";

const MonthlyExpensesList = () => {
  const dispatch = useDispatch();
  const monthlyExpenses = useSelector(getMonthlyExpenses);

  useEffect(() => {
    dispatch(fetchMonthlyExpenses());
  }, [dispatch]);

  return (
    <PageContainer>
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
