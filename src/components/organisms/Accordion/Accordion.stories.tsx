import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const ITEMS = [
  { id: 'q1', title: 'Qu\'est-ce que le Design System ?',      content: 'Un Design System est une collection de composants réutilisables guidés par des standards clairs.' },
  { id: 'q2', title: 'Comment installer les tokens ?',          content: 'Exécutez `pnpm tokens` pour générer les variables CSS depuis global.json.' },
  { id: 'q3', title: 'Les composants sont-ils accessibles ?',   content: 'Oui, chaque composant respecte les standards WCAG 2.1 niveau AA et utilise les rôles ARIA appropriés.' },
  { id: 'q4', title: 'Comment contribuer au projet ?',          content: 'Consultez le guide de contribution dans le README et créez vos composants en suivant les conventions établies.', },
];

const meta = {
  title: 'Organisms/Accordion',
  component: Accordion,
  args: { items: ITEMS },
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Exclusive: Story = { args: { exclusive: true, defaultOpenIds: ['q1'] } };
export const AllOpen: Story = { args: { defaultOpenIds: ITEMS.map((i) => i.id) } };
