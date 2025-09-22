import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false }) });
export async function ensurePermission() { const s = await Notifications.getPermissionsAsync(); if (!s.granted) await Notifications.requestPermissionsAsync(); }
export async function schedule(title: string, body: string, when: Date) { await ensurePermission(); return Notifications.scheduleNotificationAsync({ content: { title, body }, trigger: when }); }
