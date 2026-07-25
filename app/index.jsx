import { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import Home from "./pages/home";
import DatabaseInit from "../db/databaseInit";

import { fetchAppParameters } from "@appParameterDuck";

import { useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();
  const [isDbReady, setIsDbReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function initApp() {
      console.log("Initializing database...");

      await DatabaseInit.initialize();

      console.log("Database OK!");

      setIsDbReady(true);

      dispatch(fetchAppParameters());
    }

    initApp();
  }, [dispatch]);

  if (!isDbReady) {
    return <View style={{ flex: 1, backgroundColor: theme.colors.background }} />;
  }

  return <Home />;
}
