# Design System — Atomic Design avec Storybook

Un design system complet (~100 composants) organise en **Atomic Design** (tokens, atoms, molecules, organisms, templates, graphic extras). Construit avec React, TypeScript, Vite et Storybook 10.

Changer **3 couleurs + 2 fonts** dans un seul fichier JSON suffit a rebrander l'ensemble du systeme.

---

## Stack technique

| Outil | Version | Role |
|-------|---------|------|
| React | 19.2 | Framework UI |
| TypeScript | 6.0 | Typage statique |
| Vite | 8.0 | Bundler / Dev server |
| Storybook | 10.3 | Documentation et dev de composants |
| Style Dictionary | 5.4 | Generation automatique de design tokens |
| Vitest + Playwright | 4.1 / 1.59 | Tests composants et navigateur |
| ESLint | 9.39 | Linting |
| pnpm | -- | Gestionnaire de paquets |

---

## Installation

```bash
# Cloner le projet
git clone <repo-url>
cd storybook

# Installer les dependances
pnpm install

# Generer les design tokens
pnpm tokens

# Lancer Storybook
pnpm storybook
```

Storybook sera accessible sur **http://localhost:6006**.

---

## Commandes disponibles

| Commande | Description |
|----------|-------------|
| `pnpm tokens` | Genere les variables CSS/JS/TS depuis `src/tokens/global.json` |
| `pnpm storybook` | Build les tokens puis lance Storybook (port 6006) |
| `pnpm build-storybook` | Build les tokens puis genere un site Storybook statique |
| `pnpm dev` | Lance le serveur Vite (app React) |
| `pnpm build` | Compile TypeScript + build Vite production |
| `pnpm lint` | Lance ESLint |

---

## Personnaliser l'identite visuelle

Editer **uniquement** `src/tokens/global.json` :

```json
{
  "brand": {
    "primary":   { "value": "#6C63FF", "type": "color" },
    "secondary": { "value": "#0F0F2D", "type": "color" },
    "accent":    { "value": "#00D4A0", "type": "color" }
  },
  "font": {
    "heading": { "value": "Inter, sans-serif", "type": "fontFamily" },
    "body":    { "value": "Inter, sans-serif", "type": "fontFamily" }
  }
}
```

Puis lancer `pnpm tokens` — toutes les variables CSS sont regenerees automatiquement :

- **Palette complete** : 9 teintes (50 a 950) par couleur via manipulation HSL
- **Etats** : hover, active (luminosite ajustee)
- **Couleurs semantiques** : success, warning, error, info
- **Neutrals** : gray-50 a gray-950
- **Surface / Text / Border** : derives automatiquement

---

## Structure du projet

```
storybook/
├── .storybook/
│   ├── main.ts              # Config Storybook (framework, addons, stories glob)
│   └── preview.ts           # Parametres globaux (CSS, viewports, backgrounds)
├── src/
│   ├── components/
│   │   ├── atoms/           # Briques indivisibles (Button, Input, Badge...)
│   │   ├── molecules/       # Assemblages fonctionnels (FormField, SearchBar...)
│   │   ├── organisms/       # Sections autonomes (Navbar, DataTable, Modal...)
│   │   ├── templates/       # Mises en page completes (Dashboard, Auth...)
│   │   └── graphic/         # Composants print/branding (Palette, Logo...)
│   ├── tokens/
│   │   ├── global.json      # SOURCE UNIQUE — modifier ici pour rebrander
│   │   ├── build-tokens.js  # Script de generation (palette HSL + Style Dictionary)
│   │   ├── design-system.css # Reset CSS global + import des variables
│   │   ├── generated/       # JSON intermediaire (palette calculee)
│   │   └── dist/            # Output final : variables.css, tokens.js, tokens.d.ts
│   ├── App.tsx              # Page d'accueil Vite
│   └── main.tsx             # Point d'entree React
├── package.json
├── vite.config.ts
├── tsconfig.json
├── 01_CONTEXT.md            # Contexte du design system
├── 01_CONTEXT_PLAN.md       # Plan de realisation par phases
└── ALL_MODIFS.md            # Journal de toutes les modifications
```

---

## Organisation Atomic Design

| Niveau | Nb prevu | Description |
|--------|----------|-------------|
| **Tokens** | 8 stories | Couleurs, typographie, espacement, radius, ombres, motion, breakpoints, opacite |
| **Atoms** | 22 | Heading, Button, Input, Badge, Avatar, Spinner, Tooltip... |
| **Molecules** | 19 | FormField, SearchBar, Card, Alert, Toast, Dropdown... |
| **Organisms** | 20 | Navbar, Sidebar, DataTable, Modal, Hero, Pricing... |
| **Templates** | 10 | Dashboard, Auth, Landing, Settings, Email, Social... |
| **Graphic** | 7 | Color palette, Type specimen, Logo lockup, OG image... |

---

## Ajouter un composant

1. Creer le fichier dans le bon dossier (`src/components/<level>/`)
2. Utiliser les CSS variables (`var(--color-primary-500)`, `var(--spacing-4)`, etc.)
3. Creer un fichier `.stories.ts` a cote du composant
4. Lancer `pnpm storybook` pour visualiser

---

## Addons Storybook actifs

- **@storybook/addon-docs** — Documentation automatique (Autodocs)
- **@storybook/addon-a11y** — Verification d'accessibilite
- **@storybook/addon-vitest** — Tests de composants integres
- **@chromatic-com/storybook** — Tests visuels Chromatic
- **@storybook/addon-onboarding** — Guide de demarrage
