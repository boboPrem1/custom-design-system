# Plan de realisation — Design System Atomic complet

> **Objectif** : ~100 composants Storybook organises en 6 niveaux (Atomic Design), reproductibles en changeant uniquement 5 tokens (3 couleurs + 2 fonts).
>
> **Cibles** : Web - Mobile - Graphique

---

## Phase 0 — Fondations et Outillage

**But** : Mettre en place l'infrastructure technique avant de creer le moindre composant.

| # | Tache | Detail |
|---|-------|--------|
| 0.1 | Installer Style Dictionary | `pnpm add -D style-dictionary` — generation automatique de variables CSS/SCSS/JS depuis les tokens JSON |
| 0.2 | Creer `tokens/global.json` | Fichier source unique : `brand.primary`, `brand.secondary`, `brand.accent`, `font.heading`, `font.body` |
| 0.3 | Script de generation de palette | Transformation HSL pour generer 9 teintes (50-950) par couleur + etats hover/active/disabled + couleurs semantiques (success, warning, error, info) |
| 0.4 | `style-dictionary.config.js` | Config pour output : CSS custom properties, SCSS variables, JS/TS constants |
| 0.5 | Integrer dans Storybook | Charger les variables CSS generees dans `.storybook/preview.ts` |
| 0.6 | Script `pnpm tokens` | Commande pour re-generer les tokens a chaque changement |
| 0.7 | Structure des dossiers | `src/components/{atoms,molecules,organisms,templates,graphic}/` + `src/tokens/` |
| 0.8 | Storybook global decorators | Reset CSS, font loading (Inter), theme clair/sombre, viewport presets (mobile/tablet/desktop) |
| 0.9 | Nettoyage | Supprimer les exemples par defaut (`src/stories/Button.tsx`, `Header.tsx`, `Page.tsx` et leurs stories) |

**Livrable** : `pnpm tokens && pnpm storybook` fonctionne, variables CSS disponibles, dossiers prets.

---

## Phase 1 — Tokens (8 stories de documentation)

**But** : Documenter visuellement chaque categorie de design tokens dans Storybook.

| # | Composant | Sous-elements | Cibles |
|---|-----------|---------------|--------|
| 1.1 | Couleurs | primary (9 teintes), secondary, accent, neutrals (gray-50-950), semantic (success/warning/error/info) | Web, Mobile, Graphique |
| 1.2 | Typographie | scale fluide (xs-6xl), weights (400/500/700), line-heights, letter-spacing | Web, Mobile, Graphique |
| 1.3 | Espacement | grille de 4px : 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 | Web, Mobile |
| 1.4 | Radius | none, sm(4), md(8), lg(12), xl(16), full(9999) | Web, Mobile |
| 1.5 | Ombres | sm, md, lg, xl, inner | Web |
| 1.6 | Motion | durees (fast 100ms, base 200ms, slow 350ms), easing (ease-out, ease-in, spring) | Web, Mobile |
| 1.7 | Breakpoints | sm(640), md(768), lg(1024), xl(1280), 2xl(1536) | Web |
| 1.8 | Opacite | disabled(40%), muted(60%), overlay(50%) | Web, Mobile |

**Livrable** : 8 stories de documentation dans `tokens/` — chaque token visible et testable dans Storybook.

---

## Phase 2 — Atoms (22 composants)

**But** : Creer les briques indivisibles du systeme, stylees uniquement par les tokens.

### Lot 2A — Typographie et texte (5 composants)

| # | Composant | Variants | Cibles |
|---|-----------|----------|--------|
| 2.1 | Heading | H1-H6, variants display/editorial/UI | Web, Mobile, Graphique |
| 2.2 | Body text | base, sm, xs, lead + couleurs primary/secondary/tertiary/disabled/link | Web, Mobile, Graphique |
| 2.3 | Label | form, caption, overline (uppercase tracking) | Web, Mobile |
| 2.4 | Code | inline (fond subtle, mono), block (line numbers, copy button) | Web |
| 2.5 | Kbd | single, combo (Cmd+K, Ctrl+Shift+P) | Web |

### Lot 2B — Actions et navigation (4 composants)

