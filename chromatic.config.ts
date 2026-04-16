// chromatic.config.ts
// 7.2 — Configuration Chromatic pour tests de régression visuelle automatique
// Docs : https://www.chromatic.com/docs/configuration

export default {
  /** Seuil de différence (en %) avant de considérer un snapshot comme modifié */
  diffThreshold: 0.2,

  /** Nombre de tentatives si Chromatic est instable */
  exitZeroOnChanges: false,

  /** Ignorer les stories marquées 'skip-chromatic' */
  skip: ['skip-chromatic'],

  /** Activer TurboSnap — ne re-snapshote que les stories affectées par les changements Git */
  onlyChanged: true,

  /** Viewports à tester pour la régression visuelle */
  viewports: [375, 768, 1440],

  /** Dossier de sortie du build Storybook */
  storybookBuildDir: 'storybook-static',
};
