export type TrackStatus = "todo" | "doing" | "done" | "blocked";
export type TrackItem = { id: string; area: "personal" | "artistic" | "financial" | "relational"; title: string; notes?: string; status: TrackStatus; dueAt?: number | null };
export type Ritual = { id: string; title: string; cadence: "daily" | "weekly" | "monthly"; prompt: string; nextAt?: number | null };
