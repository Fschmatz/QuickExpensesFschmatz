import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";

export function useStyles<T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  createStyles: (theme: MD3Theme) => T
): T {
  const theme = useTheme();
  return useMemo(() => createStyles(theme), [theme, createStyles]);
}

export default useStyles;
