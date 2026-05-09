import {
  FlatList,
  View,
  ActivityIndicator,
  Animated,
  ScrollView,
} from "react-native";
import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MonthlyExpenseCard, PageContainer } from "@components";
import {
  fetchMonthlyExpenses,
  getMonthlyExpenses,
  getExpensesLoading,
} from "@expenseDuck";
import { appColors } from "@constants";
import styled from "styled-components/native";
import { formatMoney } from "@utils";
import { selectAppParameterByKeyAsBoolean } from "@appParameterSelector";

const YearChip = styled.Pressable`
  padding: 8px 16px;
  border-radius: 50px;
  overflow: hidden;
  background-color: ${(props) =>
    props.selected
      ? appColors.btnConfirmBackground
      : appColors.primaryContainer};
`;

const YearText = styled.Text`
  color: ${(props) =>
    props.selected ? appColors.btnConfirmText : appColors.text};
  font-weight: bold;
  font-size: 16px;
`;

const TotalCardContainer = styled.View`
  border-width: 1px;
  border-color: ${appColors.btnDeleteBackground};
  padding: 16px 16px;
  border-radius: 16px;
  margin: 0px 16px 8px 16px;
  align-items: center;
  justify-content: center;
`;

const TotalLabel = styled.Text`
  font-size: 12px;
  color: ${appColors.btnDeleteText};
  font-weight: 600;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`;

const TotalValue = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${appColors.btnDeleteText};
`;

const MonthlyExpensesList = () => {
  const dispatch = useDispatch();
  const monthlyExpenses = useSelector(getMonthlyExpenses);
  const loading = useSelector(getExpensesLoading);
  const showTotalYear = useSelector(
    selectAppParameterByKeyAsBoolean("showTotalYear", false),
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);

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

  const availableYears = useMemo(() => {
    if (!monthlyExpenses) return [];
    const years = monthlyExpenses.map((expense) =>
      expense.date.substring(0, 4),
    );
    return [...new Set(years)].sort((a, b) => b - a);
  }, [monthlyExpenses]);

  const filteredExpenses = useMemo(() => {
    if (!monthlyExpenses) return [];
    return monthlyExpenses.filter(
      (expense) => expense.date.substring(0, 4) === selectedYear,
    );
  }, [monthlyExpenses, selectedYear]);

  const yearlyTotal = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.value, 0);
  }, [filteredExpenses]);

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
          {showTotalYear && (
            <TotalCardContainer>
              <TotalLabel>Total de {selectedYear}</TotalLabel>
              <TotalValue>R$ {formatMoney(yearlyTotal)}</TotalValue>
            </TotalCardContainer>
          )}

          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 75 }}
            data={filteredExpenses}
            keyExtractor={(item) => item.date.toString()}
            renderItem={({ item }) => (
              <MonthlyExpenseCard monthlyExpense={item} />
            )}
            ListHeaderComponent={
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                }}
              >
                {availableYears.map((year) => (
                  <YearChip
                    key={year}
                    selected={year === selectedYear}
                    onPress={() => setSelectedYear(year)}
                    android_ripple={{
                      ...appColors.androidRippleEffect,
                      borderless: false,
                      foreground: true,
                    }}
                    style={({ pressed }) => [
                      pressed && appColors.androidRippleColor,
                    ]}
                  >
                    <YearText selected={year === selectedYear}>{year}</YearText>
                  </YearChip>
                ))}
              </ScrollView>
            }
          />
        </Animated.View>
      )}
    </PageContainer>
  );
};

export default MonthlyExpensesList;
