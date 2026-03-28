import { View, ScrollView, ActivityIndicator, Animated } from "react-native";
import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchByMonthYear,
  getExpensesByMonthYear,
  clearExpensesByMonthYear,
  getExpensesLoading,
  deleteExpense,
} from "@expenseDuck";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import {
  PageContainer,
  ExpenseCard,
  TagChip,
  ExpensePieChart,
  SizedBox,
  ConfirmationDialog,
} from "@components";
import { formatDate, isEmpty, formatMoney } from "@utils";
import { appColors } from "@constants";
import styled from "styled-components/native";

const ExpenseByTagContainer = styled.View`
  border-radius: 16px;
  border-color: ${(props) => props.borderColor};
  border-width: 1px;
  padding: 8px 0 16px 0;
  margin: 8px 0;
`;

const PercentTag = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const TotalTag = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${appColors.text};
`;

const TopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 16px;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: 16px;
  margin-top: 12px;
  margin-left: 16px;
`;

const MonthTotal = styled.Text`
  font-size: 18px;
  text-align: center;
  font-weight: 500;
  color: ${appColors.text};
`;

const MonthYearExpensesDetail = () => {
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
          tagExpenseMap.set(tagId, {
            tag: tag,
            expenses: [],
          });
        }

        tagExpenseMap.get(tagId).expenses.push(expense);
      });
    });

    if (!isEmpty(untaggedExpenses)) {
      tagExpenseMap.set("untagged", {
        tag: {
          id: "99999",
          name: "zzz_",
          color: appColors.text,
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
      params: {
        isUpdate: true,
        expenseId: expense.id,
        date: date,
      },
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
    <PageContainer isScrollView={false}>
      <ScrollView>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 100,
            }}
          >
            <ActivityIndicator size="large" color={appColors.text} />
          </View>
        ) : (
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <ExpensePieChart tagExpenseMap={tagExpenseMap} />

            <MonthTotal>
              Total Mensal: R$ {formatMoney(totalAllExpenses)}
            </MonthTotal>

            <SizedBox height={6} />

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
                  <ExpenseByTagContainer
                    key={tag.id || tag.name}
                    borderColor={tag.color}
                  >
                    <TopContainer>
                      <TagChip key={tag.id} tag={tag} />

                      <PercentTag color={tag.color}>{percentage}%</PercentTag>
                    </TopContainer>

                    <View style={{ gap: 8 }}>
                      {expenses.map((expense, index) => (
                        <ExpenseCard
                          key={expense.id || index}
                          expense={expense}
                          onPress={handlePressExpense}
                          onLongPress={handleLongPressExpense}
                        />
                      ))}
                    </View>

                    <BottomContainer>
                      <TotalTag>Total: </TotalTag>
                      <TotalTag>R$ {formatMoney(totalTag)}</TotalTag>
                    </BottomContainer>
                  </ExpenseByTagContainer>
                );
              })}

            <SizedBox height={50} />
          </Animated.View>
        )}
      </ScrollView>

      <ConfirmationDialog
        visible={isDialogVisible}
        setVisible={setIsDialogVisible}
        message={`Deseja excluir "${selectedExpense?.name || "esta despesa"}"?`}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />
    </PageContainer>
  );
};

export default MonthYearExpensesDetail;
