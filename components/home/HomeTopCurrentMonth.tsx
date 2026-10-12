import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useRouter } from "expo-router";
import { formatMoney, getMonthName, useStyles } from "@utils";
import { useAppSelector } from "../../redux/hooks";
import { getTotalExpensesCurrentMonth } from "@expenseDuck";
import { CARD } from "@constants";

export interface HomeTopCurrentMonthProps {}

const HomeTopCurrentMonth: React.FC<HomeTopCurrentMonthProps> = () => {
  const router = useRouter();
  const styles = useStyles(createStyles);
  const totalExpensesCurrentMonth = useAppSelector(
    getTotalExpensesCurrentMonth,
  );

  const { dateParam, displayLabel } = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const yearMonth = `${year}-${month}`;

    return {
      dateParam: `${yearMonth}-01`,
      displayLabel: `${getMonthName(yearMonth)}/${year}`,
    };
  }, []);

  const navigateToCurrentMonthDetail = () => {
    router.push({
      pathname: "/pages/monthYearExpensesDetail" as any,
      params: { date: dateParam },
    });
  };

  return (
    <View style={styles.monthCard}>
      <TouchableRipple
        onPress={navigateToCurrentMonthDetail}
        style={styles.monthRipple}
      >
        <View style={styles.monthRow}>
          <Text variant="titleMedium" style={styles.monthText}>
            {displayLabel}
          </Text>
          <Text variant="titleMedium" style={styles.monthText}>
            R$ {formatMoney(totalExpensesCurrentMonth)}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    monthCard: {
      width: "100%",
      borderRadius: CARD.borderRadius,
      overflow: "hidden",
    },
    monthRipple: {
      backgroundColor: theme.colors.secondaryContainer,
    },
    monthRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      width: "100%",
    },
    monthText: {
      color: theme.colors.onBackground,
    },
  });

export default HomeTopCurrentMonth;
