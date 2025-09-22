import { useState } from "react";
import { Text, ScrollView, TextInput, Pressable, ActivityIndicator } from "react-native";
import { H1, P, Card } from "../ui";
import { colors, spacing } from "../theme";
import { askCoach, SYSTEM_PROMPT, CoachMessage } from "../services/openai";
export default function Coach() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  async function send() {
    if (!input.trim()) return; setLoading(true);
    try { const msgs: CoachMessage[] = [{ role: "system", content: SYSTEM_PROMPT }, { role: "user", content: input.trim() }]; const r = await askCoach(msgs); setReply(r); }
    catch { setReply("Coach unavailable. Configure proxy URL in services/openai.ts"); }
    finally { setLoading(false); }
  }
  return (
    <ScrollView style={{ padding: spacing(2) }}>
      <H1>Coach</H1>
      <Card>
        <TextInput value={input} onChangeText={setInput} placeholder="Ask for next actions…" placeholderTextColor="#777" multiline style={{ minHeight: 90, textAlignVertical: "top", color: colors.text, borderColor: "#2d2e33", borderWidth: 1, borderRadius: 12, padding: 12 }} />
        <Pressable onPress={send} style={{ marginTop: 10, backgroundColor: colors.accent, padding: 12, borderRadius: 12, alignSelf: "flex-start" }}><Text style={{ color: "white", fontWeight: "700" }}>Ask Coach</Text></Pressable>
      </Card>
      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {reply && (<Card><Text style={{ color: colors.text, fontWeight: "700", marginBottom: 6 }}>Reply</Text><P>{reply}</P></Card>)}
    </ScrollView>
  );
}
