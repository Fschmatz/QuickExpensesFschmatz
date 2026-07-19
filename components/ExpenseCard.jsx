import { View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";
import { formatDate, formatMoney } from "@utils";

const ExpenseCard = ({ expense, onPress, onLongPress }) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={() => onPress(expense)}
      onLongPress={() => onLongPress(expense)}
      android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
      style={({ pressed }) => [
        {
          padding: 8,
          paddingLeft: 4,
          borderRadius: 12,
        },
        pressed && { opacity: 0.6, backgroundColor: theme.colors.onSurface },
      ]}
      unstable_pressDelay={100}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text variant="bodySmall" style={{ color: theme.colors.onBackground }}>
          {formatDate(expense.createdDate, "dd/mm/yyyy")}{" "}
          {expense.name
            ? "- " +
              (expense.name.length > 15
                ? expense.name.substring(0, 18) + "..."
                : expense.name)
            : ""}
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onBackground }}>
          R$ {formatMoney(expense.value)}
        </Text>
      </View>
    </Pressable>
  );
};

export default ExpenseCard;
