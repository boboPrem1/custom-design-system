

Now let me explore the existing component structure to audit what's actually implemented vs what's planned.



18/20 folders exist — `Form` and `DashboardWidgets` are missing. Now I'll do a deep content audit of each organism.



Now let me check the stories for the remaining components to complete the audit.

J'ai maintenant audité tous les fichiers. Voici le rapport complet.

---

# Audit Profond — Phase 4 : Organisms (20 composants)

## Statut global : 18/20 implémentés

---

## 🔴 Composants Manquants (2/20)

| ID | Composant | Dossier | Statut |
|---|---|---|---|
| **4.6** | Form | `organisms/Form/` | **ABSENT** |
| **4.7** | DashboardWidgets | `organisms/DashboardWidgets/` | **ABSENT** |

Ces deux composants n'ont ni dossier, ni fichier, ni story.

---

## 🐛 Bug Critique

### 4.5 — DataTable — Icône de tri cassée
```@c:\Users\bobop\Documents\own\storybook\src\components\organisms\DataTable\DataTable.tsx:118
name={sortKey === col.key && sortDir === 'asc' ? 'arrow_right' : 'arrow_right'}
```
Le ternaire retourne **`'arrow_right'`** dans les deux branches — la distinction asc/desc est inopérante. L'icône ne change jamais.

---

## 🟡 Gaps de Spec (implémentations partielles)

### 4.1 — Navbar
- **❌ Icône hamburger erronée** : utilise `'home'` au lieu d'une icône menu/burger (`l.125`)
- **❌ Actions non intégrées** : search/notif sont un slot `ReactNode` libre — aucune composition par défaut
- **Story** : aucune story démontrant search + notif + avatar ensemble

### 4.4 — Footer
- **❌ Aucun accordion mobile** : le spec demande "accordéon mobile" — le composant est un footer statique, pas de comportement responsive collapse
- **Story** : seulement 2 stories (`Full`, `Minimal`), zéro démo mobile

### 4.5 — DataTable
- **❌ Filtres absents** : aucun mécanisme de filtrage par colonne
- **❌ Pagination non intégrée** : aucun lien avec le composant [Pagination](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/molecules/Pagination:0:0-0:0) existant
- **❌ Vue stack responsive absente** : scroll horizontal seulement, pas de stack mobile
- **Story** : pas de story `Filtered` ni `Paginated`

### 4.9 — Drawer
- **❌ Pas de swipe gesture** : le bottom sheet ne supporte pas les événements touch (`onTouchStart`/`onTouchEnd`) pour le swipe-to-close
- **⚠️ Overlay toujours dans le DOM** : rendu même quand `open=false` (juste `opacity: 0`) — peut causer des conflits de z-index

### 4.12 — CardGrid
- **❌ Masonry non implémenté** : le layout `'masonry'` utilise `repeat(${columns}, 1fr)` identique à `'equal'` — aucune logique masonry (ex: `grid-template-rows: masonry` ou colonnes CSS)

### 4.13 — HeroSection
- **❌ Pas de fond vidéo** : le spec mentionne "image/video/gradient" — seuls image et gradient sont gérés

### 4.15 — PricingTable
- **❌ Non responsive** : `gridTemplateColumns: repeat(${plans.length}, 1fr)` — sur mobile avec 4 plans, affichage en 4 colonnes étroites sans media query

### 4.16 — Timeline
- **❌ Layout alterné absent** : le spec demande "alternée desktop, linéaire mobile" — seules les orientations `vertical` et `horizontal` existent, aucun mode `alternating` gauche/droite

### 4.17 — CommandPalette
- **❌ Raccourci Cmd+K non enregistré** : le composant accepte `open` en prop contrôlée mais ne monte jamais le listener global `Cmd+K` lui-même — c'est entièrement à la charge du consommateur

### 4.18 — ChatFeed
- **❌ Réactions non interactives** : les réactions sont affichées (emoji + count) mais aucun callback `onReact` ni toggle — elles sont read-only

### 4.20 — ErrorState
- **⚠️ Illustrations = emojis** : le spec demande "illustrations SVG distinctes" — le composant utilise des emojis (`🔍`, `💥`, `📡`, `🔒`) dans un cercle coloré, pas des SVGs

---

## 🟢 Composants Solides (conformes au spec)

| ID | Composant | Points forts |
|---|---|---|
| **4.2** | Sidebar | Collapse icon-only, Tooltip, groupes, user info, sub-items, badges — ✅ complet |
| **4.3** | TabBar | Fixed bottom, badge notif, active state, interactive — ✅ complet |
| **4.8** | Modal | sm/md/lg/fullscreen, Esc, overlay close, scroll lock, animations — ✅ complet |
| **4.10** | Tabs | horizontal/vertical/pills, lazy loading, keyboard nav, ARIA — ✅ très complet |
| **4.11** | Accordion | exclusif/libre, animation max-height, chevron animé, disabled — ✅ complet |
| **4.14** | FeatureSection | 2/3/4-cols, alternating, icônes, badges — ✅ complet |
| **4.19** | EmptyState | SVG illustration, compact mode, CTA double, customisable — ✅ complet |
| **4.17** | CommandPalette | Recherche temps réel, groupes, ↑↓ Enter Esc, shortcuts display — ✅ très complet (sauf Cmd+K global) |

---

## Priorité de remédiation

1. **[Critique]** Corriger le bug tri [DataTable](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/organisms/DataTable:0:0-0:0) (une ligne)
2. **[Haute]** Créer `Form` (4.6) — composant central manquant
3. **[Haute]** Créer `DashboardWidgets` (4.7)
4. **[Moyenne]** Ajouter pagination intégrée à [DataTable](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/organisms/DataTable:0:0-0:0) + filtres
5. **[Moyenne]** Corriger l'icône hamburger [Navbar](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/organisms/Navbar:0:0-0:0) (`'home'` → icône menu)
6. **[Moyenne]** Implémenter vrais masonry columns dans [CardGrid](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/organisms/CardGrid:0:0-0:0)
7. **[Moyenne]** Ajouter accordion mobile à [Footer](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/organisms/Footer:0:0-0:0)
8. **[Basse]** Swipe gesture [Drawer](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/organisms/Drawer:0:0-0:0) bottom sheet
9. **[Basse]** Layout alterné [Timeline](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/organisms/Timeline:0:0-0:0)
10. **[Basse]** Réactivité mobile [PricingTable](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/organisms/PricingTable:0:0-0:0)
11. **[Basse]** Remplacer emojis par SVGs dans [ErrorState](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/organisms/ErrorState:0:0-0:0)

Veux-tu que je commence par les composants manquants (`Form`, `DashboardWidgets`) ou par la correction du bug critique dans [DataTable](cci:9://file:///c:/Users/bobop/Documents/own/storybook/src/components/organisms/DataTable:0:0-0:0) ?