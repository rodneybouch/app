import { View, Text, TouchableOpacity } from "react-native";
import { colors, spacing } from "./theme";
export function Card(p: { children: any; onPress?: () => void }) { const Cmp: any = p.onPress ? TouchableOpacity : View; return (<Cmp onPress={p.onPress} style={{ backgroundColor: colors.card, padding: spacing(2), borderRadius: 16, marginBottom: spacing(1), borderWidth: 1, borderColor: "#26262b" }}>{p.children}</Cmp>); }
export const H1 = (props: any) => <Text style={{ color: colors.text, fontSize: 22, fontWeight: "700", marginBottom: spacing(1) }} {...props} />;
export const P = (props: any) => <Text style={{ color: colors.sub, fontSize: 15, lineHeight: 22 }} {...props} />;
export const Tag = (props: { label: string; tone?: "ok" | "warn" | "danger" }) => (<View style={{ alignSelf: "flex-start", backgroundColor: colors[props.tone ?? "ok"], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 }}><Text style={{ color: "#0f0f10", fontWeight: "700" }}>{props.label}</Text></View>);
