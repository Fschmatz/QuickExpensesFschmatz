import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchByMonthYear,
  getExpensesByMonthYear,
  deleteExpense,
} from "../redux/ducks/expenseDuck";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { PageContainer } from "../components/utils";
import ExpenseCard from "../components/ExpenseCard";
import { formatDate } from "../utils/functionUtils";
import ConfirmationDialog from "../components/ConfirmationDialog";
import TagChip from "../components/TagChip";
import AppColors from "../utils/constants/appColors";

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

    tagExpenseMap.set("untagged", {
      tag: {
        id: "99999",
        name: "zzzzz",
        color: AppColors.text,
        icon: "pricetag-outline",
      },
      expenses: untaggedExpenses,
    });

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
      //dispatch(fetchByMonthYear(date));
    }
    setDialogVisible(false);
    setExpenseToDelete(null);
  };

  const handleCancelDelete = () => {
    setDialogVisible(false);
    setExpenseToDelete(null);
  };

  return (
    <PageContainer>
      <View style={{ paddingBottom: 75 }}>
        {Array.from(tagExpenseMap.values())
          .sort((a, b) => a.tag.name.localeCompare(b.tag.name))
          .map(({ tag, expenses }) => (
            <View key={tag.id} style={{ paddingBottom: 8 }}>
              {/* Tag */}
              <View style={{ paddingBottom: 8 }}>
                <TagChip key={tag.id} tag={tag} />
              </View>

              {/* Expenses List */}
              <View style={{ gap: 8 }}>
                {expenses.map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onDelete={showDeleteConfirmation}
                  />
                ))}
              </View>
            </View>
          ))}
      </View>

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
