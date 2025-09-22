import { Text, ScrollView, View } from "react-native";
import { Card, H1, P, Tag } from "../ui";
import { colors, spacing } from "../theme";
import { useEffect, useState } from "react";
import { DB } from "../services/db";
import type { TrackItem } from "../types";
export default function Dashboard({ navigation }: any) {
  const [items, setItems] = useState<TrackItem[]>([]);
  useEffect(() => { (async () => setItems(await DB.allItems()))(); }, []);
  const next = items.filter(i => i.dueAt).sort((a,b)=>(a.dueAt! - b.dueAt!)).slice(0,3);
  return (
    <ScrollView style={{ padding: spacing(2) }}>
      <H1>Unspoken — Tableau de bord</H1>
      <Card onPress={() => navigation.navigate("Coach")}> <Text style={{ color: colors.text, fontWeight: "700", fontSize: 16, marginBottom: 6 }}>👤 Coach</Text><P>Pose une question. Le Coach retourne 1–3 prochaines actions.</P></Card>
      <Card onPress={() => navigation.navigate("Actions")}> <Text style={{ color: colors.text, fontWeight: "700", fontSize: 16, marginBottom: 6 }}>✅ Actions à venir</Text>{next.map(i => (<View key={i.id} style={{ marginBottom: 8 }}><Text style={{ color: colors.text }}>{i.title}</Text><P>{i.area} {i.dueAt ? `· due ${new Date(i.dueAt).toLocaleString()}` : ""}</P></View>))}</Card>
      <Card onPress={() => navigation.navigate("Rituals")}> <Text style={{ color: colors.text, fontWeight: "700", fontSize: 16, marginBottom: 6 }}>🕯️ Rituels</Text><Tag label="local-first" /></Card>
      <Card onPress={() => navigation.navigate("Settings")}> <Text style={{ color: colors.text, fontWeight: "700", fontSize: 16, marginBottom: 6 }}>⚙️ Réglages</Text><P>Notifications, export, thème.</P></Card>
    </ScrollView>
  );
}
