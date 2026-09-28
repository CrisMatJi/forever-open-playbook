import { defineConfig } from "astro/config";

// En GitHub Pages el workflow pasa SITE y BASE_PATH (p. ej. /forever-open-playbook)
export default defineConfig({
  site: process.env.SITE || "https://example.github.io",
  base: process.env.BASE_PATH || "/",
  trailingSlash: "ignore",
  build: { format: "directory" },
});
