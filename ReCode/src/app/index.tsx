import WelcomeScreen from "../screens/WelcomeScreen";
import { useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function Index() {
  const db = useSQLiteContext();

  useEffect(() => {
    async function probar() {
      const tablas = await db.getAllAsync(
        "SELECT name FROM sqlite_master WHERE type='table';",
      );
      console.log(tablas);
    }
    probar();
  }, []);

  return <WelcomeScreen />;
}