| # | Composant | Variants | Cibles |
|---|-----------|----------|--------|
| 2.6 | Icon | tailles 16/20/24/32, styles outline/filled, currentColor | Web, Mobile, Graphique |
| 2.7 | Button | primary/secondary/ghost/danger/link, sm/md/lg, icon-only, loading | Web, Mobile |
| 2.8 | Link | inline (underline), standalone (avec icone externe) | Web, Mobile |
| 2.9 | Chip / Tag | filled, outline, removable, clickable | Web, Mobile |

### Lot 2C — Formulaires (6 composants)

| # | Composant | Variants | Cibles |
|---|-----------|----------|--------|
| 2.10 | Input | text/email/password/number/search, etats default/focus/error/disabled/readonly, icone prefix/suffix | Web, Mobile |
| 2.11 | Textarea | auto-resize, fixed, character count | Web, Mobile |
| 2.12 | Checkbox | unchecked/checked/indeterminate + disabled, animation de check | Web, Mobile |
| 2.13 | Radio | group/single, vertical/horizontal | Web, Mobile |
| 2.14 | Toggle | on/off/loading + disabled, animation spring | Web, Mobile |
| 2.15 | Select | single/multi, native mobile, custom desktop | Web, Mobile |

### Lot 2D — Feedback et affichage (7 composants)

| # | Composant | Variants | Cibles |
|---|-----------|----------|--------|
| 2.16 | Badge | filled/outline/dot, semantic (success/warning/error/info/neutral), sm/md | Web, Mobile, Graphique |
| 2.17 | Avatar | image/initials/icon, xs/sm/md/lg/xl, status indicator, group | Web, Mobile, Graphique |
| 2.18 | Divider | horizontal/vertical, avec/sans label, dashed | Web, Mobile |
| 2.19 | Spinner | sm/md/lg, currentColor, overlay version | Web, Mobile |
| 2.20 | Skeleton | text/rect/circle, animation shimmer | Web, Mobile |
| 2.21 | Tooltip | top/bottom/left/right, delay 300ms, max-width 280px | Web |
| 2.22 | Image | responsive, lazy, blur-up, ratios 1:1/4:3/16:9/3:2 | Web, Mobile, Graphique |

**Livrable** : 22 composants atoms avec stories (autodocs + variants + controles interactifs).

---

## Phase 3 — Molecules (19 composants)

**But** : Assembler les atoms en unites fonctionnelles avec une responsabilite unique.

### Lot 3A — Formulaires composes (6 composants)

| # | Composant | Composition | Cibles |
|---|-----------|-------------|--------|
| 3.1 | Form field | Label + Input + hint + error message + required indicator | Web, Mobile |
| 3.2 | Search bar | Input + icone loupe + bouton clear + dropdown resultats | Web, Mobile |
| 3.3 | Date picker | Input formate + calendar popup, range picker | Web, Mobile |
| 3.4 | File upload | dropzone drag-and-drop + click browse + preview + progress | Web, Mobile |
| 3.5 | Tag input | Input + tag list + autocompletion, ajout Enter/virgule | Web |
| 3.6 | Input group | prefix (texte/icone) + Input + suffix (bouton/texte) | Web |

### Lot 3B — Navigation et controles (5 composants)

| # | Composant | Composition | Cibles |
|---|-----------|-------------|--------|
| 3.7 | Dropdown | trigger (button/input) + menu items, keyboard nav, groupes | Web, Mobile |
| 3.8 | Button group | segmented control / toolbar, selection single/multiple | Web, Mobile |
| 3.9 | Breadcrumb | liens + separateurs + truncation, dernier non-cliquable | Web |
| 3.10 | Pagination | numerotee + ellipsis, compact prev/next mobile | Web |
| 3.11 | Menu item | icone + label + raccourci + fleche sous-menu, destructive variant | Web, Mobile |

### Lot 3C — Feedback et contenu (8 composants)

| # | Composant | Composition | Cibles |
|---|-----------|-------------|--------|
| 3.12 | Rating | 1-5 etoiles, demi-etoile, read-only/interactif | Web, Mobile |
| 3.13 | Progress bar | lineaire (label %) + circulaire, animated, indeterminate | Web, Mobile |
| 3.14 | Alert | 4 variants semantic + icone + dismiss + inline/banner | Web, Mobile |
| 3.15 | Toast | bottom/top, auto-dismiss 3-5s, stack, action inline (Undo) | Web, Mobile |
| 3.16 | Card (base) | header (titre+action) + body + footer (boutons), clickable | Web, Mobile, Graphique |
| 3.17 | List item | icon/avatar + titre + sous-titre + badge + action/chevron | Web, Mobile |
| 3.18 | Stat card | icone + label muted + valeur large + trend indicator | Web, Graphique |
| 3.19 | Stepper input | bouton minus + input numerique + bouton plus, min/max | Web, Mobile |

