import D from "../data/dungeons.json";

export const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Nombres con los que aparecen las mazmorras en los textos (español e inglés) -> nombre en dungeons.json
const ALIAS = {
  "The Hall of Thanes": ["Hall of Thanes", "Salón de los Feudales"],
  "Ragefire Chasm": ["Ragefire Chasm", "Sima ígnea"],
  "Ruins of Lordaeron": ["Ruins of Lordaeron", "Ruinas de Lordaeron"],
  "The Deadmines": ["Deadmines", "Minas de la Muerte"],
  "Wailing Caverns": ["Wailing Caverns", "Cuevas de los Lamentos", "Cavernas de los Lamentos"],
  "Shadowfang Keep": ["Shadowfang Keep", "Castillo de Colmillo Oscuro"],
  "Blackfathom Deeps": ["Blackfathom Deeps", "Cavernas de Brazanegra", "Brazanegra"],
  "The Stockade": ["Stockade", "Mazmorras de Ventormenta", "Las Mazmorras"],
  "Excavation Site: Wetlands": ["Excavation Site", "Excavación: Los Humedales", "Excavación de los Humedales"],
  "City of Dalaran": ["City of Dalaran", "Ciudad de Dalaran"],
  "Razorfen Kraul": ["Razorfen Kraul", "Horado Rajacieno"],
  "Gnomeregan": ["Gnomeregan"],
  "Scarlet Monastery - Graveyard": ["Scarlet Monastery", "Monasterio Escarlata"],
  "The Drowned City": ["Drowned City", "Ciudad Sumergida"],
  "Razorfen Downs": ["Razorfen Downs", "Zahúrda Rojocieno", "Zahúrda Rajacieno"],
  "Krol'dok Stronghold": ["Krol'dok"],
  "Uldaman": ["Uldaman"],
  "Zul'Farrak": ["Zul'Farrak"],
  "Maraudon": ["Maraudon"],
  "Alcaz Prison": ["Alcaz"],
  "The Temple of Atal'Hakkar": ["Atal'Hakkar", "Templo Sumergido", "Sunken Temple"],
  "Blackrock Depths": ["Blackrock Depths", "Profundidades de Roca Negra"],
  "Lower Blackrock Spire": ["Lower Blackrock Spire", "Cumbre de Roca Negra", "LBRS"],
  "Upper Blackrock Spire": ["Upper Blackrock Spire", "UBRS"],
  "Dire Maul - East": ["Dire Maul", "La Masacre"],
  "Blackmaw Hold": ["Blackmaw", "Bastión Faucenegra"],
  "Scholomance": ["Scholomance"],
  "Stratholme - Main Gate (Living)": ["Stratholme"],
  "Shaper's Terrace": ["Shaper's Terrace", "Bancal del Creador"],
};
const NAMES = new Set(D.dungeons.map((d) => d.name));
const PAIRS = Object.entries(ALIAS).filter(([n]) => NAMES.has(n)).flatMap(([n, list]) => list.map((a) => [a, n]))
  .sort((a, b) => b[0].length - a[0].length);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const RE = new RegExp(`(${PAIRS.map(([a]) => reEsc(a)).join("|")})`, "g");
const BY = Object.fromEntries(PAIRS);

// Devuelve HTML con los nombres de mazmorra enlazados a su ficha
export function linkDungeons(text, base) {
  return esc(text).replace(RE, (m) => `<a class="dlink" href="${base}mazmorras#${slug(BY[m])}">${m}</a>`);
}
