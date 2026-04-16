import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.mdx',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  docs: {
    /** 7.5 — La page de doc de chaque story est nommée "Documentation".
     *  L'activation autodocs est gérée via tags: ['autodocs'] dans preview.ts.
     */
    defaultName: 'Documentation',
  },
};
export default config;