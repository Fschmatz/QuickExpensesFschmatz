import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  fetchByMonthYear,
  getExpensesByMonthYear,
  deleteExpense,
  clearExpensesByMonthYear,
} from "@expenseDuck";
import {
  PageContainer,
  ExpenseCard,
  ConfirmationDialog,
  TagChip,
  ExpensePieChart,
  SizedBox,
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
  const navigation = useNavigation();
  const expensesByMonthYear = useSelector(getExpensesByMonthYear);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [tagExpenseMap, setTagExpenseMap] = useState(new Map());

  useEffect(() => {
    navigation.setOptions({
      title: "Despesas de " + formatDate(date, "mm/yyyy"),
    });
    dispatch(fetchByMonthYear(date));

    return () => {
      dispatch(clearExpensesByMonthYear());
    };
  }, [dispatch, navigation]);

  useEffect(() => {
    if (expensesByMonthYear) {
      const tagMap = createTagExpenseMap(expensesByMonthYear);
      setTagExpenseMap(tagMap);
    }
  }, [expensesByMonthYear]);

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

  const showDeleteConfirmation = (expense) => {
    setExpenseToDelete(expense);
    setDialogVisible(true);
  };

  const handleConfirmDelete = () => {
    if (expenseToDelete !== null) {
      dispatch(
        deleteExpense({
          expenseId: expenseToDelete.id,
          date: date,
        })
      );
    }
    setDialogVisible(false);
    setExpenseToDelete(null);
  };

  const handleCancelDelete = () => {
    setDialogVisible(false);
    setExpenseToDelete(null);
  };

  const totalAllExpenses = Array.from(tagExpenseMap.values())
    .flatMap(({ expenses }) => expenses)
    .reduce((sum, expense) => {
      const amount = parseFloat(expense?.value) || 0;
      return sum + amount;
    }, 0);

  return (
    <PageContainer>
      <ExpensePieChart tagExpenseMap={tagExpenseMap} />

      <MonthTotal>Total Mensal: R$ {formatMoney(totalAllExpenses)}</MonthTotal>

      <SizedBox height={6} />

      {Array.from(tagExpenseMap.values())
        .sort((a, b) => a.tag.name.localeCompare(b.tag.name))
        .map(({ tag, expenses }) => {
          const totalTag = expenses.reduce((sum, expense) => {
            const amount = parseFloat(expense?.value) || 0;
            return sum + amount;
          }, 0);
          const percentage = ((totalTag / totalAllExpenses) * 100).toFixed(2);

          return (
            <ExpenseByTagContainer key={tag.id} borderColor={tag.color}>
              <TopContainer>
                <TagChip key={tag.id} tag={tag} />

                <PercentTag color={tag.color}>{percentage}%</PercentTag>
              </TopContainer>

              <View style={{ gap: 8 }}>
                {expenses.map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onDelete={showDeleteConfirmation}
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

      <ConfirmationDialog
        message="Deseja excluir esta despesa?"
        visible={dialogVisible}
        setVisible={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
        handleCancel={handleCancelDelete}
      />
    </PageContainer>
  );
};

export default MonthYearExpensesDetail;
