Je lis le plan Phase 6 et explore la structure des fichiers en parallèle.


7/7 dossiers présents. Je lis tous les `.tsx` et `.stories.tsx` en parallèle.

14/14 fichiers présents. Lecture en parallèle de tous les composants :

Lecture des stories :
J'ai tous les éléments. Voici l'audit complet :

---

# Audit Phase 6 — Graphic Extras (7/7 présents)

## Vue d'ensemble

| # | Composant | Fichiers | Stories | Spec OK | Bugs | Manques |
|---|---|---|---|---|---|---|
| 6.1 | ColorPalette | ✅ | 1 | ✅ | 🔴 | Minor |
| 6.2 | TypeSpecimen | ✅ | 1 | ✅ | — | Minor |
| 6.3 | IconGrid | ✅ | 1 | ⚠️ | — | Export SVG/PNG |
| 6.4 | LogoLockup | ✅ | 2 | ✅ | 🔴 | Minor |
| 6.5 | BrandCard | ✅ | 2 | ⚠️ | — | Props hardcodées |
| 6.6 | PosterLayout | ✅ | 2 | ⚠️ | — | Image slot manquant |
| 6.7 | OgImage | ✅ | 2 | ✅ | — | Minor |

---

## 🔴 Bugs critiques (2)

### B1 — ColorPalette : flex `space-between` avec un seul enfant → espace vide droit

```@c:\Users\bobop\Documents\own\storybook\src\components\graphic\ColorPalette\ColorPalette.tsx:43-45
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-tertiary)' }}>
  <span>{swatch.hex.toUpperCase()}</span>
</div>
```
`justifyContent: 'space-between'` avec un seul `<span>` → gap vide inutile à droite. Incomplète : il manque clairement un second élément (bouton copie ou badge de contraste WCAG).

---

### B2 — LogoLockup : [LogoMark](cci:1://file:///c:/Users/bobop/Documents/own/storybook/src/components/graphic/LogoLockup/LogoLockup.tsx:15:2-20:4) défini dans le body du composant parent

```@c:\Users\bobop\Documents\own\storybook\src\components\graphic\LogoLockup\LogoLockup.tsx:16-21
const LogoMark = ({ size = 48, color = brandColor }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" ...>
    ...
  </svg>
);
```
Composant React défini à l'intérieur d'un autre composant → recréé à chaque render, casse la réconciliation React. Doit être déclaré hors du composant parent.

---

### B3 — LogoLockup : marqueurs X de clear space non centrés

```@c:\Users\bobop\Documents\own\storybook\src\components\graphic\LogoLockup\LogoLockup.tsx:53-56
<div style={{ position: 'absolute', top: '-12px', left: '50%', color: '...', fontSize: '12px' }}>X</div>
<div style={{ position: 'absolute', bottom: '-12px', left: '50%', color: '...', fontSize: '12px' }}>X</div>
```
`left: '50%'` sans `transform: 'translateX(-50%)'` → les "X" sont décalés vers la droite du centre, pas centrés visuellement.

---

## 🟡 Manques spec (3)

### M1 — IconGrid : export SVG/PNG absent

**Plan** : *set complet en grille 24x24, categorise, **export SVG/PNG***. Aucun bouton de téléchargement, aucune logique d'export.

