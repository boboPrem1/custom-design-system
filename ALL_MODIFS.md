# Journal des modifications

---

## Phase 0 — Fondations et Outillage (terminee)

### 0.1 — Installation de Style Dictionary

- **Commande** : `pnpm add -D style-dictionary`
- **Version** : 5.4.0
- **Fichier modifie** : `package.json` (ajout dans devDependencies)

### 0.2 — Creation de `src/tokens/global.json`

- **Fichier cree** : `src/tokens/global.json`
- **Contenu** : source unique de verite avec :
  - `brand.primary` (#6C63FF), `brand.secondary` (#0F0F2D), `brand.accent` (#00D4A0)
  - `font.heading` et `font.body` (Inter)
  - `fontSize` : echelle xs (0.75rem) a 6xl (3.75rem)
  - `fontWeight` : regular (400), medium (500), bold (700)
  - `lineHeight` : tight (1.25), normal (1.5), relaxed (1.75)
  - `spacing` : grille 4px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128)
  - `radius` : none, sm(4), md(8), lg(12), xl(16), full(9999)
  - `shadow` : sm, md, lg, xl, inner
  - `motion.duration` : fast(100ms), base(200ms), slow(350ms)
  - `motion.easing` : easeOut, easeIn, spring
  - `breakpoint` : sm(640), md(768), lg(1024), xl(1280), 2xl(1536)
  - `opacity` : disabled(0.4), muted(0.6), overlay(0.5)

### 0.3 — Script de generation de palette HSL

- **Fichier cree** : `src/tokens/build-tokens.js`
- **Fonctionnalites** :
  - Conversion hex vers HSL et inverse
  - Generation de 11 teintes (50 a 950) par couleur de base via manipulation HSL
  - Generation des etats hover (-8% luminosite) et active (-15% luminosite)
  - Generation de la palette neutre (gray-50 a gray-950)
  - Generation des couleurs semantiques (success, warning, error, info) avec variantes light/dark
  - Generation des couleurs surface, text, et border
  - Ecriture du JSON intermediaire dans `src/tokens/generated/colors.json`
  - Execution de Style Dictionary pour produire les outputs finaux

### 0.4 — Configuration Style Dictionary (integree dans build-tokens.js)

- **Platforms configurees** :
  - `css` : genere `src/tokens/dist/variables.css` (~100+ CSS custom properties)
  - `js` : genere `src/tokens/dist/tokens.js` (ES6 module)
  - `ts` : genere `src/tokens/dist/tokens.d.ts` (declarations TypeScript)

### 0.5 — Integration dans Storybook

- **Fichier modifie** : `.storybook/preview.ts`
- **Changements** :
  - Ajout de l'import `../src/tokens/design-system.css`
  - Ajout de presets viewport : Mobile (375x812), Tablet (768x1024), Desktop (1440x900)
  - Ajout de backgrounds : light (#ffffff), surface (#fafafa), dark (#0a0a0a)

### 0.6 — Script `pnpm tokens`

- **Fichier modifie** : `package.json`
- **Scripts ajoutes** :
  - `"tokens": "node src/tokens/build-tokens.js"` — generation manuelle
  - `"prestorybook": "pnpm tokens"` — generation automatique avant Storybook
  - `"build-storybook": "pnpm tokens && storybook build"` — generation avant build statique

### 0.7 — Structure des dossiers

- **Dossiers crees** :
  - `src/components/atoms/`
  - `src/components/molecules/`
  - `src/components/organisms/`
  - `src/components/templates/`
  - `src/components/graphic/`
- **Fichiers crees** : `.gitkeep` dans chaque dossier pour le suivi git

### 0.8 — Storybook global decorators

- **Fichier cree** : `src/tokens/design-system.css`
- **Contenu** :
  - Import Google Fonts (Inter 400/500/700)
  - Import des variables CSS generees (`dist/variables.css`)
  - Reset CSS complet (box-sizing, margin, padding)
  - Styles de base body (font-family, font-size, line-height, color via tokens)
  - Styles headings (font-family heading, bold, tight line-height)
  - Styles liens (couleur via token, hover underline)
  - Focus visible (outline 2px primary)
  - Selection (background primary-200)
  - Scrollbar subtle (neutral-300/400)

### 0.9 — Nettoyage des exemples par defaut

- **Dossier supprime** : `src/stories/` (et tout son contenu)
  - `Button.tsx`, `Button.stories.ts`, `button.css`
  - `Header.tsx`, `Header.stories.ts`, `header.css`
  - `Page.tsx`, `Page.stories.ts`, `page.css`
  - `Configure.mdx`
  - `assets/` (16 fichiers d'images)

- **Fichier modifie** : `.storybook/main.ts`
  - Stories glob change de `../src/**/*.stories.*` vers `../src/components/**/*.stories.*`
  - MDX glob change de `../src/**/*.mdx` vers `../src/components/**/*.mdx`

---

## Documentation

- **Fichier modifie** : `README.md`
  - Remplacement du README Vite par defaut par la documentation complete du design system
  - Sections : stack technique, installation, commandes, personnalisation, structure, organisation Atomic Design, guide d'ajout de composant, addons

- **Fichier cree** : `ALL_MODIFS.md` (ce fichier)

---

## Fichiers de contexte (crees par l'utilisateur)

- `01_CONTEXT.md` : description du projet et de la strategie de reproductibilite
- `01_CONTEXT_PLAN.md` : plan detaille par phases (Phase 0 a 7, ~100 composants)
- `atomic_design_system_map.html` : carte interactive des composants du design system
