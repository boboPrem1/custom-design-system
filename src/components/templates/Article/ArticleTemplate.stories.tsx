import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleTemplate } from './ArticleTemplate';

const PROSE = (
  <>
    <p>Le Design System Atomique est une approche systématique pour la conception d'interfaces utilisateur cohérentes. En partant des <strong>atomes</strong> — les composants les plus primitifs — on remonte jusqu'aux <strong>templates</strong> complets.</p>
    <h2 id="section-1">1. Les Atomes</h2>
    <p>Les atomes sont les briques de base du système : boutons, icônes, champs de saisie. Ils ne peuvent pas être décomposés davantage sans perdre leur sens.</p>
    <h2 id="section-2">2. Les Molécules</h2>
    <p>En combinant des atomes, on crée des molécules — des groupes de composants qui forment une unité fonctionnelle distincte, comme un champ de recherche avec son bouton.</p>
    <h3 id="section-2-1">2.1 Exemples de molécules</h3>
    <p>Les FormField, SearchBar, Pagination sont autant d'exemples de molécules qui composent notre système.</p>
    <h2 id="section-3">3. Les Organismes</h2>
    <p>Les organismes sont des assemblages de molécules formant des sections distinctes d'une interface : Navbar, Sidebar, Modal...</p>
  </>
);

const meta = {
  title: 'Templates/Article',
  component: ArticleTemplate,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Introduction au Design System Atomique',
    subtitle: 'Une architecture composable pour des interfaces modernes et maintenables.',
    author: 'Jean Dupont',
    date: '15 avril 2024',
    readTime: '5 min',
    tags: ['Design System', 'React', 'TypeScript', 'Atomic Design'],
    breadcrumb: [{ label: 'Accueil', href: '#' }, { label: 'Documentation', href: '#' }, { label: 'Introduction' }],
    toc: [
      { id: 'section-1',   label: 'Les Atomes',       level: 2 },
      { id: 'section-2',   label: 'Les Molécules',     level: 2 },
      { id: 'section-2-1', label: 'Exemples',          level: 3 },
      { id: 'section-3',   label: 'Les Organismes',    level: 2 },
    ],
    children: PROSE,
    prevLink: { label: 'Tokens CSS', href: '#' },
    nextLink: { label: 'Guide de contribution', href: '#' },
  },
} satisfies Meta<typeof ArticleTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithTOC: Story = {};
export const NoTOC: Story = { args: { toc: [] } };
export const Minimal: Story = { args: { toc: [], breadcrumb: [], author: undefined, date: undefined, tags: [], prevLink: undefined, nextLink: undefined } };
