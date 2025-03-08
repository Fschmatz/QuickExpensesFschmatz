import { useState, useEffect } from "react";
import Home from "./pages/home";
import DatabaseInit from "./db/databaseInit";
import { View, Text } from "react-native";

export default function Index() {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    async function initDB() {
      console.log("Initializing database...");
      await DatabaseInit.initialize();
      setIsDbReady(true);
    }

    initDB();
  }, []);

  if (!isDbReady) {
    return (
      <View>
        <Text>Iniciando...</Text>
      </View>
    ); 
  }

  return <Home />;
}
