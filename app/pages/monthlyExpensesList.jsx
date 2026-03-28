import { FlatList, View, ActivityIndicator, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MonthlyExpenseCard, PageContainer } from "@components";
import {
  fetchMonthlyExpenses,
  getMonthlyExpenses,
  getExpensesLoading,
} from "@expenseDuck";
import { appColors } from "@constants";

const MonthlyExpensesList = () => {
  const dispatch = useDispatch();
  const monthlyExpenses = useSelector(getMonthlyExpenses);
  const loading = useSelector(getExpensesLoading);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
  }, [loading]);

  return (
    <PageContainer isScrollView={false} containerPadding="0">
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
          <FlatList
            contentContainerStyle={{ gap: 8, paddingBottom: 75 }}
            data={monthlyExpenses}
            keyExtractor={(item) => item.date.toString()}
            renderItem={({ item }) => (
              <MonthlyExpenseCard monthlyExpense={item} />
            )}
          />
        </Animated.View>
      )}
    </PageContainer>
  );
};

export default MonthlyExpensesList;
