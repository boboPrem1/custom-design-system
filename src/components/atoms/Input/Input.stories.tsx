import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { Input } from './Input';
import { ICON_NAMES } from '../Icon';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'search'],
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'disabled', 'readonly'],
    },
    iconLeft:  { control: { type: 'select' }, options: [undefined, ...ICON_NAMES] },
    iconRight: { control: { type: 'select' }, options: [undefined, ...ICON_NAMES] },
  },
  args: {
    placeholder: 'Saisir du texte…',
    type: 'text',
    state: 'default',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: { iconLeft: 'search', iconRight: 'close', placeholder: 'Rechercher…', type: 'search' },
};

export const Error: Story = {
  args: {
    state: 'error',
    errorMessage: 'Ce champ est requis.',
    defaultValue: 'valeur incorrecte',
  },
};

export const Disabled: Story = {
  args: { state: 'disabled', defaultValue: 'Valeur désactivée' },
};

export const ReadOnly: Story = {
  args: { state: 'readonly', defaultValue: 'Valeur en lecture seule' },
};

export const WithHint: Story = {
  args: { hint: 'Minimum 8 caractères, incluant un chiffre.', type: 'password', placeholder: 'Mot de passe' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', maxWidth: 400 }}>
      {([
        { label: 'Default', props: { placeholder: 'Texte…' } },
        { label: 'With icon', props: { iconLeft: 'search' as const, placeholder: 'Rechercher…' } },
        { label: 'Error', props: { state: 'error' as const, errorMessage: 'Champ invalide.', defaultValue: 'oops' } },
        { label: 'Disabled', props: { state: 'disabled' as const, defaultValue: 'Désactivé' } },
        { label: 'Read-only', props: { state: 'readonly' as const, defaultValue: 'Lecture seule' } },
      ]).map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>
            {label}
          </span>
          <Input {...props} />
        </div>
      ))}
    </div>
  ),
};

// ─── 7.3 — Play functions ──────────────────────────────────────────────────────

/** Saisie de texte et vérification de la valeur */
export const TypeText: Story = {
  args: { placeholder: 'Saisir ici…', id: 'input-type-test' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await userEvent.click(input);
    await userEvent.type(input, 'Bonjour le monde');
    await expect(input).toHaveValue('Bonjour le monde');
  },
};

/** Vérification de l'état d'erreur et du message associé */
export const ErrorState: Story = {
  args: {
    state: 'error',
    errorMessage: 'Email invalide.',
    defaultValue: 'pas-un-email',
    type: 'email',
    id: 'input-error-test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    const errorMsg = canvas.getByRole('alert');

    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(errorMsg).toHaveTextContent('Email invalide.');
  },
};

/** Vérification que l'input désactivé est inaccessible */
export const DisabledState: Story = {
  args: { state: 'disabled', defaultValue: 'Non modifiable', id: 'input-disabled-test' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await expect(input).toBeDisabled();
  },
};
