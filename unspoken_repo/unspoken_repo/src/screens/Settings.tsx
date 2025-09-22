import { useState } from "react";
import { Text, ScrollView, Pressable } from "react-native";
import { H1, P, Card } from "../ui";
import { colors, spacing } from "../theme";
import { ensurePermission } from "../services/notifications";
import * as FileSystem from "expo-file-system";
import { DB } from "../services/db";
export default function Settings() {
  const [lastExport, setLastExport] = useState<string | null>(null);
  async function enableNotifs() { await ensurePermission(); }
  async function exportJson() { const items = await DB.allItems(); const rituals = await DB.allRituals(); const payload = { exportedAt: new Date().toISOString(), items, rituals }; const path = FileSystem.documentDirectory + `unspoken-export-${Date.now()}.json`; await FileSystem.writeAsStringAsync(path, JSON.stringify(payload, null, 2)); setLastExport(path); }
  return (
    <ScrollView style={{ padding: spacing(2) }}>
      <H1>Réglages</H1>
      <Card>
        <Text style={{ color: colors.text, fontWeight: "700", marginBottom: 6 }}>Notifications</Text>
        <Pressable onPress={enableNotifs} style={{ backgroundColor: colors.ok, padding: 10, borderRadius: 10, alignSelf: "flex-start" }}><Text style={{ color: "#0f0f10", fontWeight: "700" }}>Autoriser / Vérifier</Text></Pressable>
      </Card>
      <Card>
        <Text style={{ color: colors.text, fontWeight: "700", marginBottom: 6 }}>Export</Text>
        <Pressable onPress={exportJson} style={{ backgroundColor: colors.warn, padding: 10, borderRadius: 10, alignSelf: "flex-start" }}><Text style={{ color: "#0f0f10", fontWeight: "700" }}>Exporter JSON</Text></Pressable>
        {lastExport && <P style={{ marginTop: 8 }}>Fichier: {lastExport}</P>}
      </Card>
    </ScrollView>
  );
}
