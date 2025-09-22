import * as SQLite from "expo-sqlite";
import type { TrackItem, Ritual } from "../types";

const db = SQLite.openDatabaseSync("unspoken.db");
export function initDb() {
  db.execAsync(`PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS track_items (id TEXT PRIMARY KEY NOT NULL, area TEXT NOT NULL, title TEXT NOT NULL, notes TEXT, status TEXT NOT NULL, dueAt INTEGER);
  CREATE TABLE IF NOT EXISTS rituals (id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, cadence TEXT NOT NULL, prompt TEXT NOT NULL, nextAt INTEGER);`);
}
export const DB = {
  allItems(): Promise<TrackItem[]> { return db.getAllAsync("SELECT * FROM track_items ORDER BY dueAt IS NULL, dueAt ASC"); },
  upsertItem(i: TrackItem) { return db.runAsync("INSERT OR REPLACE INTO track_items (id, area, title, notes, status, dueAt) VALUES (?,?,?,?,?,?)", i.id, i.area, i.title, i.notes ?? null, i.status, i.dueAt ?? null); },
  deleteItem(id: string) { return db.runAsync("DELETE FROM track_items WHERE id = ?", id); },
  allRituals(): Promise<Ritual[]> { return db.getAllAsync("SELECT * FROM rituals"); },
  upsertRitual(r: Ritual) { return db.runAsync("INSERT OR REPLACE INTO rituals (id, title, cadence, prompt, nextAt) VALUES (?,?,?,?,?)", r.id, r.title, r.cadence, r.prompt, r.nextAt ?? null); }
};
