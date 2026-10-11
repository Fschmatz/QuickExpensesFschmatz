import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { formatMoney, useStyles } from "@utils";

export interface YearlyTotalCardProps {
  selectedYear?: string | number;
  yearlyTotal: number;
}

const YearlyTotalCard: React.FC<YearlyTotalCardProps> = ({ yearlyTotal }) => {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>R$ {formatMoney(yearlyTotal)}</Text>
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 20,
      marginHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    totalText: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.onTertiaryContainer,
    },
  });

export default YearlyTotalCard;
