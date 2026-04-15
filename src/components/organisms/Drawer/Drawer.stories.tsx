import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';
import { Button } from '../../atoms/Button';

const meta = {
  title: 'Organisms/Drawer',
  component: Drawer,
  args: { open: true, title: 'Paramètres', onClose: () => {}, children: <p>Contenu du drawer</p> },
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = { args: { side: 'right' } };
export const Left: Story = { args: { side: 'left' } };
export const Bottom: Story = { args: { side: 'bottom' } };
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [side, setSide] = useState<'right' | 'left' | 'bottom' | null>(null);
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
        {(['right', 'left', 'bottom'] as const).map((s) => (
          <Button key={s} variant="secondary" onClick={() => setSide(s)}>Ouvrir {s}</Button>
        ))}
        {side && (
          <Drawer open side={side} title={`Drawer ${side}`} onClose={() => setSide(null)} footer={<Button variant="primary" onClick={() => setSide(null)}>Fermer</Button>}>
            <p>Contenu du drawer côté {side}.</p>
          </Drawer>
        )}
      </div>
    );
  },
};
