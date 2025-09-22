import { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { DB } from "../services/db";
import type { TrackItem, TrackStatus } from "../types";
import { Card, H1, P, Tag } from "../ui";
import { colors, spacing } from "../theme";
const statuses: TrackStatus[] = ["todo", "doing", "done", "blocked"];
export default function Actions() {
  const [items, setItems] = useState<TrackItem[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const isFocused = useIsFocused();
  async function load() { setItems(await DB.allItems()); }
  useEffect(() => { if (isFocused) load(); }, [isFocused]);
  async function addQuick() { if (!newTitle.trim()) return; await DB.upsertItem({ id: Math.random().toString(36).slice(2), area: "personal", title: newTitle.trim(), status: "todo", dueAt: null }); setNewTitle(""); load(); }
  async function cycleStatus(it: TrackItem) { const idx = statuses.indexOf(it.status); const next = statuses[(idx + 1) % statuses.length]; await DB.upsertItem({ ...it, status: next }); load(); }
  return (
    <ScrollView style={{ padding: spacing(2) }}>
      <H1>Actions</H1>
      <Card>
        <Text style={{ color: colors.text, marginBottom: 6 }}>Ajouter une action rapide</Text>
        <TextInput value={newTitle} onChangeText={setNewTitle} placeholder="Titre" placeholderTextColor="#777" onSubmitEditing={addQuick} style={{ backgroundColor: colors.card, color: colors.text, borderColor: "#2d2e33", borderWidth: 1, borderRadius: 12, padding: 12 }}/>
        <Pressable onPress={addQuick} style={{ marginTop: 10, backgroundColor: colors.accent, padding: 12, borderRadius: 12, alignSelf: "flex-start" }}><Text style={{ color: "white", fontWeight: "700" }}>Ajouter</Text></Pressable>
      </Card>
      {items.map((i) => (
        <Card key={i.id} onPress={() => cycleStatus(i)}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text style={{ color: colors.text, fontWeight: "600" }}>{i.title}</Text>
              <P>{i.area} {i.dueAt ? `· due ${new Date(i.dueAt).toLocaleString()}` : ""}</P>
            </View>
            <Tag label={i.status} tone={i.status === "done" ? "ok" : i.status === "blocked" ? "danger" : "warn"} />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}
