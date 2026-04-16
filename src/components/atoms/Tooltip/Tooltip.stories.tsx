import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: { control: { type: 'radio' }, options: ['top', 'bottom', 'left', 'right'] },
    delay:     { control: { type: 'number', min: 0, max: 1000 } },
    disabled:  { control: 'boolean' },
  },
  args: {
    content: 'Texte d\'aide contextuel',
    placement: 'top',
    delay: 300,
    children: <Button variant="secondary">Survolez-moi</Button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Texte d'aide contextuel" placement="top" delay={300}>
        <Button variant="secondary">Survolez-moi</Button>
      </Tooltip>
    </div>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-8)', placeItems: 'center' }}>
      <span />
      <Tooltip content="Tooltip en haut" placement="top">
        <Button size="sm" variant="secondary">Top</Button>
      </Tooltip>
      <span />
      <Tooltip content="Tooltip à gauche" placement="left">
        <Button size="sm" variant="secondary">Left</Button>
      </Tooltip>
      <span />
      <Tooltip content="Tooltip à droite" placement="right">
        <Button size="sm" variant="secondary">Right</Button>
      </Tooltip>
      <span />
      <Tooltip content="Tooltip en bas" placement="bottom">
        <Button size="sm" variant="secondary">Bottom</Button>
      </Tooltip>
      <span />
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Ce tooltip contient un texte plus long qui peut s'étendre sur plusieurs lignes selon la largeur maximale configurée." placement="bottom" maxWidth={220}>
        <Button variant="ghost">Long tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Ce tooltip ne s'affichera pas" placement="top" disabled>
        <Button variant="secondary">Tooltip désactivé</Button>
      </Tooltip>
    </div>
  ),
};

// ─── Play functions ──────────────────────────────────────────────────────

export const HoverShowHide: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Visible au survol" placement="top" delay={0}>
        <Button variant="secondary">Hover test</Button>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Hover test');
    const wrapper = trigger.closest('span');
    // hover to show
    await userEvent.hover(wrapper!);
    await new Promise((r) => setTimeout(r, 50));
    const tooltip = canvasElement.querySelector('[role="tooltip"]');
    await expect(tooltip).toBeInTheDocument();
    // unhover to hide
    await userEvent.unhover(wrapper!);
  },
};

export const FocusShowBlurHide: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Focus visible" placement="bottom" delay={0}>
        <Button variant="secondary">Focus test</Button>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByText('Focus test');
    const wrapper = btn.closest('span');
    // focus → show
    wrapper!.focus();
    await new Promise((r) => setTimeout(r, 50));
    // blur → hide
    wrapper!.blur();
  },
};

export const DisabledNoShow: Story = {
  render: () => (
    <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}>
      <Tooltip content="Hidden" placement="top" disabled delay={0}>
        <Button variant="secondary">Disabled tooltip</Button>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = canvas.getByText('Disabled tooltip').closest('span');
    await userEvent.hover(wrapper!);
    await new Promise((r) => setTimeout(r, 50));
    // tooltip element should not exist when disabled
    const tooltip = canvasElement.querySelector('[role="tooltip"]');
    await expect(tooltip).toBeNull();
    await userEvent.unhover(wrapper!);
  },
};
