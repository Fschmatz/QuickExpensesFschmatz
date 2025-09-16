import { useState, useEffect } from "react";
import Home from "./pages/home";
import DatabaseInit from "../db/databaseInit";
import { PageContainer } from "@components";

export default function Index() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    async function initDB() {
      console.log("Initializing database...");
      await DatabaseInit.initialize();
      setIsDbReady(true);
      console.log("Database OK!");
    }

    initDB();
  }, []);

  if (!isDbReady) {
    return <PageContainer />;
  }

  return <Home />;
}
