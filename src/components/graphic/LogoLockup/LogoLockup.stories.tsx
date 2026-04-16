import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoLockup } from './LogoLockup';

const meta = {
  title: 'Graphic/LogoLockup',
  component: LogoLockup,
  parameters: { layout: 'fullscreen' },
  args: {},
} satisfies Meta<typeof LogoLockup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomBrand: Story = {
  args: { brandName: 'Acme Corp', brandColor: '#ef4444' }
};
