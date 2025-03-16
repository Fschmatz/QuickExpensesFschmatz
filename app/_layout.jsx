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

  return (
    <Provider store={store}>
      <StatusBar style={"light"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: appDetails.appNameHomePage,
            headerTintColor: appColors.text,
            headerStyle: { backgroundColor: appColors.background },
            headerRight: () => <HomeHeaderButtons />,
          }}
        />

        <Stack.Screen
          name="pages/monthlyExpensesList"
          options={{
            title: "Despesas Mensais",
            headerTintColor: appColors.text,
            headerStyle: { backgroundColor: appColors.background },
          }}
        />

        <Stack.Screen
          name="pages/tagsList"
          options={{
            title: "Minhas Tags",
            headerTintColor: appColors.text,
            headerStyle: { backgroundColor: appColors.background },
          }}
        />

        <Stack.Screen
          name="pages/settings"
          options={{
            title: "Configurações",
            headerTintColor: appColors.text,
            headerStyle: { backgroundColor: appColors.background },
          }}
        />

        <Stack.Screen
          name="pages/debug"
          options={{
            title: "Debug",
            headerTintColor: appColors.text,
            headerStyle: { backgroundColor: appColors.background },
          }}
        />

        <Stack.Screen
          name="pages/monthYearExpensesDetail"
          options={{
            title: "Detalhes",
            headerTintColor: appColors.text,
            headerStyle: { backgroundColor: appColors.background },
          }}
        />

        <Stack.Screen
          name="pages/storeTag"
          options={{
            title: "Tag",
            headerTintColor: appColors.text,
            headerStyle: { backgroundColor: appColors.background },
          }}
        />

        <Stack.Screen
          name="pages/changelog"
          options={{
            title: "Changelog",
            headerTintColor: appColors.text,
            headerStyle: { backgroundColor: appColors.background },
          }}
        />
      </Stack>
    </Provider>
  );
}
