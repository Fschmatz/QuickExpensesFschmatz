import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useRouter } from "expo-router";
import { getMonthName, formatMoney, useStyles } from "@utils";
import { MonthlyExpenseItem } from "../entities/monthlyExpense";

export interface MonthlyExpenseCardProps {
  monthlyExpense: MonthlyExpenseItem;
}

const MonthlyExpenseCard: React.FC<MonthlyExpenseCardProps> = ({
  monthlyExpense,
}) => {
  const router = useRouter();
  const styles = useStyles(createStyles);

  const navigateToMonthlyExpenseDetail = (date: string) => {
    router.push({
      pathname: "/pages/monthYearExpensesDetail" as any,
      params: { date },
    });
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableRipple
        onPress={() => navigateToMonthlyExpenseDetail(monthlyExpense.date)}
        style={styles.touchable}
      >
        <View style={styles.content}>
          <Text variant="titleMedium" style={styles.monthText}>
            {getMonthName(monthlyExpense.date)}
          </Text>
          <Text variant="titleMedium" style={styles.valueText}>
            R$ {formatMoney(monthlyExpense.value)}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    cardContainer: {
      marginHorizontal: 16,
      backgroundColor: theme.colors.elevation.level3,
      borderRadius: 20,
      overflow: "hidden",
    },
    touchable: {
      width: "100%",
    },
    content: {
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    monthText: {
      color: theme.colors.onBackground,
    },
    valueText: {
      color: theme.colors.onBackground,
      fontWeight: "bold",
    },
  });

export default MonthlyExpenseCard;
