import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPalette } from './ColorPalette';

const meta = {
  title: 'Graphic/ColorPalette',
  component: ColorPalette,
  parameters: { layout: 'fullscreen' },
  args: {
    colors: {
      primary: [
        { name: 'Primary 50',  hex: '#f5f3ff', variable: '--color-primary-50' },
        { name: 'Primary 100', hex: '#ede9fe', variable: '--color-primary-100' },
        { name: 'Primary 500', hex: '#6C63FF', variable: '--color-primary-500' },
        { name: 'Primary 700', hex: '#4c1d95', variable: '--color-primary-700' },
      ],
      semantic: [
        { name: 'Success', hex: '#10b981', variable: '--color-semantic-success-default' },
        { name: 'Error',   hex: '#ef4444', variable: '--color-semantic-error-default' },
        { name: 'Warning', hex: '#f59e0b', variable: '--color-semantic-warning-default' },
        { name: 'Info',    hex: '#3b82f6', variable: '--color-semantic-info-default' },
      ],
      neutral: [
        { name: 'Neutral 100', hex: '#f3f4f6', variable: '--color-neutral-100' },
        { name: 'Neutral 500', hex: '#6b7280', variable: '--color-neutral-500' },
        { name: 'Neutral 900', hex: '#111827', variable: '--color-neutral-900' },
      ],
    },
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
