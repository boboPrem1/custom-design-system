import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['text', 'rect', 'circle'] },
    lines:   { control: { type: 'number', min: 1, max: 8 } },
    width:   { control: 'text' },
    height:  { control: 'number' },
  },
  args: { variant: 'rect', width: 300, height: 80 },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rect: Story = {};
export const Circle: Story = { args: { variant: 'circle', width: 48, height: 48 } };
export const Text: Story = { args: { variant: 'text', width: '100%', lines: 4 } };

export const CardSkeleton: Story = {
  name: 'Carte en chargement',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: 320, padding: 'var(--spacing-4)', border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)' }}>
      <Skeleton variant="rect" width="100%" height={160} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Skeleton variant="circle" width={40} height={40} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          <Skeleton variant="rect" width="60%" height={16} />
          <Skeleton variant="rect" width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
    </div>
  ),
};

export const ListSkeleton: Story = {
  name: 'Liste en chargement',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: 360 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <Skeleton variant="circle" width={40} height={40} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
            <Skeleton variant="rect" height={14} width="70%" />
            <Skeleton variant="rect" height={12} width="45%" />
          </div>
        </div>
      ))}
    </div>
  ),
};
