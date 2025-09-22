import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Nav from "./src/navigation";
import { initDb } from "./src/services/db";
import { seed } from "./src/seed";
import { ensurePermission } from "./src/services/notifications";

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => { (async () => { await initDb(); await seed(); await ensurePermission(); setReady(true); })(); }, []);
  if (!ready) return null;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Nav />
    </SafeAreaView>
  );
}
