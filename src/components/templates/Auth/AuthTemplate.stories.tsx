import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthTemplate } from './AuthTemplate';

const meta = {
  title: 'Templates/Auth',
  component: AuthTemplate,
  parameters: { layout: 'fullscreen' },
  args: {
    secondaryLink: { label: 'Mot de passe oublié ?', href: '#' },
    switchLink: { prefix: 'Pas encore de compte ?', label: 'S\'inscrire', href: '#' },
  },
} satisfies Meta<typeof AuthTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story    = { args: { variant: 'login'    } };
export const Register: Story = { args: { variant: 'register', switchLink: { prefix: 'Déjà un compte ?', label: 'Se connecter', href: '#' } } };
export const Reset: Story    = { args: { variant: 'reset',    secondaryLink: undefined } };
export const WithError: Story = { args: { variant: 'login', error: 'Identifiants incorrects. Réessayez.' } };
