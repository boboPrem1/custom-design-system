import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    size:   { control: { type: 'select' }, options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    status: { control: { type: 'select' }, options: [undefined, 'online', 'offline', 'away', 'busy'] },
  },
  args: { initials: 'AB', size: 'md' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInitials: Story = { args: { initials: 'JD' } };
export const WithImage: Story = { args: { src: 'https://i.pravatar.cc/150?img=3', alt: 'Jane Doe' } };
export const Fallback: Story = { args: { initials: undefined, src: undefined } };
export const WithStatus: Story = { args: { initials: 'JD', status: 'online' } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Avatar initials="JD" size={s} status="online" />
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
      {(['online', 'offline', 'away', 'busy'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Avatar initials="JD" size="md" status={s} />
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup
      size="md"
      max={4}
      avatars={[
        { initials: 'AB' },
        { src: 'https://i.pravatar.cc/150?img=1', alt: 'User 1' },
        { initials: 'CD' },
        { src: 'https://i.pravatar.cc/150?img=2', alt: 'User 2' },
        { initials: 'EF' },
        { initials: 'GH' },
      ]}
    />
  ),
};
