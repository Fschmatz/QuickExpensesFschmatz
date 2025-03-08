import { FlatList } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchByMonthYear,
  getExpensesByMonthYear,
} from "../redux/ducks/expenseDuck";
import { useLocalSearchParams, useNavigation } from "expo-router";
import PageContainer from "../components/PageContainer";
import ExpenseCard from "../components/ExpenseCard";
import { formatDate } from "../utils/functionUtils";

const MonthYearExpensesDetail = () => {
  const { date } = useLocalSearchParams();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const expensesByMonthYear = useSelector(getExpensesByMonthYear);

  useEffect(() => {
    navigation.setOptions({
      title: "Despesas de " + formatDate(date, "mm/yyyy"),
    });
    dispatch(fetchByMonthYear(date));
  }, [dispatch, navigation]);

  return (
    <PageContainer>
      <FlatList
        contentContainerStyle={{ gap: 8, paddingBottom: 75 }}
        data={expensesByMonthYear}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseCard expense={item} />}
      />
    </PageContainer>
  );
};

export default MonthYearExpensesDetail;
