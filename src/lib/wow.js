import C from "../data/content.json";
export const DATA = C;

// Iconos de WoW servidos por el CDN de Wowhead (no se copian al repositorio)
export const iconUrl = (name, size = "medium") => `https://wow.zamimg.com/images/wow/icons/${size}/${name}.jpg`;

export const CLASS_ICON = {
  warlock: "classicon_warlock", priest: "classicon_priest", shaman: "classicon_shaman",
  mage: "classicon_mage", rogue: "classicon_rogue", paladin: "classicon_paladin",
  druid: "classicon_druid", hunter: "classicon_hunter", warrior: "classicon_warrior",
};
export const CLASS_COLOR = {
  warlock: "#8788EE", priest: "#FFFFFF", shaman: "#0070DD", mage: "#3FC7EB", rogue: "#FFF468",
  paladin: "#F48CBA", druid: "#FF7C0A", hunter: "#AAD372", warrior: "#C69B6D",
};
export const CLASS_SLUG = {
  warlock: "brujo", priest: "sacerdote", shaman: "chaman", mage: "mago", rogue: "picaro",
  paladin: "paladin", druid: "druida", hunter: "cazador", warrior: "guerrero",
};
export const RACE_ICON = {
  "Orco": "race_orc_male", "No-muerto": "race_scourge_male", "Tauren": "race_tauren_male",
  "Trol": "race_troll_male", "Skyborne": "inv_misc_feather_01",
};
export const PROF_ICON = {
  "Peletería": "trade_leatherworking", "Ingeniería": "trade_engineering", "Herrería": "trade_blacksmithing",
  "Sastrería": "trade_tailoring", "Alquimia": "trade_alchemy", "Encantamiento": "trade_engraving",
  "Desuello": "inv_misc_pelt_wolf_01", "Minería": "trade_mining", "Herboristería": "trade_herbalism",
  "Primeros auxilios": "spell_holy_sealofsacrifice", "Cocina": "inv_misc_food_15", "Pesca": "trade_fishing",
};
export const PROF_KEY_NAME = {
  skinning: "Desuello", mining: "Minería", leatherworking: "Peletería", engineering: "Ingeniería",
  firstaid: "Primeros auxilios", cooking: "Cocina", tailoring: "Sastrería", enchanting: "Encantamiento",
  alchemy: "Alquimia", blacksmithing: "Herrería",
};
export const MISC_ICON = {
  legacy: "inv_misc_book_09", gameplay: "spell_holy_sealofmight", guide: "inv_misc_map_01", tier: "achievement_arena_2v2_7",
  priest: "spell_holy_powerwordshield", builds: "ability_marksmanship", rules: "inv_scroll_03",
  addon: "inv_gizmo_02", duel: "ability_dualwield", totem: "spell_nature_stoneskintotem",
  gold: "inv_misc_coin_01", stream: "inv_misc_eye_01", calendar: "inv_misc_pocketwatch_01",
};

export function abbr(name) {
  const skip = new Set(["of", "the", "and", "a", "de", "la", "el"]);
  const w = name.replace(/\(.*?\)/g, "").replace(/[:']/g, "").trim().split(/[\s-]+/).filter((x) => !skip.has(x.toLowerCase()));
  if (w.length === 1) return w[0].slice(0, 3);
  return w.map((x) => x[0]).join("").slice(0, 3).toUpperCase();
}

export const url = (p = "") => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${p.replace(/^\//, "")}`;
};
