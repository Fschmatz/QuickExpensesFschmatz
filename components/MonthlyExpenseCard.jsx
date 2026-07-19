import { Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Surface, Text } from "react-native-paper";
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
        borderRadius: 12,
        marginHorizontal: 16,
        backgroundColor: theme.colors.elevation.level3,
      }}
      elevation={0}
    >
      <Pressable
        onPress={() => navigateToMonthlyExpenseDetail(monthlyExpense.date)}
        android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
        style={({ pressed }) => [
          {
            padding: 16,
            borderRadius: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          pressed && {
            opacity: 0.6,
            backgroundColor: theme.colors.onSurface,
            borderRadius: 12,
          },
        ]}
        unstable_pressDelay={100}
      >
        <Text
          variant="titleMedium"
          style={{ color: theme.colors.onBackground }}
        >
          {getMonthName(monthlyExpense.date)}
        </Text>
        <Text
          variant="titleLarge"
          style={{ color: theme.colors.onBackground, fontWeight: "bold" }}
        >
          R$ {formatMoney(monthlyExpense.value)}
        </Text>
      </Pressable>
    </View>
  );
};

export default MonthlyExpenseCard;
