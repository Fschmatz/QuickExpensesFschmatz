import React from "react";
import { StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchByMonthYear,
  getExpensesByMonthYear,
  clearExpensesByMonthYear,
  getExpensesLoading,
} from "@expenseDuck";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import {
  ExpensesDetailCard,
  ExpensePieChart,
  DefaultPageContainer,
  SizedBox,
  EmptyState,
} from "@components";
import { formatDate, isEmpty, formatMoney, useStyles } from "@utils";
import Animated, { FadeIn } from "react-native-reanimated";
import { ExpenseItem } from "../../entities/expense";
import { TagItem } from "../../entities/tag";

interface TagExpenseEntry {
  tag: TagItem;
  expenses: ExpenseItem[];
}

const MonthYearExpensesDetail: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const { date } = useLocalSearchParams<{ date?: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const navigation = useNavigation();
  const expensesByMonthYear = useAppSelector(getExpensesByMonthYear);
  const loading = useAppSelector(getExpensesLoading);

  const tagExpenseMap = React.useMemo(() => {
    return createTagExpenseMap(expensesByMonthYear || []);
  }, [expensesByMonthYear]);

  React.useEffect(() => {
    navigation.setOptions({
      title: "Despesas de " + formatDate(date ?? "", "mm/yyyy"),
    });
    if (date) {
      dispatch(fetchByMonthYear(date));
    }

    return () => {
      dispatch(clearExpensesByMonthYear());
    };
  }, [dispatch, navigation, date]);

  function createTagExpenseMap(expenses: ExpenseItem[]): Map<string | number, TagExpenseEntry> {
    const map = new Map<string | number, TagExpenseEntry>();
    const untaggedExpenses: ExpenseItem[] = [];

    expenses.forEach((expense) => {
      if (!expense.tags || expense.tags.length === 0) {
        untaggedExpenses.push(expense);
        return;
      }

      expense.tags.forEach((tag) => {
        const tagId = tag.id ?? tag.name;
        if (!map.has(tagId)) {
          map.set(tagId, { tag: tag, expenses: [] });
        }
        map.get(tagId)!.expenses.push(expense);
      });
    });

    if (!isEmpty(untaggedExpenses)) {
      map.set("untagged", {
        tag: {
          id: undefined,
          name: "Sem Tag",
          color: theme.colors.onBackground,
          icon: "pricetag-outline",
        },
        expenses: untaggedExpenses,
      });
    }

    return map;
  }

  const handlePressExpense = (expense: ExpenseItem) => {
    router.push({
      pathname: "/pages/storeExpense" as any,
      params: { isUpdate: "true", expenseId: String(expense.id), date: date },
    });
  };

  const totalAllExpenses = Array.from(tagExpenseMap.values())
    .flatMap(({ expenses }) => expenses)
    .reduce((sum, expense) => {
      const amount = parseFloat((expense?.value ?? 0).toString()) || 0;
      return sum + amount;
    }, 0);

  return (
    <DefaultPageContainer>
      {loading ? (
        <Animated.View style={styles.loadingContainer} />
      ) : tagExpenseMap.size === 0 ? (
        <Animated.View
          entering={FadeIn.duration(400)}
          style={styles.emptyContainer}
        >
          <EmptyState
            icon="receipt-outline"
            title="Nenhuma despesa"
            subtitle="Não há despesas registradas para este período."
          />
        </Animated.View>
      ) : (
        <Animated.View entering={FadeIn.duration(400)}>
          <SizedBox height={12} />

          <ExpensePieChart tagExpenseMap={tagExpenseMap} />

          <SizedBox height={12} />

          <Text style={styles.monthTotalText}>
            Total Mensal: R$ {formatMoney(totalAllExpenses)}
          </Text>

          <SizedBox height={12} />

          {Array.from(tagExpenseMap.values())
            .sort((a, b) => {
              if (a.tag.name === "Sem Tag") return 1;
              if (b.tag.name === "Sem Tag") return -1;
              return a.tag.name.localeCompare(b.tag.name);
            })
            .map(({ tag, expenses }) => {
              const totalTag = expenses.reduce((sum, expense) => {
                const amount = parseFloat((expense?.value ?? 0).toString()) || 0;
                return sum + amount;
              }, 0);
              const percentage = (
                (totalTag / (totalAllExpenses || 1)) *
                100
              ).toFixed(2);

              return (
                <ExpensesDetailCard
                  key={tag.id ?? tag.name}
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
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
    },
    emptyContainer: {
      flex: 1,
    },
    monthTotalText: {
      fontSize: 18,
      textAlign: "center",
      fontWeight: "500",
      color: theme.colors.onBackground,
    },
  });

export default MonthYearExpensesDetail;
