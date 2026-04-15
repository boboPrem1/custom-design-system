import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  argTypes: {
    autoResize:   { control: 'boolean' },
    maxCharCount: { control: 'number' },
    disabled:     { control: 'boolean' },
    readOnly:     { control: 'boolean' },
    isError:      { control: 'boolean' },
  },
  args: {
    placeholder: 'Saisir un message…',
    autoResize: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AutoResize: Story = {
  args: { autoResize: true, placeholder: 'Tapez pour voir le redimensionnement automatique…' },
};

export const WithCharCount: Story = {
  name: 'Compteur de caractères',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');
    return (
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxCharCount={200}
        placeholder="Votre message (200 caractères max)…"
      />
    );
  },
};

export const Error: Story = {
  args: {
    isError: true,
    errorMessage: 'Le message est trop court.',
    defaultValue: 'ok',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Ce champ est désactivé.' },
};

export const WithHint: Story = {
  args: { hint: 'Décrivez votre besoin en quelques phrases.', rows: 4 },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', maxWidth: 480 }}>
      {([
        { label: 'Default', props: { placeholder: 'Texte…' } },
        { label: 'Error', props: { isError: true, errorMessage: 'Champ invalide.', defaultValue: 'texte' } },
        { label: 'Disabled', props: { disabled: true, defaultValue: 'Désactivé' } },
        { label: 'Read-only', props: { readOnly: true, defaultValue: 'Lecture seule' } },
      ] as const).map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
          <Textarea {...props} rows={3} />
        </div>
      ))}
    </div>
  ),
};
