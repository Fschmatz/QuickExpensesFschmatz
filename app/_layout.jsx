import { useEffect } from "react";
import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { HomeHeaderButtons } from "@components";
import { appDetails } from "@utils";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";

export default function RootLayout() {
  const { theme } = useMaterial3Theme({ fallbackSourceColor: "#3E5682" });

  const paperTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...theme.dark,
     /*  elevation: {
        ...MD3DarkTheme.colors.elevation,
        level0: "transparent",
        level1: theme.dark.surfaceContainerLow,
        level2: theme.dark.surfaceContainer,
        level3: theme.dark.surfaceContainerHigh,
      }, */
    },
  };

  useEffect(() => {
    if (NavigationBar?.setBackgroundColorAsync) {
      NavigationBar.setBackgroundColorAsync(theme.dark.background).catch(
        () => {},
      );
    }
    if (SystemUI?.setBackgroundColorAsync) {
      SystemUI.setBackgroundColorAsync(theme.dark.background).catch(() => {});
    }
  }, [theme.dark.background]);

  SplashScreen.setOptions({
    duration: 400,
  });

  const defaultHeaderScreenOptions = {
    headerTintColor: theme.dark.onBackground,
    headerStyle: { backgroundColor: theme.dark.background },
    headerShadowVisible: false,
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={paperTheme}>
        <StatusBar style={"light"} />
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
              title: "Minhas Tags",
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
            name="pages/debug"
            options={{
              title: "Debug",
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
    </Provider>
  );
}