**Livrable** : 19 molecules avec stories, interactions testables, composition visible dans Storybook.

---

## Phase 4 — Organisms (20 composants)

**But** : Creer des sections d'interface autonomes avec logique et etat interne.

### Lot 4A — Navigation globale (4 composants)

| # | Composant | Detail | Cibles |
|---|-----------|--------|--------|
| 4.1 | Navbar | logo + liens nav + actions (search/notif/avatar), sticky, hamburger mobile | Web |
| 4.2 | Sidebar | nav verticale + groupes + icones, collapsible (icon-only), user info | Web |
| 4.3 | Tab bar | bottom nav mobile, 3-5 items, active indicator, badge notif | Mobile |
| 4.4 | Footer | multi-colonne desktop, accordeon mobile, liens/social/copyright | Web, Graphique |

### Lot 4B — Donnees et formulaires (3 composants)

| # | Composant | Detail | Cibles |
|---|-----------|--------|--------|
| 4.5 | Data table | tri, filtres, selection, pagination integree, responsive scroll/stack | Web |
| 4.6 | Form | multi-sections, validation temps reel + soumission, error summary | Web, Mobile |
| 4.7 | Dashboard widgets | metric/chart/table/map, drag-and-drop, resize, actions header | Web |

### Lot 4C — Overlay et disclosure (4 composants)

| # | Composant | Detail | Cibles |
|---|-----------|--------|--------|
| 4.8 | Modal | sm/md/lg, confirm dialog, content scrollable, fullscreen mobile | Web, Mobile |
| 4.9 | Drawer | left/right/bottom, overlay click-outside, bottom sheet swipe mobile | Web, Mobile |
| 4.10 | Tabs | horizontal/vertical/pills, scroll mobile, lazy loading, keyboard nav | Web, Mobile |
| 4.11 | Accordion | mode exclusif (1 max) ou libre, animation ouverture, chevron anime | Web, Mobile |

### Lot 4D — Sections de contenu (6 composants)

| # | Composant | Detail | Cibles |
|---|-----------|--------|--------|
| 4.12 | Card grid | masonry/equal/list, responsive CSS grid, loading skeleton, empty state | Web, Mobile, Graphique |
| 4.13 | Hero section | titre + sous-titre + CTA(s), background image/video/gradient | Web, Graphique |
| 4.14 | Feature section | liste features + icones, layout alterne, 2-3-4 colonnes | Web, Graphique |
| 4.15 | Pricing table | 2-4 plans, toggle monthly/yearly, plan highlighted, feature checklist | Web, Graphique |
| 4.16 | Timeline | vertical/horizontal, icones statut, alternee desktop, lineaire mobile | Web, Graphique |
| 4.17 | Command palette | ouverture Cmd+K, recherche temps reel, groupes, keyboard nav | Web |

### Lot 4E — Etats et communication (3 composants)

| # | Composant | Detail | Cibles |
|---|-----------|--------|--------|
| 4.18 | Chat / Feed | bulles sent/received, avatars, timestamps, reactions, typing indicator | Web, Mobile |
| 4.19 | Empty state | illustration SVG + titre + description + CTA, contextualise | Web, Mobile |
| 4.20 | Error state | 404/500/network, illustrations distinctes, action de recuperation | Web, Mobile |

**Livrable** : 20 organisms avec stories interactives, etats internes fonctionnels.

---

## Phase 5 — Templates (10 layouts)

**But** : Assembler les organisms en mises en page completes, agnostiques du contenu reel.

