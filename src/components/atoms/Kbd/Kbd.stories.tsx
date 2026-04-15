import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd, KbdCombo } from './Kbd';

const meta = {
  title: 'Atoms/Kbd',
  component: Kbd,
  args: {
    children: 'Enter',
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleKey: Story = {
  args: { children: 'Enter' },
};

export const EscapeKey: Story = {
  args: { children: 'Esc' },
};

export const ComboCtrlK: Story = {
  render: () => <KbdCombo keys={['Cmd', 'K']} />,
};

export const ComboCtrlShiftP: Story = {
  render: () => <KbdCombo keys={['Ctrl', 'Shift', 'P']} />,
};

export const ComboCtrlC: Story = {
  render: () => <KbdCombo keys={['Ctrl', 'C']} />,
};

export const InContext: Story = {
  render: () => (
    <p style={{
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--font-size-base)',
      color: 'var(--color-text-primary)',
      lineHeight: 'var(--line-height-relaxed)',
    }}>
      Appuyez sur <KbdCombo keys={['Cmd', 'K']} /> pour ouvrir la palette de commandes,
      ou <KbdCombo keys={['Ctrl', 'Shift', 'P']} /> sous Windows.
      Utilisez <Kbd>Tab</Kbd> pour naviguer et <Kbd>Esc</Kbd> pour fermer.
    </p>
  ),
};
