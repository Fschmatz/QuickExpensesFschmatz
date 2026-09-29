import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  MonthlyExpenseCard,
  MonthlyExpensesLineChart,
  YearlyTotalCard,
  YearFilterList,
  SizedBox,
} from "@components";
import {
  fetchMonthlyExpenses,
  getMonthlyExpenses,
  getExpensesLoading,
} from "@expenseDuck";
import { selectAppParameterByKeyAsBoolean } from "@appParameterSelector";
import { appParameters } from "@constants";

const MonthlyExpensesList: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const monthlyExpenses = useSelector(getMonthlyExpenses);
  const loading = useSelector(getExpensesLoading);
  const showTotalYear = useSelector(
    selectAppParameterByKeyAsBoolean(
      appParameters.showTotalYearParameter,
      false,
    ),
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState<string | number>(currentYear);
  const showChartTotalMonth = useSelector(
    selectAppParameterByKeyAsBoolean(
      appParameters.showChartTotalMonthParameter,
    ),
  );

  useEffect(() => {
    dispatch(fetchMonthlyExpenses());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, fadeAnim]);

  const availableYears = useMemo(() => {
    if (!monthlyExpenses) return [];
    const years = monthlyExpenses.map((expense) =>
      expense.date.substring(0, 4),
    );
    return [...new Set(years)].sort((a, b) => Number(b) - Number(a));
  }, [monthlyExpenses]);

  const filteredExpenses = useMemo(() => {
    if (!monthlyExpenses) return [];
    return monthlyExpenses.filter(
      (expense) => expense.date.substring(0, 4) === String(selectedYear),
    );
  }, [monthlyExpenses, selectedYear]);

  const yearlyTotal = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.value, 0);
  }, [filteredExpenses]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 100,
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.onBackground} />
        </View>
      ) : (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <YearFilterList
            availableYears={availableYears}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />

          {showTotalYear && (
            <YearlyTotalCard
              selectedYear={selectedYear}
              yearlyTotal={yearlyTotal}
            />
          )}

          {showChartTotalMonth && (
            <MonthlyExpensesLineChart filteredExpenses={filteredExpenses} />
          )}

          <SizedBox height={12} />

          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 50 }}
            data={filteredExpenses}
            keyExtractor={(item) => item.date.toString()}
            renderItem={({ item }) => (
              <MonthlyExpenseCard monthlyExpense={item} />
            )}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default MonthlyExpensesList;
