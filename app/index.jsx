import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/home";
import DatabaseInit from "../db/databaseInit";
import { PageContainer } from "@components";
import { fetchAppParameters } from "@appParameterDuck";

export default function Index() {
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
    return <PageContainer />;
  }

  return <Home />;
}
