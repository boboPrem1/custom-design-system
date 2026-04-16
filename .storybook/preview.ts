import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/tokens/design-system.css'

/**
 * 7.4 — Décorateur global : synchronise data-theme sur <html>
 * lorsque le fond Storybook passe en dark (#0a0a0a).
 * Les composants utilisent var(--color-*) qui s'adaptent via [data-theme="dark"].
 */
const withTheme: Decorator = (Story, context) => {
  const background = context.globals?.backgrounds?.value;
  const isDark = background === '#0a0a0a' || background === '#111827';
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.style.background = background ?? '';
  }
  return Story();
};

const preview: Preview = {
  decorators: [withTheme],

  /** 7.5 — Tag global autodocs : chaque story hérite de la page de documentation */
  tags: ['autodocs'],

  initialGlobals: {
    backgrounds: { value: '#ffffff' },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    /** 7.1 — a11y strict : toute violation WCAG 2.1 AA fait échouer les tests CI */
    a11y: {
      // 'todo'  — affiche les violations dans l'UI de test seulement
      // 'error' — fait échouer le CI sur toute violation
      // 'off'   — désactive les vérifications
      test: 'error',
    },

    viewport: {
      viewports: {
        mobile:  { name: 'Mobile',  styles: { width: '375px',  height: '812px'  } },
        tablet:  { name: 'Tablet',  styles: { width: '768px',  height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px'  } },
      },
    },

    backgrounds: {
      default: 'light',
      values: [
        { name: 'light',   value: '#ffffff' },
        { name: 'surface', value: '#fafafa' },
        { name: 'dark',    value: '#0a0a0a' },
      ],
    },
  },
};

export default preview;