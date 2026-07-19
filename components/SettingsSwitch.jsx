import React from "react";
import { useTheme } from "react-native-paper";
import { Switch } from "react-native";
import { List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setAppParameter } from "@appParameterDuck";
import { selectAppParameterByKeyAsBoolean } from "@appParameterSelector";

const SettingsSwitch = ({
  title,
  subtitle,
  parameterKey,
  defaultValue = true,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const value = useSelector(
    selectAppParameterByKeyAsBoolean(parameterKey, defaultValue),
  );

  const onToggle = (newValue) => {
    dispatch(setAppParameter(parameterKey, newValue.toString()));
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
            false: theme.colors.surfaceContainerLow,
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
