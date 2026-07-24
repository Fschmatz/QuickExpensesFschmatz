import { View, ScrollView, ActivityIndicator, Animated } from "react-native";
import { useTheme } from "react-native-paper";
import { useEffect, useState, useMemo, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Divider } from "react-native-paper";
import {
  fetchByMonthYear,
  getExpensesByMonthYear,
  clearExpensesByMonthYear,
  getExpensesLoading,
} from "@expenseDuck";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import {
  ExpenseCard,
  ExpensesDetailCard,
  ExpensePieChart,
  DefaultPageContainer,
  SizedBox,
} from "@components";
import { formatDate, isEmpty, formatMoney } from "@utils";

const MonthYearExpensesDetail = () => {
  const theme = useTheme();
  const { date } = useLocalSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const navigation = useNavigation();
  const expensesByMonthYear = useSelector(getExpensesByMonthYear);
  const loading = useSelector(getExpensesLoading);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  const tagExpenseMap = useMemo(() => {
    return createTagExpenseMap(expensesByMonthYear || []);
  }, [expensesByMonthYear]);

  useEffect(() => {
    navigation.setOptions({
      title: "Despesas de " + formatDate(date, "mm/yyyy"),
    });
    dispatch(fetchByMonthYear(date));

    return () => {
      dispatch(clearExpensesByMonthYear());
    };
  }, [dispatch, navigation]);

  function createTagExpenseMap(expenses) {
    const tagExpenseMap = new Map();
    const untaggedExpenses = [];

    expenses.forEach((expense) => {
      if (!expense.tags || expense.tags.length === 0) {
        untaggedExpenses.push(expense);
        return;
      }

      expense.tags.forEach((tag) => {
        const tagId = tag.id;
        if (!tagExpenseMap.has(tagId)) {
          tagExpenseMap.set(tagId, { tag: tag, expenses: [] });
        }
        tagExpenseMap.get(tagId).expenses.push(expense);
      });
    });

    if (!isEmpty(untaggedExpenses)) {
      tagExpenseMap.set("untagged", {
        tag: {
          id: "99999",
          name: "zzz_",
          color: theme.colors.onBackground,
          icon: "pricetag-outline",
        },
        expenses: untaggedExpenses,
      });
    }

    return tagExpenseMap;
  }

  const handlePressExpense = (expense) => {
    router.push({
      pathname: "/pages/storeExpense",
      params: { isUpdate: true, expenseId: expense.id, date: date },
    });
  };

  const totalAllExpenses = Array.from(tagExpenseMap.values())
    .flatMap(({ expenses }) => expenses)
    .reduce((sum, expense) => {
      const amount = parseFloat(expense?.value) || 0;
      return sum + amount;
    }, 0);

  return (
    <>
      <DefaultPageContainer>
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
            <SizedBox height="12" />

            <ExpensePieChart tagExpenseMap={tagExpenseMap} />

            <SizedBox height="12" />

            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontWeight: "500",
                color: theme.colors.onBackground,
              }}
            >
              Total Mensal: R$ {formatMoney(totalAllExpenses)}
            </Text>

            <SizedBox height="12" />

            {Array.from(tagExpenseMap.values())
              .sort((a, b) => a.tag.name.localeCompare(b.tag.name))
              .map(({ tag, expenses }) => {
                const totalTag = expenses.reduce((sum, expense) => {
                  const amount = parseFloat(expense?.value) || 0;
                  return sum + amount;
                }, 0);
                const percentage = (
                  (totalTag / totalAllExpenses) *
                  100
                ).toFixed(2);

                return (
                  <ExpensesDetailCard
                    key={tag.id || tag.name}
                    tag={tag}
                    expenses={expenses}
                    totalTag={totalTag}
                    percentage={percentage}
                    onPressExpense={handlePressExpense}
                  />
                );
              })}
          </Animated.View>
        )}
      </DefaultPageContainer>
    </>
  );
};

export default MonthYearExpensesDetail;