```@c:\Users\bobop\Documents\own\storybook\src\components\graphic\IconGrid\IconGrid.tsx:34-43
<div key={iconName} style={{ ... cursor: 'pointer' }} title={iconName}>
  <Icon name={iconName} size={24} ... />
  <span>{iconName}</span>
</div>
```
Cliquable mais aucun [onClick](cci:1://file:///c:/Users/bobop/Documents/own/storybook/src/components/templates/MobileApp/MobileAppTemplate.stories.tsx:13:88-13:123) → `cursor: pointer` sans action. Aucun mécanisme de copie du nom ou d'export SVG.

---

### M2 — PosterLayout : aucune zone visuelle/image

**Plan** : *zones titre/visuel/texte/CTA*. La zone **visuel** est absente — seuls des blobs décoratifs existent en background. Pas de prop `imageSrc` pour insérer un visuel ou une photo.

```@c:\Users\bobop\Documents\own\storybook\src\components\graphic\PosterLayout\PosterLayout.tsx:76-93
<div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', ... }}>
  <div style={{ gridColumn: 'span 11' }}>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>
</div>
```
Seuls titre + sous-titre. Pas de slot `image`. De plus le footer est **hardcodé** :

```@c:\Users\bobop\Documents\own\storybook\src\components\graphic\PosterLayout\PosterLayout.tsx:99-100
system.design / @designsystem<br/>
Paris, France
```
Ces valeurs devraient être des props (`url`, `city`).

---

### M3 — BrandCard : couleurs Dark/Light hardcodées, props manquantes

**Plan** : *recapitulatif identite : couleurs + typos + logo + ton*. Dark (`#111827`) et Light (`#F3F4F6`) sont en dur dans le JSX. Pas de props `darkColor`, `lightColor`, `accentColor`.

```@c:\Users\bobop\Documents\own\storybook\src\components\graphic\BrandCard\BrandCard.tsx:72-85
<div style={{ flex: 1, background: '#111827' }} />   {/* hardcodé */}
...
<div style={{ flex: 1, background: '#F3F4F6' }} />   {/* hardcodé */}
```
Conséquence : passer `primaryColor: '#20d4a0'` (story `AltTheme`) ne change que la couleur primaire, pas la palette complète.

---

## 🟢 Problèmes mineurs (4)

### m1 — OgImage : `textWrap` propriété CSS non standard en React

```@c:\Users\bobop\Documents\own\storybook\src\components\graphic\OgImage\OgImage.tsx:74
fontSize: 72, fontWeight: 800, lineHeight: 1.1, fontFamily: '...', width: '90%', textWrap: 'balance'
```
`textWrap` n'est pas une propriété reconnue dans le type `CSSProperties` de React — provoque un warning TypeScript silencieux. Utiliser `wordBreak: 'break-word'` à la place.

### m2 — TypeSpecimen : pas de strip des graisses typographiques

Le spec attend "tous les niveaux typographiques". Les graisses 300/400/500/600/700/800/900 ne sont pas visualisées. Seules les tailles sont démontrées.

### m3 — ColorPalette : pas de copy-to-clipboard

Pour une référence graphique, cliquer sur un swatch devrait copier le hex ou la variable CSS. `cursor` pas défini sur les swatches → pas d'indication d'interactivité.

### m4 — Stories très minimales (5/7 composants avec ≤ 1 story)

| Composant | Stories | Manque |
|---|---|---|
| ColorPalette | 1 | `FullSystemPalette`, `Minimal` |
| TypeSpecimen | 1 | `CustomFonts`, `CustomScale` |
| IconGrid | 1 | `AllIcons` (avec toutes les icônes du registry) |
| LogoLockup | 2 | `DarkBackground` |
| BrandCard | 2 | Suffisant |

---

## ✅ Ce qui est solide

- **PosterLayout** (6.6) — grille 12 colonnes réelle, format A4/A3 switchable, blobs décoratifs, CTA, proportions correctes
- **OgImage** (6.7) — dimensions exactes 1200×630, décorations gradient, badge + author, accentColor dynamique
- **BrandCard** (6.5) — structure complète (tone of voice, typo, couleurs, logo), rendu "print-ready" à 800px
- **TypeSpecimen** (6.2) — scale + typefaces bien structurées, tokens CSS visibles
- **LogoLockup** (6.4) — 4 variants (horizontal, vertical, icon-only, clear space) + 3 backgrounds

---

## Résumé corrections à appliquer

| ID | Priorité | Fichier | Action |
|---|---|---|---|
| B1 | 🔴 haute | [ColorPalette.tsx](cci:7://file:///c:/Users/bobop/Documents/own/storybook/src/components/graphic/ColorPalette/ColorPalette.tsx:0:0-0:0) | Ajouter bouton copie dans le flex ou retirer `space-between` |
| B2 | 🔴 haute | [LogoLockup.tsx](cci:7://file:///c:/Users/bobop/Documents/own/storybook/src/components/graphic/LogoLockup/LogoLockup.tsx:0:0-0:0) | Sortir [LogoMark](cci:1://file:///c:/Users/bobop/Documents/own/storybook/src/components/graphic/LogoLockup/LogoLockup.tsx:15:2-20:4) hors du composant parent |
| B3 | 🔴 haute | [LogoLockup.tsx](cci:7://file:///c:/Users/bobop/Documents/own/storybook/src/components/graphic/LogoLockup/LogoLockup.tsx:0:0-0:0) | Ajouter `transform: 'translateX(-50%)'` sur les marqueurs X |
| M1 | 🟡 moyenne | [IconGrid.tsx](cci:7://file:///c:/Users/bobop/Documents/own/storybook/src/components/graphic/IconGrid/IconGrid.tsx:0:0-0:0) | [onClick](cci:1://file:///c:/Users/bobop/Documents/own/storybook/src/components/templates/MobileApp/MobileAppTemplate.stories.tsx:13:88-13:123) → copie du nom d'icône dans le presse-papier |
| M2 | 🟡 moyenne | [PosterLayout.tsx](cci:7://file:///c:/Users/bobop/Documents/own/storybook/src/components/graphic/PosterLayout/PosterLayout.tsx:0:0-0:0) | Ajouter prop `imageSrc` + props `url`/`city` pour le footer |
| M3 | 🟡 moyenne | [BrandCard.tsx](cci:7://file:///c:/Users/bobop/Documents/own/storybook/src/components/graphic/BrandCard/BrandCard.tsx:0:0-0:0) | Ajouter props `darkColor`, `lightColor` au lieu du hardcodé |
| m1 | 🟢 basse | [OgImage.tsx](cci:7://file:///c:/Users/bobop/Documents/own/storybook/src/components/graphic/OgImage/OgImage.tsx:0:0-0:0) | `textWrap: 'balance'` → `wordBreak: 'break-word'` |
| m2 | 🟢 basse | [TypeSpecimen.tsx](cci:7://file:///c:/Users/bobop/Documents/own/storybook/src/components/graphic/TypeSpecimen/TypeSpecimen.tsx:0:0-0:0) | Ajouter section strip des graisses 300→900 |

Dis-moi si tu veux que j'applique les corrections.