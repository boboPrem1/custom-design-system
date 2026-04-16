// .storybook/vitest.setup.ts
// Fichier de setup requis par @storybook/addon-vitest
// Il importe les annotations globales du projet Storybook (preview.ts)
// afin que les décorateurs, paramètres et globals soient disponibles dans les tests.
import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

// Applique les annotations globales (decorators, parameters, globals) avant tous les tests.
// Ceci est l'équivalent de l'ancien `initializeWithRenderStory` du storybook-test-runner.
const project = setProjectAnnotations([projectAnnotations]);

beforeAll(project.beforeAll);
