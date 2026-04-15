import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Adresse email',
    placeholder: 'vous@exemple.com',
    type: 'email',
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

export const WithHint: Story = {
  args: {
    hint: 'Nous ne partagerons jamais votre adresse.',
  },
};

export const WithError: Story = {
  args: {
    errorMessage: 'Adresse email invalide.',
    defaultValue: 'pas-un-email',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'désactivé@exemple.com',
  },
};

export const AllFields: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', maxWidth: 400 }}>
      <FormField label="Prénom" placeholder="Jean" required />
      <FormField label="Nom" placeholder="Dupont" required />
      <FormField label="Email" placeholder="jean.dupont@exemple.com" type="email" hint="Votre email principal" />
      <FormField label="Téléphone" placeholder="+33 6 00 00 00 00" type="tel" />
      <FormField label="Message désactivé" defaultValue="Lecture seule" disabled />
    </div>
  ),
};
