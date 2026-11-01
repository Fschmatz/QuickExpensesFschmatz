import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useRouter } from "expo-router";
import { formatMoney, getMonthName, useStyles } from "@utils";
import { useAppSelector } from "../../../redux/hooks";
import {
  getTotalExpensesCurrentMonth,
  getCountExpensesCurrentMonth,
} from "@expenseDuck";
import { CARD, appParameters } from "@constants";
import { selectAppParameterByKeyAsBoolean } from "@appParameterSelector";
import MonthProgressBar from "./MonthProgressBar";
import SizedBox from "../../SizedBox";

export interface CurrentMonthProps {}

const CurrentMonth: React.FC<CurrentMonthProps> = () => {
  const router = useRouter();
  const styles = useStyles(createStyles);
  const totalExpensesCurrentMonth = useAppSelector(
    getTotalExpensesCurrentMonth,
  );
  const countExpensesCurrentMonth = useAppSelector(
    getCountExpensesCurrentMonth,
  );
  const isExpanded = useAppSelector(
    selectAppParameterByKeyAsBoolean(
      appParameters.expandCurrentMonthSummaryParameter,
    ),
  );

  const { dateParam, displayLabel, remainingDays } = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const yearMonth = `${year}-${month}`;
    const lastDayOfMonth = new Date(year, today.getMonth() + 1, 0).getDate();
    const remaining = lastDayOfMonth - today.getDate();

    return {
      dateParam: `${yearMonth}-01`,
      displayLabel: `${getMonthName(yearMonth)}/${year}`,
      remainingDays: remaining,
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
        style={styles.ripple}
      >
        <View>
          <View style={styles.monthRow}>
            <Text variant="titleMedium" style={styles.monthText}>
              {displayLabel}
            </Text>
            <Text variant="titleMedium" style={styles.monthText}>
              R$ {formatMoney(totalExpensesCurrentMonth)}
            </Text>
          </View>

          {!isExpanded && <SizedBox height={12} />}

          {isExpanded && (
            <>
              <View style={styles.infoRow}>
                <Text variant="titleSmall" style={styles.infoText}>
                  {countExpensesCurrentMonth} despesa
                  {countExpensesCurrentMonth !== 1 ? "s" : ""}
                </Text>
                <Text variant="titleSmall" style={styles.infoText}>
                  {remainingDays} dia{remainingDays !== 1 ? "s" : ""} restante
                  {remainingDays !== 1 ? "s" : ""}
                </Text>
              </View>

              <SizedBox height={8} />

              <MonthProgressBar />
            </>
          )}
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
      backgroundColor: theme.colors.elevation.level3,
    },
    ripple: {
      width: "100%",
    },
    monthRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: 12,
      width: "100%",
    },
    monthText: {
      color: theme.colors.onBackground,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: 4,
      width: "100%",
    },
    infoText: {
      color: theme.colors.onBackground,
      opacity: 0.3,
      minWidth: 14,
    },
  });

export default CurrentMonth;
