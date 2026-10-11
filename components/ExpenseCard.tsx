import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useStyles } from "@utils";

export interface ExpenseCardProps {
  title: string;
  subtitle?: string | null;
  value: string | number;
  onPress?: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  subtitle,
  value,
  onPress,
}) => {
  const styles = useStyles(createStyles);

  return (
    <TouchableRipple onPress={onPress} style={styles.ripple}>
      <View style={styles.container}>
        <View style={styles.leftCol}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <Text style={styles.value}>R$ {value}</Text>
      </View>
    </TouchableRipple>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    ripple: {
      width: "100%",
    },
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    leftCol: {
      flex: 1,
      marginRight: 8,
    },
    title: {
      color: theme.colors.onBackground,
      fontSize: 16,
      fontWeight: "500",
    },
    subtitle: {
      color: theme.colors.outline,
      fontSize: 14,
      marginTop: 2,
    },
    value: {
      color: theme.colors.onBackground,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default ExpenseCard;
