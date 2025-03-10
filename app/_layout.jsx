import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { StatusBar } from "expo-status-bar";
import HomeHeaderButtons from "./components/HomeHeaderButtons";
import AppColors from "./utils/constants/appColors";
import * as SplashScreen from "expo-splash-screen";
import AppDetails from "./utils/appDetails";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function RootLayout() {
  NavigationBar.setBackgroundColorAsync(AppColors.background);
  SystemUI.setBackgroundColorAsync(AppColors.background);

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
            title: AppDetails.appNameHomePage,
            headerTintColor: AppColors.text,
            headerStyle: { backgroundColor: AppColors.background },
            headerRight: () => <HomeHeaderButtons />,
          }}
        />
        <Stack.Screen
          name="pages/monthlyExpensesList"
          options={{
            title: "Despesas Mensais",
            headerTintColor: AppColors.text,
            headerStyle: { backgroundColor: AppColors.background },
          }}
        />

        <Stack.Screen
          name="pages/tagsList"
          options={{
            title: "Minhas Tags",
            headerTintColor: AppColors.text,
            headerStyle: { backgroundColor: AppColors.background },
          }}
        />

        <Stack.Screen
          name="pages/settings"
          options={{
            title: "Configurações",
            headerTintColor: AppColors.text,
            headerStyle: { backgroundColor: AppColors.background },
          }}
        />

        <Stack.Screen
          name="pages/debug"
          options={{
            title: "Debug",
            headerTintColor: AppColors.text,
            headerStyle: { backgroundColor: AppColors.background },
          }}
        />

        <Stack.Screen
          name="pages/monthYearExpensesDetail"
          options={{
            title: "Detalhes",
            headerTintColor: AppColors.text,
            headerStyle: { backgroundColor: AppColors.background },
          }}
        />

        <Stack.Screen
          name="pages/storeTag"
          options={{
            title: "Tag",
            headerTintColor: AppColors.text,
            headerStyle: { backgroundColor: AppColors.background },
          }}
        />

        <Stack.Screen
          name="pages/changelog"
          options={{
            title: "Changelog",
            headerTintColor: AppColors.text,
            headerStyle: { backgroundColor: AppColors.background },
          }}
        />
      </Stack>
    </Provider>
  );
}
