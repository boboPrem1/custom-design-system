import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorState } from './ErrorState';

const meta = {
  title: 'Organisms/ErrorState',
  component: ErrorState,
  args: {
    code: 404,
    onRetry: () => alert('Retry'),
    onHome:  () => alert('Accueil'),
  },
} satisfies Meta<typeof ErrorState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NotFound: Story    = { args: { code: 404   } };
export const ServerError: Story = { args: { code: 500   } };
export const Network: Story     = { args: { code: 'network'   } };
export const Forbidden: Story   = { args: { code: 'forbidden' } };
export const Custom: Story = {
  args: {
    code: 500,
    title: 'Oups, quelque chose a mal tourné',
    description: 'Notre équipe technique a été notifiée et travaille à résoudre le problème.',
    onRetry: () => alert('Retry'),
  },
};
