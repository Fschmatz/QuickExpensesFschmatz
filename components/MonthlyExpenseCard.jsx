import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Surface, Text, TouchableRipple } from "react-native-paper";
import { useRouter } from "expo-router";
import { getMonthName, formatMoney } from "@utils";

const MonthlyExpenseCard = ({ monthlyExpense }) => {
  const theme = useTheme();
  const router = useRouter();

  const navigateToMonthlyExpenseDetail = (date) => {
    router.push({
      pathname: "/pages/monthYearExpensesDetail",
      params: { date },
    });
  };

  return (
    <View
      style={{
        marginHorizontal: 16,
        backgroundColor: theme.colors.elevation.level3,
        borderRadius: 20,
        overflow: "hidden",
      }}
      elevation={0}
    >
      <TouchableRipple
        onPress={() => navigateToMonthlyExpenseDetail(monthlyExpense.date)}
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onBackground }}
          >
            {getMonthName(monthlyExpense.date)}
          </Text>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
          >
            R$ {formatMoney(monthlyExpense.value)}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default MonthlyExpenseCard;
