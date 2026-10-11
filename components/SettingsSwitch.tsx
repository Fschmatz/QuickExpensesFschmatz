import React from "react";
import { useTheme, List } from "react-native-paper";
import type { MD3Theme } from "react-native-paper";
import { Switch, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAppParameter } from "@appParameterDuck";
import { selectAppParameterByKeyAsBoolean } from "@appParameterSelector";
import { useStyles } from "@utils";

export interface SettingsSwitchProps {
  title: string;
  subtitle?: string | null;
  parameterKey: string;
  defaultValue?: boolean;
}

const SettingsSwitch: React.FC<SettingsSwitchProps> = ({
  title,
  subtitle,
  parameterKey,
  defaultValue = true,
}) => {
  const theme = useTheme();
  const styles = useStyles(createStyles);
  const dispatch = useAppDispatch();
  const value = useAppSelector(
    selectAppParameterByKeyAsBoolean(parameterKey, defaultValue),
  );

  const onToggle = (newValue: boolean) => {
    dispatch(setAppParameter({ key: parameterKey, value: newValue.toString() }));
  };

  return (
    <List.Item
      title={title}
      description={subtitle || null}
      titleStyle={styles.title}
      descriptionStyle={styles.description}
      onPress={() => onToggle(!value)}
      right={() => (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{
            false:
              (theme.colors as any).surfaceContainerLow ||
              theme.colors.surfaceVariant,
            true: theme.colors.primary,
          }}
          thumbColor={value ? theme.colors.onBackground : "#f4f3f4"}
        />
      )}
      style={styles.listItem}
    />
  );
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    listItem: {
      paddingHorizontal: 0,
    },
    title: {
      color: theme.colors.onBackground,
      fontSize: 16,
    },
    description: {
      color: theme.colors.outline,
      fontSize: 14,
    },
  });

export default SettingsSwitch;
