// Datos por clase (src/data/classes/<id>.json) y metadatos comunes
const mods = import.meta.glob("../data/classes/*.json", { eager: true });
export const CLASSES = {};
for (const m of Object.values(mods)) { const d = m.default || m; CLASSES[d.id] = d; }

export const ORDER = ["shaman", "warlock", "druid", "mage", "priest", "paladin", "warrior", "rogue", "hunter"];
export const PICKS = ["shaman", "warlock", "druid"];
export const NAME = {
  shaman: "Chamán", warlock: "Brujo", druid: "Druida", mage: "Mago", priest: "Sacerdote",
  paladin: "Paladín", warrior: "Guerrero", rogue: "Pícaro", hunter: "Cazador",
};
export const SLUG = {
  shaman: "chaman", warlock: "brujo", druid: "druida", mage: "mago", priest: "sacerdote",
  paladin: "paladin", warrior: "guerrero", rogue: "picaro", hunter: "cazador",
};
export const ID_BY_SLUG = Object.fromEntries(Object.entries(SLUG).map(([k, v]) => [v, k]));
export const TINTS = {
  warlock: ["#7a4fb0", "#a03a3a", "#c0602a"], shaman: ["#3a6fc0", "#4a8a3a", "#2a8a8a"],
  druid: ["#3a7a9a", "#a06a2a", "#3a8a3a"], mage: ["#8a4fc0", "#c0502a", "#3a7ac0"],
  priest: ["#c0b06a", "#e0d8b0", "#6a4fa0"], paladin: ["#d0a040", "#9a8a6a", "#c06040"],
  warrior: ["#a06a3a", "#c04a3a", "#6a7a8a"], rogue: ["#a08a3a", "#8a6a4a", "#5a6a8a"],
  hunter: ["#6a9a4a", "#8a8a4a", "#6a6a3a"],
};
export const RACE_ICON = {
  "Humano": "race_human_male", "Enano": "race_dwarf_male", "Elfo de la noche": "race_nightelf_male",
  "Gnomo": "race_gnome_male", "Skyborne": "inv_misc_feather_01",
  "Human": "race_human_male", "Dwarf": "race_dwarf_male", "Night Elf": "race_nightelf_male", "Gnome": "race_gnome_male",
};
export const RACE_ES = { Human: "Humano", Dwarf: "Enano", "Night Elf": "Elfo de la noche", Gnome: "Gnomo" };
