# Forever Open Playbook

Guía de fans para **The Forever Open** (torneo de duelos a nivel 30 en la beta de WoW Forever, solo Horda):
ruta de speedrun por nivel, checklist, tier list, planes contra Sacerdote, builds con árboles de talentos,
calculadora de Legacy, reglas y el addon **ForeverPvPTournament**.

Hecha con [Astro](https://astro.build), 100 % estática. Los iconos se cargan desde el CDN de Wowhead
(no se copian al repositorio) y, si no cargan, se muestra una abreviatura.

## Publicar en GitHub Pages

1. Crea un repositorio y sube este proyecto a la rama `main`.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada push a `main` ejecuta `.github/workflows/deploy.yml`, que compila y publica.
   La ruta base (`/nombre-del-repo`) se configura sola.

## En local

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
```

## Estructura

- `src/pages/`: una página por sección (`guia`, `tier`, `sacerdote`, `builds/[clase]`, `legacy`, `reglas`, `addon`).
- `src/data/content.json`: clases, guía, reglas, BiS, cruces y **ruta por nivel** (misma fuente que el addon).
- `src/data/talents.json`: árboles de Forever (cliente 1.60.1.70009) con el icono de cada talento.
- `src/lib/`: cálculo de builds (filas y requisitos) e iconos.
- `public/addon/ForeverPvPTournament.zip`: el addon descargable.
- `scripts/build-data.mjs`: regenera los JSON desde la versión de una página (solo si la tienes).

El progreso de la guía se guarda en el navegador (localStorage) y se sincroniza con el addon pegando el
código de `/tfo export`.

Sin relación con Blizzard Entertainment ni con la organización del torneo. World of Warcraft es marca de Blizzard Entertainment.
Árboles de talentos: Talents Forever (CC BY 4.0).
