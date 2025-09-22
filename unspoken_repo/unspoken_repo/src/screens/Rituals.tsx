import { useEffect, useState } from "react";
import { Text, ScrollView, Pressable } from "react-native";
import { DB } from "../services/db";
import type { Ritual } from "../types";
import { Card, H1, P } from "../ui";
import { colors, spacing } from "../theme";
import { schedule } from "../services/notifications";
export default function Rituals() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  async function load() { setRituals(await DB.allRituals()); }
  useEffect(() => { load(); }, []);
  async function scheduleNow(r: Ritual) { const when = new Date(Date.now() + 60 * 1000); await schedule("Rituel", `${r.title} — ${r.prompt}`, when); }
  return (
    <ScrollView style={{ padding: spacing(2) }}>
      <H1>Rituels</H1>
      {rituals.map(r => (
        <Card key={r.id}>
          <Text style={{ color: colors.text, fontWeight: "600", marginBottom: 6 }}>{r.title}</Text>
          <P>{r.cadence} · {r.prompt}</P>
          <Pressable onPress={() => scheduleNow(r)} style={{ marginTop: 10, backgroundColor: colors.ok, padding: 10, borderRadius: 10, alignSelf: "flex-start" }}>
            <Text style={{ color: "#0f0f10", fontWeight: "700" }}>Programmer (1 min)</Text>
          </Pressable>
        </Card>
      ))}
    </ScrollView>
  );
}