| # | Template | Composition | Cibles |
|---|----------|-------------|--------|
| 5.1 | Dashboard | Sidebar + topbar + zone contenu grid, sidebar collapsible responsive | Web |
| 5.2 | Auth (login/register/reset) | layout centre desktop / pleine page mobile, formulaire + brand | Web, Mobile |
| 5.3 | Article / Doc | prose centree max-width 720px + TOC sticky + breadcrumb + meta + nav prev/next | Web, Graphique |
| 5.4 | Settings | nav sections gauche (tabs mobile) + contenu droite + footer Save/Cancel sticky | Web, Mobile |
| 5.5 | Landing page | Hero + Features + Social proof + Pricing + CTA finale + Footer | Web, Graphique |
| 5.6 | Onboarding flow | multi-etapes + progress bar + skip + completion screen | Web, Mobile |
| 5.7 | Mobile app screen | status bar safe area + tab bar + contenu scrollable + FAB optionnel | Mobile |
| 5.8 | Email template | max-width 600px, inline CSS, header logo + hero + contenu + footer legal | Graphique |
| 5.9 | Social post | ratios 1:1 / 9:16 / 16:9 (Instagram/LinkedIn/YouTube), logo + headline + CTA | Graphique |
| 5.10 | Presentation | slides titre/contenu/data, maitre slide avec zones configurables | Graphique |

**Livrable** : 10 templates navigables dans Storybook avec responsive preview.

---

## Phase 6 — Graphic Extras (7 composants)

**But** : Composants specifiques au design graphique — print, social, branding.

| # | Composant | Detail | Cibles |
|---|-----------|--------|--------|
| 6.1 | Color palette | grille complete des couleurs systeme avec hex + variable CSS | Graphique |
| 6.2 | Type specimen | tous les niveaux typographiques avec tokens correspondants | Graphique |
| 6.3 | Icon grid | set complet en grille 24x24, categorise (nav/action/statut), export SVG/PNG | Graphique |
| 6.4 | Logo lockup | horizontal/vertical/icon-only + zone de protection + fond clair/sombre/colore | Graphique |
| 6.5 | Brand card | recapitulatif identite : couleurs + typos + logo + ton | Graphique |
| 6.6 | Poster layout | grille 12 colonnes, zones titre/visuel/texte/CTA, marges configurables (A4/A3) | Graphique |
| 6.7 | OG image | template 1200x630px, logo + titre dynamique + sous-titre + fond brand | Graphique |

**Livrable** : 7 composants graphiques exportables, servant de reference visuelle pour les collaborateurs.

---

## Phase 7 — Finalisation et Qualite

**But** : Tests, documentation, et packaging final.

| # | Tache | Detail |
|---|-------|--------|
| 7.1 | Tests d'accessibilite | Passer addon a11y en mode `error`, corriger toutes les violations WCAG 2.1 AA |
| 7.2 | Tests visuels | Configurer Chromatic pour regression visuelle automatique |
| 7.3 | Tests d'interaction | Ajouter des `play` functions sur les composants interactifs cles (forms, modals, dropdowns) |
| 7.4 | Theme sombre | Verifier que tous les composants fonctionnent en dark mode via les tokens |
| 7.5 | Documentation Autodocs | Verifier que chaque composant a sa page de doc generee avec exemples et controles |
| 7.6 | Guide de contribution | README avec conventions de nommage, structure de fichiers, process de creation de composant |
| 7.7 | Build et export | `pnpm build-storybook` pour site statique deployable |

---

## Resume par phase

| Phase | Contenu | Nb composants | Dependances |
|-------|---------|---------------|-------------|
| **0** | Fondations et outillage | 0 | — |
| **1** | Tokens (documentation) | 8 stories | Phase 0 |
| **2** | Atoms | 22 | Phase 1 |
| **3** | Molecules | 19 | Phase 2 |
| **4** | Organisms | 20 | Phase 3 |
| **5** | Templates | 10 | Phase 4 |
| **6** | Graphic extras | 7 | Phase 1 + certains atoms |
| **7** | Finalisation et qualite | — | Toutes |
| | **TOTAL** | **~86 composants + 8 stories tokens + 7 graphic** | |

---

## Strategie de reproductibilite

Pour creer une **nouvelle identite visuelle**, modifier uniquement `tokens/global.json` :

```json
{
  "brand": {
    "primary":   { "value": "#NOUVELLE_COULEUR" },
    "secondary": { "value": "#NOUVELLE_COULEUR" },
    "accent":    { "value": "#NOUVELLE_COULEUR" }
  },
  "font": {
    "heading": { "value": "Nouvelle Font, sans-serif" },
    "body":    { "value": "Nouvelle Font, sans-serif" }
  }
}
```

Puis `pnpm tokens` — tous les ~100 composants s'adaptent instantanement.
