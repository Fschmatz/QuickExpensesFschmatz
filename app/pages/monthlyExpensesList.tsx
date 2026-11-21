import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  ScrollView,
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
  SegmentedList,
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

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
            <YearFilterList
              availableYears={availableYears}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />

            <SizedBox height={4} />

            {showTotalYear && (
              <YearlyTotalCard
                selectedYear={selectedYear}
                expenses={filteredExpenses}
              />
            )}

            <SizedBox height={12} />

            {showChartTotalMonth && (
              <MonthlyExpensesLineChart filteredExpenses={filteredExpenses} />
            )}

            <SizedBox height={12} />

            <SegmentedList style={styles.segmentedList}>
              {filteredExpenses.map((expense) => (
                <MonthlyExpenseCard
                  key={expense.date.toString()}
                  monthlyExpense={expense}
                />
              ))}
            </SegmentedList>
          </Animated.View>
        </ScrollView>
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
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 75,
    },
    contentContainer: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
    },
    segmentedList: {
      paddingHorizontal: 16,
    },
  });

export default MonthlyExpensesList;
