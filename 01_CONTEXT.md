Quelles sont les différents composants que je dois créer dans le strybook en tant que elements cohérents d'un system coherent Atomic Design, le system obtenu doit etre assez complet pour permettre de créer des elements visuels graphics, web design, mobile design etc, le tout permettant de créer un ensemble cohérent: Ensemble graphic + Application web + Application mobile. Si j'ai oublié un truc,  tes suggestions pour que le truc soit complet sont les bienvenus, il faudrais un config pour que la reproduction soit facile le tout juste en changeant la couleur principal, secondaire et accent ainsi que la typographie par exemple

Au total : **~100 composants** organisés en 6 niveaux — clique sur n'importe quel chip pour voir les détails et quelles cibles (web/mobile/graphique) il couvre.

---

## La config qui rend tout ça reproductible

```json
// tokens/global.json  ← tu touches UNIQUEMENT ce fichier
{
  "brand": {
    "primary":   { "value": "#6C63FF" },
    "secondary": { "value": "#0F0F2D" },
    "accent":    { "value": "#00D4A0" }
  },
  "font": {
    "heading": { "value": "Inter, sans-serif" },
    "body":    { "value": "Inter, sans-serif" }
  }
}
```

Style Dictionary génère automatiquement depuis ça :
- toute la palette (teintes 50→950 via HSL)
- les états hover/active/disabled (luminosité -10%/+10%)
- les couleurs sémantiques dérivées
- les variables CSS, SCSS, et JS constants

Pour créer **une nouvelle identité visuelle complète**, tu changes uniquement les 5 valeurs ci-dessus — tous les 100 composants s'adaptent instantanément.

---

Tu veux que je commence par te générer la config `style-dictionary.config.js` complète avec la génération automatique des teintes depuis les 3 couleurs de base ?