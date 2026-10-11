import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, SegmentedButtons } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAppParameter } from "@appParameterDuck";
import { selectAppParameterByKey } from "@appParameterSelector";
import { appParameters } from "@constants";
import { useStyles } from "@utils";

export interface SettingsThemeSegmentedProps {
  title: string;
  subtitle?: string | null;
}

const SettingsThemeSegmented: React.FC<SettingsThemeSegmentedProps> = ({
  title,
  subtitle,
}) => {
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const value = useAppSelector(
    selectAppParameterByKey(appParameters.themePreferenceParameter, "system" as any),
  );

  const onValueChange = (newValue: string) => {
    dispatch(setAppParameter({ key: appParameters.themePreferenceParameter, value: newValue }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
      <SegmentedButtons
        value={value}
        onValueChange={onValueChange}
        buttons={[
          {
            value: "light",
            label: "Claro",
            icon: "weather-sunny",
          },
          {
            value: "system",
            label: "Sistema",
            icon: "theme-light-dark",
          },
          {
            value: "dark",
            label: "Escuro",
            icon: "weather-night",
          },
        ]}
      />
    </View>
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    textContainer: {
      marginBottom: 12,
    },
    title: {
      color: theme.colors.onBackground,
      fontSize: 16,
    },
    subtitle: {
      color: theme.colors.outline,
      fontSize: 14,
    },
  });

export default SettingsThemeSegmented;
