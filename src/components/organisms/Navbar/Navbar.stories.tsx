import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './Navbar';
import { Avatar } from '../../atoms/Avatar';

const NAV_ITEMS = [
  { label: 'Accueil',     href: '#', icon: 'home'     as const, active: true  },
  { label: 'Composants',  href: '#', icon: 'settings' as const               },
  { label: 'Tokens',      href: '#', icon: 'code'     as const               },
  { label: 'Changelog',   href: '#'                                           },
];

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: { layout: 'fullscreen' },
  args: { items: NAV_ITEMS, logoText: 'Design System' },
} satisfies Meta<typeof Navbar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Avatar size="sm" initials="JD" status="online" />
      </>
    ),
  },
};
export const Sticky: Story = { args: { sticky: true } };
export const MinimalLinks: Story = { args: { items: [{ label: 'Docs', href: '#' }, { label: 'Blog', href: '#' }] } };
