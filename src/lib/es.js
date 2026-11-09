import ES from "../data/es.json";
// Nombres oficiales del cliente en español (esES); si falta, se deja el original
export const esDungeon = (n) => ES.dungeons[n] || n;
export const esZone = (n) => (n && ES.zones[n]) || n;
export const esItem = (id, n) => ES.items[String(id)] || n;
export const esBoss = (n) => (n && ES.bosses[n]) || n;
export const esNpc = (n) => (n && ES.npcs[n]?.es) || n;
export function esQuest(name) {
  const m = /\((\d+)\)\s*$/.exec(name || "");
  const base = (name || "").replace(/\s*\(\d+\)\s*$/, "");
  return (m && ES.quests[m[1]]) || ES.quests[name] || base;
}
