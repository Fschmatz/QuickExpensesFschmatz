import { useEffect } from "react";
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import { HomeHeaderButtons } from "@components";
import { appDetails } from "@utils";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { selectAppParameterByKey } from "@appParameterSelector";
import { appParameters } from "@constants";
import { useColorScheme } from "react-native";

function AppContent() {
  const { theme } = useMaterial3Theme({ fallbackSourceColor: "#3E5682" });
  const themePreference = useSelector(
    selectAppParameterByKey(appParameters.themePreferenceParameter, "system"),
  );
  const systemColorScheme = useColorScheme();

  const useDarkTheme =
    themePreference === "dark" ||
    (themePreference === "system" && systemColorScheme === "dark");

  const currentTheme = useDarkTheme ? theme.dark : theme.light;
  const currentMD3Theme = useDarkTheme ? MD3DarkTheme : MD3LightTheme;

  const paperTheme = {
    ...currentMD3Theme,
    colors: {
      ...currentMD3Theme.colors,
      ...currentTheme,
    },
  };

  useEffect(() => {
    if (NavigationBar?.setBackgroundColorAsync) {
      NavigationBar.setBackgroundColorAsync(currentTheme.background).catch(
        () => {},
      );
    }
    if (SystemUI?.setBackgroundColorAsync) {
      SystemUI.setBackgroundColorAsync(currentTheme.background).catch(() => {});
    }
  }, [currentTheme.background]);

  SplashScreen.setOptions({
    duration: 400,
  });

  const defaultHeaderScreenOptions = {
    headerTintColor: currentTheme.onBackground,
    headerStyle: { backgroundColor: currentTheme.background },
    headerShadowVisible: false,
  };

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={useDarkTheme ? "light" : "dark"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: appDetails.appNameHomePage,
            headerRight: () => <HomeHeaderButtons />,
            ...defaultHeaderScreenOptions,
          }}
        />

        <Stack.Screen
          name="pages/monthlyExpensesList"
          options={{
            title: "Despesas Mensais",
            ...defaultHeaderScreenOptions,
          }}
        />

        <Stack.Screen
          name="pages/tagsList"
          options={{
            title: "Tags",
            ...defaultHeaderScreenOptions,
          }}
        />

        <Stack.Screen
          name="pages/settings"
          options={{
            title: "Configurações",
            ...defaultHeaderScreenOptions,
          }}
        />

        <Stack.Screen
          name="pages/monthYearExpensesDetail"
          options={{
            title: "Detalhes",
            ...defaultHeaderScreenOptions,
          }}
        />

        <Stack.Screen
          name="pages/storeTag"
          options={{
            title: "Tag",
            ...defaultHeaderScreenOptions,
          }}
        />

        <Stack.Screen
          name="pages/changelog"
          options={{
            title: "Changelog",
            ...defaultHeaderScreenOptions,
          }}
        />

        <Stack.Screen
          name="pages/storeLoan"
          options={{
            title: "Empréstimo",
            ...defaultHeaderScreenOptions,
          }}
        />

        <Stack.Screen
          name="pages/loansList"
          options={{
            title: "Empréstimos",
            ...defaultHeaderScreenOptions,
          }}
        />

        <Stack.Screen
          name="pages/storeExpense"
          options={{
            title: "Despesa",
            ...defaultHeaderScreenOptions,
          }}
        />
      </Stack>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
