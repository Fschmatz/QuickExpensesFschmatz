import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  Animated,
  StyleSheet,
} from "react-native";
import { useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
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
import { useStyles } from "@utils";

const MonthlyExpensesList: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const monthlyExpenses = useAppSelector(getMonthlyExpenses);
  const loading = useAppSelector(getExpensesLoading);
  const showTotalYear = useAppSelector(
    selectAppParameterByKeyAsBoolean(
      appParameters.showTotalYearParameter,
      false,
    ),
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState<string | number>(currentYear);
  const showChartTotalMonth = useAppSelector(
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
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.onBackground} />
        </View>
      ) : (
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
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
            contentContainerStyle={styles.listContent}
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

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
    },
    contentContainer: {
      flex: 1,
    },
    listContent: {
      gap: 8,
      paddingBottom: 50,
    },
  });

export default MonthlyExpensesList;
