# Commits en attente — Phase 4 Organisms (Lots 4A → 4E)

> Ordre séquentiel — aucun fichier dupliqué entre les commits.

---

## Bugfix & Corrections préalables

### Commit 49 — Bugfix Avatar status indicator

```bash
git add src/components/atoms/Avatar/Avatar.tsx;git commit -S -m "fix(atoms): fix Avatar status indicator positioning (dot visible outside overflow:hidden container)"
```

### Commit 50 — Fix Tooltip TypeScript errors

```bash
git add src/components/atoms/Tooltip/Tooltip.stories.tsx;git commit -S -m "fix(atoms): add missing children prop to Tooltip meta.args to satisfy TypeScript strict inference"
```

---

## Lot 4A — Navigation (4 composants)

### Commit 51 — Navbar

```bash
git add src/components/organisms/Navbar/Navbar.tsx src/components/organisms/Navbar/Navbar.stories.tsx src/components/organisms/Navbar/index.ts;git commit -S -m "feat(organisms): add Navbar component with logo, liens de navigation, actions et menu mobile hamburger (4.1)"
```

### Commit 52 — Sidebar

```bash
git add src/components/organisms/Sidebar/Sidebar.tsx src/components/organisms/Sidebar/Sidebar.stories.tsx src/components/organisms/Sidebar/index.ts;git commit -S -m "feat(organisms): add Sidebar component with grouped navigation, collapsed icon-only mode, sub-menus and user info (4.2)"
```

### Commit 53 — TabBar

```bash
git add src/components/organisms/TabBar/TabBar.tsx src/components/organisms/TabBar/TabBar.stories.tsx src/components/organisms/TabBar/index.ts;git commit -S -m "feat(organisms): add TabBar mobile bottom navigation with active indicator and notification badges (4.3)"
```

### Commit 54 — Footer

```bash
git add src/components/organisms/Footer/Footer.tsx src/components/organisms/Footer/Footer.stories.tsx src/components/organisms/Footer/index.ts;git commit -S -m "feat(organisms): add Footer component with multi-column layout, social links and copyright (4.4)"
```

---

## Lot 4B — Données (1 composant)

### Commit 55 — DataTable

```bash
git add src/components/organisms/DataTable/DataTable.tsx src/components/organisms/DataTable/DataTable.stories.tsx src/components/organisms/DataTable/index.ts;git commit -S -m "feat(organisms): add DataTable component with sortable columns, row selection, loading overlay and zebra striping (4.5)"
```

---

## Lot 4C — Overlays & Navigation interne (4 composants)

### Commit 56 — Modal

```bash
git add src/components/organisms/Modal/Modal.tsx src/components/organisms/Modal/Modal.stories.tsx src/components/organisms/Modal/index.ts;git commit -S -m "feat(organisms): add Modal component with sm/md/lg/fullscreen sizes, slide-up animation and Escape close (4.6)"
```

### Commit 57 — Drawer

```bash
git add src/components/organisms/Drawer/Drawer.tsx src/components/organisms/Drawer/Drawer.stories.tsx src/components/organisms/Drawer/index.ts;git commit -S -m "feat(organisms): add Drawer component with left/right/bottom sides, spring animation and overlay (4.7)"
```

### Commit 58 — Tabs

```bash
git add src/components/organisms/Tabs/Tabs.tsx src/components/organisms/Tabs/Tabs.stories.tsx src/components/organisms/Tabs/index.ts;git commit -S -m "feat(organisms): add Tabs component with line/pills variants, horizontal/vertical orientation and keyboard navigation (4.8)"
```

### Commit 59 — Accordion

```bash
git add src/components/organisms/Accordion/Accordion.tsx src/components/organisms/Accordion/Accordion.stories.tsx src/components/organisms/Accordion/index.ts;git commit -S -m "feat(organisms): add Accordion component with exclusive mode, animated chevron and max-height transition (4.9)"
```

---

## Lot 4D — Contenu & Marketing (6 composants)

