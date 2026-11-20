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
  extremeType?: "highest" | "lowest" | null;
  chipBackgroundColor?: string;
  chipTextColor?: string;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
  onPress,
  extremeType = null,
  chipBackgroundColor,
  chipTextColor,
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const formattedDate = formatDate(expense.createdDate, "dd/mm");
  const expenseName = expense.name ? ` - ${expense.name}` : "";

  const iconName =
    extremeType === "highest"
      ? "arrow-up"
      : extremeType === "lowest"
        ? "arrow-down"
        : null;

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
          {iconName && (
            <View
              style={[
                styles.extremeChip,
                extremeType === "highest"
                  ? [
                      styles.highestChip,
                      chipBackgroundColor
                        ? { backgroundColor: chipBackgroundColor }
                        : undefined,
                    ]
                  : [
                      styles.lowestChip,
                      chipTextColor
                        ? { borderColor: chipTextColor }
                        : undefined,
                    ],
              ]}
            >
              <Ionicons
                name={iconName}
                size={13}
                color={chipTextColor || theme.colors.primary}
              />
            </View>
          )}
          <Text variant="titleSmall" style={styles.valueText}>
            R$ {formatMoney(expense.value)}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    ripple: {
      paddingVertical: 12,
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
      fontWeight: FONT_WEIGHT.bold,
    },
    valueRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    extremeChip: {
      alignItems: "center",
      justifyContent: "center",
    },
    highestChip: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.elevation.level5,
    },
    lowestChip: {
      width: 21,
      height: 21,
      borderRadius: 10,
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: theme.colors.outline,
    },
    valueText: {
      color: theme.colors.onBackground,
      fontWeight: FONT_WEIGHT.bold,
    },
  });

export default ExpenseCard;
