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
  deleteExpense,
} from "@expenseDuck";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import {
  ExpenseCard,
  TagChip,
  ExpensePieChart,
  ConfirmationDialog,
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
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

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

  const handleLongPressExpense = (expense) => {
    setSelectedExpense(expense);
    setIsDialogVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedExpense) {
      dispatch(deleteExpense({ expenseId: selectedExpense.id, date: date }));
      setIsDialogVisible(false);
      setSelectedExpense(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDialogVisible(false);
    setSelectedExpense(null);
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
                  <View
                    key={tag.id || tag.name}
                    style={{
                      backgroundColor: theme.colors.elevation.level5,
                      borderRadius: 20,
                      paddingBottom: 12,
                      marginVertical: 8,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginRight: 12,
                        marginLeft: 4,
                        marginVertical: 8,
                      }}
                    >
                      <TagChip key={tag.id} tag={tag} bgColor="transparent" />
                      <Text
                        variant="titleMedium"
                        style={{
                          color: tag.color,
                        }}
                      >
                        {percentage}%
                      </Text>
                    </View>

                    <Divider
                      style={{
                        backgroundColor: theme.colors.background,
                        height: 1,
                      }}
                    />

                    <View
                      style={{
                        backgroundColor: theme.colors.elevation.level3,
                      }}
                    >
                      {expenses.map((expense, index) => (
                        <Fragment key={expense.id || index}>
                          <ExpenseCard
                            expense={expense}
                            onPress={handlePressExpense}
                            onLongPress={handleLongPressExpense}
                          />
                          <Divider
                            style={{
                              backgroundColor: theme.colors.background,
                              height: 1,
                            }}
                          />
                        </Fragment>
                      ))}
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 8,
                        marginHorizontal: 12,
                      }}
                    >
                      <Text
                        variant="titleMedium"
                        style={{
                          color: theme.colors.onBackground,
                        }}
                      >
                        Total:
                      </Text>
                      <Text
                        variant="titleMedium"
                        style={{
                          color: theme.colors.onBackground,
                        }}
                      >
                        R$ {formatMoney(totalTag)}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </Animated.View>
        )}
      </DefaultPageContainer>

      <ConfirmationDialog
        visible={isDialogVisible}
        setVisible={setIsDialogVisible}
        message={`Deseja excluir "${selectedExpense?.name || "a despesa selecionada"}"?`}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />
    </>
  );
};

export default MonthYearExpensesDetail;
