# Guide de Contribution — Design System Atomique

## 🏗 Architecture

```
src/components/
├── atoms/          # Composants primitifs indivisibles (Button, Input, Icon…)
├── molecules/      # Combinaisons d'atoms (FormField, SearchBar…)
├── organisms/      # Blocs complexes (Navbar, Sidebar, DataTable…)
├── templates/      # Mises en page complètes (Dashboard, Auth, LandingPage…)
└── graphic/        # Composants graphiques exportables (ColorPalette, OgImage…)
```

## 📁 Structure d'un composant

Chaque composant est isolé dans son propre dossier :

```
atoms/Button/
├── Button.tsx          # Implémentation + export de l'interface TypeScript
├── Button.stories.tsx  # Stories Storybook (Default + variantes)
└── index.ts            # Barrel export
```

## 🧱 Créer un nouvel Atom

### 1. Créer le fichier composant

```tsx
// src/components/atoms/MonComposant/MonComposant.tsx
import { type CSSProperties } from 'react';

export interface MonComposantProps {
  label: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  style?: CSSProperties;
}

export const MonComposant = ({
  label,
  variant = 'primary',
  className,
  style,
}: MonComposantProps) => {
  return (
    <div
      className={className}
      style={{ color: `var(--color-${variant}-default)`, ...style }}
    >
      {label}
    </div>
  );
};
```

### 2. Créer les Stories

```tsx
// src/components/atoms/MonComposant/MonComposant.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonComposant } from './MonComposant';

const meta = {
  title: 'Atoms/MonComposant',
  component: MonComposant,
  parameters: { layout: 'centered' },
  args: { label: 'Mon composant' },
} satisfies Meta<typeof MonComposant>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
```

### 3. Créer l'export barrel

```ts
// src/components/atoms/MonComposant/index.ts
export { MonComposant } from './MonComposant';
export type { MonComposantProps } from './MonComposant';
```

## 🎨 Tokens CSS

**Ne jamais utiliser de valeurs codées en dur.** Toujours utiliser les variables CSS :

| Catégorie | Syntaxe |
|-----------|---------|
| Couleurs | `var(--color-primary-default)`, `var(--color-semantic-error-default)` |
| Espacement | `var(--spacing-4)`, `var(--spacing-8)` |
| Typographie | `var(--font-size-base)`, `var(--font-heading)` |
| Bordures | `var(--radius-md)`, `var(--color-border-primary)` |
| Ombres | `var(--shadow-sm)`, `var(--shadow-lg)` |
| Transitions | `var(--motion-duration-fast)`, `var(--motion-easing-ease-out)` |

Pour régénérer les tokens CSS :

```bash
pnpm tokens
```

## ✅ Conventions de nommage

| Élément | Convention | Exemple |
|---------|-----------|---------|
| Composant | PascalCase | `ButtonGroup` |
| Fichier | PascalCase | `ButtonGroup.tsx` |
| Props interface | PascalCase + `Props` | `ButtonGroupProps` |
| Story title | `Niveau/NomComposant` | `Atoms/Button` |
| CSS variable | kebab-case | `var(--color-primary-default)` |
| Atom icon size | Union stricte | `16 \| 20 \| 24 \| 32` |

## 🔍 IconSize

Les icônes n'acceptent que ces tailles : `16 | 20 | 24 | 32`. Toute autre valeur entraîne une erreur TypeScript.

```tsx
// ✅ Correct
<Icon name="check" size={24} />

// ❌ Incorrect
<Icon name="check" size={18} />
```

## 🌙 Dark Mode

Le dark mode est géré via l'attribut `data-theme="dark"` sur `<html>`. Les composants n'ont rien à implémenter spécifiquement — les tokens CSS s'adaptent automatiquement.

Pour tester le dark mode dans Storybook : utiliser le switcher de fond **"dark"** dans la toolbar.

## ♿ Accessibilité

Chaque composant doit respecter **WCAG 2.1 AA** :

- Ratios de contraste ≥ 4.5:1 pour le texte normal, ≥ 3:1 pour le grand texte
- Support clavier complet (`Tab`, `Escape`, `Enter`/`Space` selon le cas)
- Attributs ARIA appropriés (`aria-label`, `role`, `aria-expanded`…)
- Focus visible sur tous les éléments interactifs

Le plugin `@storybook/addon-a11y` est configuré en mode **`error`** — les violations bloquent le CI.

## 🧪 Tests d'interaction (play functions)

Les tests d'interaction utilisent le **Vitest addon** (Chromium headless via Playwright).
Ils remplacent le déprécié `storybook-test-runner`.

### Écrire une play function

```tsx
import { userEvent, within, expect } from 'storybook/test';

export const MonTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Valider' });

    await userEvent.click(button);
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  },
};
```

### Lancer les tests

```bash
# Mode watch (CI)
pnpm test

# Mode UI interactif
pnpm test:ui

# Avec couverture de code
pnpm test:coverage
```

> Les tests sont exécutés dans **Chromium headless** via `@vitest/browser-playwright`.
> Le fichier de setup `.storybook/vitest.setup.ts` initialise les décorateurs globaux.

## 🔁 Process de PR

1. `pnpm storybook` — vérifier visuellement les nouvelles stories
2. Vérifier l'onglet **Accessibilité** dans Storybook (addon-a11y en mode `error`)
3. `pnpm test` — exécuter tous les tests d'interaction Vitest
4. `pnpm build-storybook` — vérifier que le build statique fonctionne
5. Ouvrir une PR avec une description des composants ajoutés

## 📦 Scripts disponibles

| Script | Description |
|--------|-------------|
| `pnpm tokens` | Régénère le CSS depuis `tokens/global.json` |
| `pnpm storybook` | Lance Storybook en mode dev (port 6006) |
| `pnpm build-storybook` | Build le site statique Storybook |
| `pnpm test` | Lance tous les tests Vitest (Chromium headless) |
| `pnpm test:ui` | Lance Vitest en mode UI interactif |
| `pnpm test:coverage` | Génère un rapport de couverture de code |
| `pnpm build` | Build l'app Vite de démo |
| `pnpm lint` | Lance ESLint |
