import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { HomeHeaderButtons } from "@components";
import { appColors } from "@constants";
import { appDetails } from "@utils";

export default function RootLayout() {
  NavigationBar.setBackgroundColorAsync(appColors.background);
  SystemUI.setBackgroundColorAsync(appColors.background);

  SplashScreen.setOptions({
    duration: 400,
  });

  const defaultHeaderScreenOptions = {
    headerTintColor: appColors.text,
    headerStyle: { backgroundColor: appColors.background },
    headerShadowVisible: false,
  };

  return (
    <Provider store={store}>
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
      </Stack>
    </Provider>
  );
}
