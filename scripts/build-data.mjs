// Extrae los datos de la versión de una sola página (main.html + talents.js + route.json + icons.txt)
import fs from "node:fs";
import vm from "node:vm";
const SRC = process.env.TFO_SRC || "/tmp/claude-0/-home-claude/633ea97b-c502-5f01-b7b5-6d3de1d0ce4a/scratchpad/tfo";
const html = fs.readFileSync(`${SRC}/main.html`, "utf8");
const talentsJs = fs.readFileSync(`${SRC}/talents.js`, "utf8");
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const app = scripts.find(s => s.includes("const CLASSES"));
// DOM mínimo para que el script corra sin navegador
const el = () => new Proxy(function(){}, { get: (t, k) => k === "value" ? "0" : k === Symbol.toPrimitive ? () => "" : el(), set: () => true, apply: () => el() });
const ctx = { document: el(), localStorage: { getItem: () => null, setItem() {} }, location: { hash: "" }, module: undefined, console };
vm.createContext(ctx);
const code = app.replace(/^[\s\S]*?(const CLASSES)/, "$1")

  + "\n;globalThis.OUT={CLASSES,PROFS,TINTS,ORDER,TIERS,STEPS,RULES,GUIDE,BIS20,MATCHUPS};";
vm.runInContext(talentsJs.replace(/if\(typeof module[^\n]*/, "") + "\nconst $=()=>document;\n" + code.replace(/\nrenderGuide\(\);[^\n]*\n[\s\S]*?setTab\(start\);/, "\n"), ctx);
const O = ctx.OUT;
const tctx = { module: { exports: {} } };
vm.createContext(tctx);
vm.runInContext(talentsJs, tctx);
const { TALENTS, BUILDS } = tctx.module.exports;
const icons = {};
for (const line of fs.readFileSync("scripts/icons.txt", "utf8").trim().split("\n")) {
  const [cls, name, icon] = line.split("|");
  (icons[cls] ||= {})[name] = icon;
}
const talents = {};
for (const [id, c] of Object.entries(TALENTS)) {
  talents[id] = {
    trees: c.trees,
    list: c.raw.trim().split("\n").map(l => {
      const [t, r, col, name, max, pre, eff] = l.split("|");
      return { tree: +t, row: +r, col: +col, name, max: +max, pre: pre === "-" ? null : pre, eff, icon: icons[id]?.[name] || null };
    }),
  };
  const miss = talents[id].list.filter(t => !t.icon).map(t => t.name);
  if (miss.length) console.warn("sin icono", id, miss);
}
const route = JSON.parse(fs.readFileSync(`${SRC}/route.json`, "utf8"));
delete route._note;
const out = { ...JSON.parse(JSON.stringify(O)), BUILDS, route };
fs.writeFileSync("src/data/content.json", JSON.stringify(out, null, 1));
fs.writeFileSync("src/data/talents.json", JSON.stringify(talents));
console.log("ok", Object.keys(out).join(","), "·", Object.keys(talents).length, "clases");
