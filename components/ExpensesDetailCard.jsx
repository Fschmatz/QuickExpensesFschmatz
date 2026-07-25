import React, { Fragment } from "react";
import { View } from "react-native";
import { useTheme, Text, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import ExpenseCard from "./ExpenseCard";
import { formatMoney } from "@utils";

const ExpensesDetailCard = ({
  tag,
  expenses,
  totalTag,
  percentage,
  onPressExpense,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.elevation.level1,
        borderRadius: 20,
        paddingBottom: 12,
        marginVertical: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: 12,
          marginLeft: 12,
          marginVertical: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name={tag.icon} size={20} color={tag.color} />
          <Text
            variant="titleSmall"
            style={{
              color: theme.colors.onBackground,
              fontWeight: "bold",
            }}
          >
            {tag.name}
          </Text>
        </View>
        <Text
          variant="titleSmall"
          style={{
            color: tag.color,
            fontWeight: "bold",
          }}
        >
          {percentage}%
        </Text>
      </View>

      <Divider
        bold
        style={{
          backgroundColor: theme.colors.background,
        }}
      />

      <View
        style={{
          backgroundColor: theme.colors.elevation.level3,
        }}
      >
        {expenses.map((expense, index) => (
          <Fragment key={expense.id || index}>
            <ExpenseCard expense={expense} onPress={onPressExpense} />
            <Divider
              bold
              style={{
                backgroundColor: theme.colors.background,
              }}
            />
          </Fragment>
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 12,
          marginHorizontal: 12,
        }}
      >
        <Text
          variant="titleSmall"
          style={{
            color: theme.colors.onBackground,
            fontWeight: "bold",
          }}
        >
          Total:
        </Text>
        <Text
          variant="titleSmall"
          style={{
            color: theme.colors.onBackground,
            fontWeight: "bold",
          }}
        >
          R$ {formatMoney(totalTag)}
        </Text>
      </View>
    </View>
  );
};

export default ExpensesDetailCard;
