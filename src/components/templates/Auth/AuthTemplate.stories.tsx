import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
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
export const NoSwitchLink: Story = { args: { variant: 'login', switchLink: undefined } };

// ─── Play functions ──────────────────────────────────────────────────────

export const FillLogin: Story = {
  args: { variant: 'login', onSubmit: async () => {} },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('jean@exemple.fr'), 'test@example.com');
    await userEvent.type(canvas.getByPlaceholderText('••••••••'), 'password123');
    await userEvent.click(canvas.getByText('Se connecter'));
  },
};

export const FillRegister: Story = {
  args: { variant: 'register', onSubmit: async () => {} },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('Jean Dupont'), 'Alice Martin');
    await userEvent.type(canvas.getByPlaceholderText('jean@exemple.fr'), 'alice@example.com');
    const passwordFields = canvasElement.querySelectorAll('input[type="password"]');
    await userEvent.type(passwordFields[0], 'mypassword');
    await userEvent.type(passwordFields[1], 'mypassword');
    const submitBtn = canvasElement.querySelector('button[type="submit"]') as HTMLElement;
    await userEvent.click(submitBtn);
  },
};

export const RegisterMismatch: Story = {
  args: { variant: 'register' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('Jean Dupont'), 'Test');
    await userEvent.type(canvas.getByPlaceholderText('jean@exemple.fr'), 'a@b.com');
    const passwordFields = canvasElement.querySelectorAll('input[type="password"]');
    await userEvent.type(passwordFields[0], 'pass1');
    await userEvent.type(passwordFields[1], 'pass2');
    const submitBtn = canvasElement.querySelector('button[type="submit"]') as HTMLElement;
    await userEvent.click(submitBtn);
    await expect(canvas.getByText('Les mots de passe ne correspondent pas.')).toBeInTheDocument();
  },
};

export const FillReset: Story = {
  args: { variant: 'reset', onSubmit: async () => {} },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('jean@exemple.fr'), 'reset@example.com');
    await userEvent.click(canvas.getByText('Envoyer le lien'));
  },
};
