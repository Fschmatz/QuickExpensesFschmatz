import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useStyles } from "@utils";
import { MONTH_PROGRESS_BAR, CARD } from "@constants";
import { useAppSelector } from "../../redux/hooks";
import { getExpenseDaysCurrentMonth } from "@expenseDuck";

export interface HomeMonthProgressBarProps {}

const HomeMonthProgressBar: React.FC<HomeMonthProgressBarProps> = () => {
  const styles = useStyles(createStyles);
  const expenseDays = useAppSelector(getExpenseDaysCurrentMonth);

  const { progress, lastDay } = useMemo(() => {
    const today = new Date();
    const todayDay = today.getDate();
    const lastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    ).getDate();
    return { progress: todayDay / lastDay, lastDay };
  }, []);

  return (
    <View style={styles.row}>
      <Text variant="titleSmall" style={styles.dayLabel}>
        01
      </Text>

      <View style={styles.track}>
        <View style={[styles.fill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />

        {expenseDays.map((day) => {
          const pos = (day / lastDay) * 100;
          return (
            <View
              key={day}
              style={[styles.expenseDayMarker, { left: `${pos}%` as any }]}
            />
          );
        })}
      </View>

      <Text variant="titleSmall" style={styles.dayLabel}>
        {lastDay}
      </Text>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingHorizontal: 16,
      paddingBottom: 12,
    },
    dayLabel: {
      color: theme.colors.onSecondaryContainer,
      opacity: 0.3,
      minWidth: 14,
      textAlign: "center",
    },
    track: {
      flex: 1,
      position: "relative",
      flexDirection: "row",
      height: MONTH_PROGRESS_BAR.height,
      borderRadius: CARD.borderRadius,
      overflow: "hidden",
      backgroundColor: theme.colors.background,
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
    fill: {
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: CARD.borderRadius,
      borderEndEndRadius: 4,
      borderEndStartRadius: 4,
    },
    expenseDayMarker: {
      position: "absolute",
      width: 2,
      height: MONTH_PROGRESS_BAR.height,
      backgroundColor: theme.colors.onPrimaryContainer,
      opacity: 0.3,
      top: 0,
      marginLeft: -1,
    },
  });

export default HomeMonthProgressBar;
