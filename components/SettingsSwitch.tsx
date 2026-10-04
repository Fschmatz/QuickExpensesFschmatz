import React from "react";
import { useTheme, List } from "react-native-paper";
import { Switch } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAppParameter } from "@appParameterDuck";
import { selectAppParameterByKeyAsBoolean } from "@appParameterSelector";

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
  const dispatch = useAppDispatch();
  const value = useAppSelector(
    selectAppParameterByKeyAsBoolean(parameterKey, defaultValue),
  );

  const onToggle = (newValue: boolean) => {
    dispatch(setAppParameter(parameterKey, newValue.toString()) as any);
  };

  return (
    <List.Item
      title={title}
      description={subtitle || null}
      titleStyle={{ color: theme.colors.onBackground, fontSize: 16 }}
      descriptionStyle={{ color: theme.colors.outline, fontSize: 14 }}
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
      style={{ paddingHorizontal: 0 }}
    />
  );
};

export default SettingsSwitch;
