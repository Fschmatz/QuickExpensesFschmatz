import React, { useMemo } from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { FONT_WEIGHT } from "@constants";

export interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, subtitle }) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();
  const styles = useMemo(() => createStyles(theme, height), [theme, height]);

  return (
    <View style={styles.container}>
      {icon && (
        <View style={styles.iconCircle}>
          <Ionicons
            name={icon}
            size={48}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
      )}

      {title && (
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
      )}

      {subtitle && (
        <Text variant="bodyMedium" style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const createStyles = (theme: MD3Theme, windowHeight: number) =>
  StyleSheet.create({
    container: {
      minHeight: windowHeight * 0.7,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
      gap: 16,
    },
    iconCircle: {
      width: 96,
      height: 96,
      borderRadius: 48,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surfaceVariant,
    },
    title: {
      fontWeight: FONT_WEIGHT.bold,
      textAlign: "center",
      color: theme.colors.onBackground,
    },
    subtitle: {
      textAlign: "center",
      lineHeight: 22,
      color: theme.colors.onSurfaceVariant,
    },
  });

export default EmptyState;
