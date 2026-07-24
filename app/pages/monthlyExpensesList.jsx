import {
  FlatList,
  View,
  ActivityIndicator,
  Animated,
  ScrollView,
} from "react-native";
import { useEffect, useRef, useState, useMemo } from "react";
import { useTheme, Text, TouchableRipple } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { MonthlyExpenseCard, DefaultPageContainer } from "@components";
import {
  fetchMonthlyExpenses,
  getMonthlyExpenses,
  getExpensesLoading,
} from "@expenseDuck";
import { formatMoney } from "@utils";
import { selectAppParameterByKeyAsBoolean } from "@appParameterSelector";
import { appParameters } from "@constants";

const MonthlyExpensesList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const monthlyExpenses = useSelector(getMonthlyExpenses);
  const loading = useSelector(getExpensesLoading);
  const showTotalYear = useSelector(
    selectAppParameterByKeyAsBoolean(appParameters.showTotalYearParameter, false),
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
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
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
          {showTotalYear && (
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.colors.tertiaryContainer,
                padding: 16,
                borderRadius: 20,
                margin: 16,
                marginBottom: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: theme.colors.onTertiaryContainer,
                  fontWeight: "600",
                  marginBottom: 6,
                  letterSpacing: 0.5,
                }}
              >
                Total de {selectedYear}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: theme.colors.onTertiaryContainer,
                }}
              >
                R$ {formatMoney(yearlyTotal)}
              </Text>
            </View>
          )}

          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingBottom: 50 }}
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
                  <View
                    key={year}
                    style={{
                      borderRadius: 50,
                      overflow: "hidden",
                      backgroundColor:
                        year === selectedYear
                          ? theme.colors.primary
                          : theme.colors.elevation.level3,
                    }}
                  >
                    <TouchableRipple
                      onPress={() => setSelectedYear(year)}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                      }}
                    >
                      <Text
                        style={{
                          color:
                            year === selectedYear
                              ? theme.colors.onPrimary
                              : theme.colors.onBackground,
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {year}
                      </Text>
                    </TouchableRipple>
                  </View>
                ))}
              </ScrollView>
            }
          />
        </Animated.View>
      )}
    </View>
  );
};

export default MonthlyExpensesList;
