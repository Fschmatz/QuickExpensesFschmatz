import React from "react";
import { View } from "react-native";
import { useTheme, Text, SegmentedButtons } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setAppParameter } from "@appParameterDuck";
import { selectAppParameterByKey } from "@appParameterSelector";
import { appParameters } from "@constants";

const SettingsThemeSegmented = ({
  title,
  subtitle,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const value = useSelector(
    selectAppParameterByKey(appParameters.themePreferenceParameter, "system"),
  );

  const onValueChange = (newValue) => {
    dispatch(setAppParameter(appParameters.themePreferenceParameter, newValue));
  };

  return (
    <View style={{ paddingVertical: 12, paddingHorizontal: 16 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: theme.colors.onBackground, fontSize: 16 }}>
          {title}
        </Text>
        {subtitle && (
          <Text style={{ color: theme.colors.outline, fontSize: 14 }}>
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

export default SettingsThemeSegmented;
