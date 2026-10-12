import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Text, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { formatDate, formatMoney, useStyles } from "@utils";
import { FONT_WEIGHT } from "@constants";
import { ExpenseItem } from "../entities/expense";

export interface ExpenseCardProps {
  expense: ExpenseItem;
  onPress: (expense: ExpenseItem) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onPress }) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const formattedDate = formatDate(expense.createdDate, "dd/mm");
  const expenseName = expense.name ? ` - ${expense.name}` : "";

  return (
    <TouchableRipple
      onPress={() => onPress(expense)}
      style={styles.ripple}
      rippleColor={theme.colors.onSurface + "1F"}
      borderless
    >
      <View style={styles.container}>
        <Text variant="titleSmall" style={styles.titleText} numberOfLines={1}>
          {formattedDate}
          {expenseName}
        </Text>

        <View style={styles.valueRow}>
          <Text variant="titleSmall" style={styles.valueText}>
            R$ {formatMoney(expense.value)}
          </Text>
          {/*  
         <Ionicons
            name="chevron-forward"
            size={16}
            color={theme.colors.outline}
          /> 
          */}
        </View>
      </View>
    </TouchableRipple>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    ripple: {
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    titleText: {
      color: theme.colors.onSurfaceVariant,
      flex: 1,
      marginRight: 12,
    },
    valueRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    valueText: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.default,
    },
  });

export default ExpenseCard;
