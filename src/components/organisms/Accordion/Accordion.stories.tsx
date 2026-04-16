import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { Accordion } from './Accordion';

const ITEMS = [
  { id: 'q1', title: 'Qu\'est-ce que le Design System ?',      content: 'Un Design System est une collection de composants réutilisables guidés par des standards clairs.' },
  { id: 'q2', title: 'Comment installer les tokens ?',          content: 'Exécutez `pnpm tokens` pour générer les variables CSS depuis global.json.' },
  { id: 'q3', title: 'Les composants sont-ils accessibles ?',   content: 'Oui, chaque composant respecte les standards WCAG 2.1 niveau AA et utilise les rôles ARIA appropriés.' },
  { id: 'q4', title: 'Comment contribuer au projet ?',          content: 'Consultez le guide de contribution dans le README et créez vos composants en suivant les conventions établies.', },
];

const ITEMS_WITH_DISABLED = [
  ...ITEMS,
  { id: 'q5', title: 'Élément désactivé', content: 'Ce contenu ne devrait pas être visible.', disabled: true },
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
export const WithDisabled: Story = { args: { items: ITEMS_WITH_DISABLED } };

// ─── Play functions ──────────────────────────────────────────────────────

export const ToggleOpenClose: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn1 = canvas.getByText('Qu\'est-ce que le Design System ?');
    // open
    await userEvent.click(btn1);
    const panel1 = canvasElement.querySelector('#acc-panel-q1');
    await expect(panel1).toHaveAttribute('role', 'region');
    // close
    await userEvent.click(btn1);
  },
};

export const ExclusiveToggle: Story = {
  args: { exclusive: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // open first
    await userEvent.click(canvas.getByText('Qu\'est-ce que le Design System ?'));
    // open second — should close first (exclusive)
    await userEvent.click(canvas.getByText('Comment installer les tokens ?'));
    const btn1 = canvasElement.querySelector('#acc-btn-q1');
    await expect(btn1).toHaveAttribute('aria-expanded', 'false');
    const btn2 = canvasElement.querySelector('#acc-btn-q2');
    await expect(btn2).toHaveAttribute('aria-expanded', 'true');
  },
};

export const DisabledItem: Story = {
  args: { items: ITEMS_WITH_DISABLED },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disBtn = canvas.getByText('Élément désactivé');
    await userEvent.click(disBtn);
    const panel = canvasElement.querySelector('#acc-btn-q5');
    await expect(panel).toHaveAttribute('aria-expanded', 'false');
  },
};