### Commit 60 — HeroSection

```bash
git add src/components/organisms/HeroSection/HeroSection.tsx src/components/organisms/HeroSection/HeroSection.stories.tsx src/components/organisms/HeroSection/index.ts;git commit -S -m "feat(organisms): add HeroSection component with gradient/solid/image background, badge, CTAs and blur blobs (4.10)"
```

### Commit 61 — FeatureSection

```bash
git add src/components/organisms/FeatureSection/FeatureSection.tsx src/components/organisms/FeatureSection/FeatureSection.stories.tsx src/components/organisms/FeatureSection/index.ts;git commit -S -m "feat(organisms): add FeatureSection component with 2/3/4-col grid and alternating layout (4.11)"
```

### Commit 62 — PricingTable

```bash
git add src/components/organisms/PricingTable/PricingTable.tsx src/components/organisms/PricingTable/PricingTable.stories.tsx src/components/organisms/PricingTable/index.ts;git commit -S -m "feat(organisms): add PricingTable component with monthly/yearly toggle, highlighted plan and feature checklist (4.12)"
```

### Commit 63 — Timeline

```bash
git add src/components/organisms/Timeline/Timeline.tsx src/components/organisms/Timeline/Timeline.stories.tsx src/components/organisms/Timeline/index.ts;git commit -S -m "feat(organisms): add Timeline component with vertical/horizontal orientation, colored status dots and custom icons (4.13)"
```

### Commit 64 — CommandPalette

```bash
git add src/components/organisms/CommandPalette/CommandPalette.tsx src/components/organisms/CommandPalette/CommandPalette.stories.tsx src/components/organisms/CommandPalette/index.ts;git commit -S -m "feat(organisms): add CommandPalette component with real-time search, keyboard navigation and shortcut display (4.14)"
```

### Commit 65 — CardGrid

```bash
git add src/components/organisms/CardGrid/CardGrid.tsx src/components/organisms/CardGrid/CardGrid.stories.tsx src/components/organisms/CardGrid/index.ts;git commit -S -m "feat(organisms): add CardGrid component with equal/masonry/list layouts, loading skeletons and empty state slot (4.15)"
```

---

## Lot 4E — États applicatifs (3 composants)

### Commit 66 — ChatFeed

```bash
git add src/components/organisms/ChatFeed/ChatFeed.tsx src/components/organisms/ChatFeed/ChatFeed.stories.tsx src/components/organisms/ChatFeed/index.ts;git commit -S -m "feat(organisms): add ChatFeed component with sent/received bubbles, typing indicator, emoji reactions and send input (4.16)"
```

### Commit 67 — EmptyState

```bash
git add src/components/organisms/EmptyState/EmptyState.tsx src/components/organisms/EmptyState/EmptyState.stories.tsx src/components/organisms/EmptyState/index.ts;git commit -S -m "feat(organisms): add EmptyState component with default SVG illustration, title, description and CTA slots (4.17)"
```

### Commit 68 — ErrorState

```bash
git add src/components/organisms/ErrorState/ErrorState.tsx src/components/organisms/ErrorState/ErrorState.stories.tsx src/components/organisms/ErrorState/index.ts;git commit -S -m "feat(organisms): add ErrorState component with 404/500/network/forbidden presets and retry/home actions (4.18)"
```

---

## Corrections TypeScript (Phase 4 polish)

### Commit 69 — Fix TypeScript errors on organisms

```bash
git add \
  src/components/organisms/Navbar/Navbar.tsx \
  src/components/organisms/Navbar/Navbar.stories.tsx \
  src/components/organisms/TabBar/TabBar.tsx \
  src/components/organisms/CommandPalette/CommandPalette.tsx \
  src/components/organisms/DataTable/DataTable.tsx \
  src/components/organisms/FeatureSection/FeatureSection.tsx \
  src/components/organisms/ChatFeed/ChatFeed.tsx \
  src/components/organisms/PricingTable/PricingTable.tsx \
  src/components/organisms/HeroSection/HeroSection.tsx \
  src/components/organisms/HeroSection/index.ts \
  src/components/organisms/CardGrid/CardGrid.stories.tsx;git commit -S -m "fix(organisms): fix IconSize values (12/18/22/48 → 16/20/20/32), remove unused imports, rename Hero→HeroSection, fix Card props in stories"
```

