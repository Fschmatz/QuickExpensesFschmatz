import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { createMaterial3Theme } from "@pchmn/expo-material3-theme";
import { selectAppParameterByKey } from "@appParameterSelector";
import { appParameters } from "@constants";

export const useMaterialYouColor = (sourceColor) => {
  const themePreference = useSelector(
    selectAppParameterByKey(appParameters.themePreferenceParameter, "system"),
  );

  const systemColorScheme = useColorScheme();

  if (!sourceColor)
    return { primaryContainer: undefined, onPrimaryContainer: undefined };

  let isDark = false;
  if (themePreference === "dark") {
    isDark = true;
  } else if (themePreference === "system") {
    isDark = systemColorScheme === "dark";
  }

  const customTheme = createMaterial3Theme(sourceColor);
  const colorSchemeKey = isDark ? "dark" : "light";

  return {
    primaryContainer: customTheme[colorSchemeKey].primaryContainer,
    onPrimaryContainer: customTheme[colorSchemeKey].onPrimaryContainer,
  };
};
