import { useEffect } from "react";
import Home from "./pages/home";
import DatabaseInit from "./db/databaseInit";

export default function Index() {
  useEffect(() => {
    DatabaseInit.initialize();
  }, []);

  return <Home />;
}