---

## Audit Phase 4 — Corrections et composants manquants

### Commit 70 — Enrichissement Icon atom (nouvelles icônes)

```bash
git add src/components/atoms/Icon/Icon.tsx;git commit -S -m "feat(atoms): add menu, link, code, filter, chart, drag, trend_up, trend_down icons to ICONS registry"
```

### Commit 71 — Fix Navbar icône hamburger

```bash
git add src/components/organisms/Navbar/Navbar.tsx;git commit -S -m "fix(organisms): replace wrong 'home' icon with 'menu' icon on Navbar hamburger button"
```

### Commit 72 — Fix DataTable sort icon + ajout filtres et pagination intégrée

```bash
git add src/components/organisms/DataTable/DataTable.tsx src/components/organisms/DataTable/DataTable.stories.tsx;git commit -S -m "fix(organisms): fix redundant sort icon ternary; add filterable column inputs and integrated Pagination with pageSize prop"
```

### Commit 73 — Fix CardGrid masonry réel (CSS columns)

```bash
git add src/components/organisms/CardGrid/CardGrid.tsx;git commit -S -m "fix(organisms): implement true CSS columnCount masonry layout in CardGrid (was identical to equal grid)"
```

### Commit 74 — Fix Footer accordion mobile

```bash
git add src/components/organisms/Footer/Footer.tsx;git commit -S -m "fix(organisms): add responsive mobile accordion to Footer columns with useState toggle and media query CSS"
```

### Commit 75 — Fix Drawer swipe-to-close bottom sheet

```bash
git add src/components/organisms/Drawer/Drawer.tsx;git commit -S -m "fix(organisms): add touch swipe-to-close gesture (delta > 60px) to Drawer bottom sheet variant"
```

### Commit 76 — Fix Timeline layout alterné

```bash
git add src/components/organisms/Timeline/Timeline.tsx;git commit -S -m "fix(organisms): add 'alternating' orientation to Timeline with left/right content alternation and center axis line"
```

### Commit 77 — Fix PricingTable responsive mobile

```bash
git add src/components/organisms/PricingTable/PricingTable.tsx;git commit -S -m "fix(organisms): make PricingTable responsive with media query stacking plans to single column on mobile (<640px)"
```

### Commit 78 — Fix ErrorState illustrations SVG

```bash
git add src/components/organisms/ErrorState/ErrorState.tsx;git commit -S -m "fix(organisms): replace emoji illustrations with distinct inline SVGs for 404 (search), 500 (crash chart), network (signal) and forbidden (padlock)"
```

### Commit 79 — Nouveau composant Form (4.6)

```bash
git add src/components/organisms/Form/Form.tsx src/components/organisms/Form/Form.stories.tsx src/components/organisms/Form/index.ts;git commit -S -m "feat(organisms): add Form organism with multi-section layout, real-time field validation, error summary and async submit (4.6)"
```

### Commit 80 — Nouveau composant DashboardWidgets (4.7)

```bash
git add src/components/organisms/DashboardWidgets/DashboardWidgets.tsx src/components/organisms/DashboardWidgets/DashboardWidgets.stories.tsx src/components/organisms/DashboardWidgets/index.ts;git commit -S -m "feat(organisms): add DashboardWidgets with WidgetShell, MetricWidget (trend), ChartWidget (CSS bars), TableWidget and responsive DashboardGrid (4.7)"
```

### Commit 81 — Mise à jour plan Phase 4 complète

```bash
git add 01_CONTEXT_PLAN.md;git commit -S -m "docs: mark all Phase 4 organisms as completed [x] in 01_CONTEXT_PLAN.md (20/20)"
```