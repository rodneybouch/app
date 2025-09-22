export type CoachMessage = { role: "system" | "user" | "assistant"; content: string };
export const SYSTEM_PROMPT = `You are Unspoken Coach: concise, kind, practical. Convert goals into 1–3 next actions. Offer micro-rituals when stuck. <=120 words.`;
export async function askCoach(messages: CoachMessage[]): Promise<string> {
  const url = "https://YOUR_PROXY.example.com/coach"; // set to your deployed proxy URL
  const token = "supersecrettoken"; // set to your PROXY_TOKEN
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ messages }) });
  if (!res.ok) throw new Error("Coach error");
  const json = await res.json();
  return json.reply as string;
}
