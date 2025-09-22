import { DB } from "./services/db";
function rid() { return Math.random().toString(36).slice(2); }
export async function seed() {
  const now = Date.now();
  await DB.upsertItem({ id: rid(), area: "personal", title: "Morning clarity ritual (3 min)", status: "doing", dueAt: now + 6*60*60*1000 });
  await DB.upsertItem({ id: rid(), area: "artistic", title: "Edit radio interview into 1 reel", status: "todo", dueAt: now + 48*60*60*1000 });
  await DB.upsertItem({ id: rid(), area: "financial", title: "Draft EP + Journal landing page copy", status: "todo", dueAt: null });
  await DB.upsertItem({ id: rid(), area: "relational", title: "Write Letter 1 (honor & closure)", status: "todo", dueAt: now + 72*60*60*1000 });
  await DB.upsertRitual({ id: rid(), title: "3 Portes & un Seuil (soir)", cadence: "daily", prompt: "Qu'ai-je ressenti? Qu'ai-je évité? Quel clin d'œil? Que je relâche?", nextAt: now + 22*60*60*1000 });
  await DB.upsertRitual({ id: rid(), title: "Mantra de semaine", cadence: "weekly", prompt: "Je choisis la clarté et la douceur agissante.", nextAt: now + 7*24*60*60*1000 });
}
