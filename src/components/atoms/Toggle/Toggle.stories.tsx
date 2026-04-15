import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  argTypes: {
    size:          { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] },
    labelPosition: { control: { type: 'radio' }, options: ['left', 'right'] },
    checked:       { control: 'boolean' },
    disabled:      { control: 'boolean' },
    loading:       { control: 'boolean' },
  },
  args: {
    label: 'Activer les notifications',
    size: 'md',
    labelPosition: 'right',
    checked: false,
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = { args: { checked: false } };
export const On: Story = { args: { checked: true } };
export const Loading: Story = { args: { loading: true, checked: true } };
export const Disabled: Story = { args: { disabled: true, label: 'Désactivé' } };
export const LabelLeft: Story = { args: { labelPosition: 'left', checked: true } };

export const Interactive: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onChange={setChecked} />;
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Toggle key={s} size={s} label={`Taille ${s}`} checked />
      ))}
    </div>
  ),
};

export const SettingsGroup: Story = {
  name: 'Groupe de paramètres',
  render: () => {
    const settings = [
      { id: 'notif', label: 'Notifications push' },
      { id: 'email', label: 'E-mails marketing' },
      { id: 'dark',  label: 'Mode sombre' },
      { id: 'beta',  label: 'Fonctionnalités bêta', disabled: true },
    ];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState<Record<string, boolean>>({ notif: true, email: false, dark: true, beta: false });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', maxWidth: 340 }}>
        {settings.map(({ id, label, disabled }) => (
          <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>{label}</span>
            <Toggle
              size="sm"
              checked={state[id]}
              disabled={disabled}
              onChange={(v) => setState((prev) => ({ ...prev, [id]: v }))}
            />
          </div>
        ))}
      </div>
    );
  },
};
