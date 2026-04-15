import type { Meta, StoryObj } from '@storybook/react-vite';
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
