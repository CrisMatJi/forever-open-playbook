import { CLASSES } from "./classes.js";

// Geometría del árbol
export const S = 48, G = 14, P = 10;
export const W = P * 2 + 4 * S + 3 * G;
export const H = P * 2 + 7 * S + 6 * G + 6;
export const cx = (c) => P + (c - 1) * (S + G);
export const cy = (r) => P + (r - 1) * (S + G);

export function getClass(id) {
  const c = CLASSES[id].talents;
  return { ...c, byName: Object.fromEntries(c.list.map((t) => [t.name, t])) };
}

export function expand(b) {
  const out = [];
  for (const tok of b || []) {
    const [n, k] = String(tok).split("*");
    for (let i = 0; i < (+k || 1); i++) out.push(n.trim());
  }
  return out;
}

export function allocate(id, n, build) {
  const c = getClass(id);
  const seq = expand(build).slice(0, n);
  const ranks = {};
  const per = [0, 0, 0];
  for (const name of seq) {
    const t = c.byName[name];
    if (!t) continue;
    ranks[name] = (ranks[name] || 0) + 1;
    per[t.tree]++;
  }
  return { ranks, per, seq };
}

export function stateOf(c, t, ranks, per) {
  const r = ranks[t.name] || 0;
  const p = t.pre && c.byName[t.pre];
  const unlocked = per[t.tree] >= 5 * (t.row - 1) && (!p || (ranks[t.pre] || 0) >= p.max);
  return r >= t.max ? "max" : r > 0 ? "part" : unlocked ? "open" : "lock";
}

export function arrows(c, tree) {
  return c.list
    .filter((t) => t.tree === tree && t.pre && c.byName[t.pre])
    .map((t) => {
      const p = c.byName[t.pre];
      const x1 = cx(p.col) + S / 2, y1 = cy(p.row) + S, x2 = cx(t.col) + S / 2, y2 = cy(t.row);
      let d;
      if (p.col === t.col) d = `M${x1} ${y1} V${y2 - 6}`;
      else if (p.row === t.row) d = `M${cx(p.col) + (t.col > p.col ? S : 0)} ${cy(p.row) + S / 2} H${cx(t.col) + (t.col > p.col ? 0 : S)}`;
      else d = `M${x1} ${y1} V${y2 - G / 2} H${x2} V${y2 - 6}`;
      const head = p.row === t.row ? "" : `M${x2 - 6} ${y2 - 8} L${x2 + 6} ${y2 - 8} L${x2} ${y2}Z`;
      return { d, head, from: t.pre, to: t.name };
    });
}

// Comprueba que una build respeta filas y requisitos; devuelve lista de errores
export function validate(id, build) {
  const c = getClass(id);
  const ranks = {}, per = [0, 0, 0], errs = [];
  expand(build).forEach((name, i) => {
    const t = c.byName[name];
    if (!t) { errs.push(`#${i + 1} ${name}: no existe`); return; }
    if (per[t.tree] < 5 * (t.row - 1)) errs.push(`#${i + 1} ${name}: fila ${t.row} con ${per[t.tree]} puntos`);
    if (t.pre && (ranks[t.pre] || 0) < (c.byName[t.pre]?.max ?? 0)) errs.push(`#${i + 1} ${name}: falta ${t.pre}`);
    ranks[name] = (ranks[name] || 0) + 1;
    if (ranks[name] > t.max) errs.push(`#${i + 1} ${name}: más de ${t.max} rangos`);
    per[t.tree]++;
  });
  return errs;
}
