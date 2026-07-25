import { View } from "react-native";
import { useTheme, Text, TouchableRipple } from "react-native-paper";
import { formatDate, formatMoney } from "@utils";

const ExpenseCard = ({ expense, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableRipple
      onPress={() => onPress(expense)}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text variant="titleSmall" style={{ color: theme.colors.onBackground }}>
          {formatDate(expense.createdDate, "dd/mm/yyyy")}{" "}
          {expense.name
            ? "- " +
              (expense.name.length > 15
                ? expense.name.substring(0, 18) + "..."
                : expense.name)
            : ""}
        </Text>

        <Text variant="titleSmall" style={{ color: theme.colors.onBackground }}>
          R$ {formatMoney(expense.value)}
        </Text>
      </View>
    </TouchableRipple>
  );
};

export default ExpenseCard;
