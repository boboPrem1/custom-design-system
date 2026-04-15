import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const FRUITS: import('./Select').SelectItem[] = [
  { value: 'apple',  label: 'Pomme' },
  { value: 'banana', label: 'Banane' },
  { value: 'cherry', label: 'Cerise' },
  { value: 'mango',  label: 'Mangue' },
];

const GROUPED: import('./Select').SelectItem[] = [
  {
    groupLabel: 'Fruits',
    options: [
      { value: 'apple',  label: 'Pomme' },
      { value: 'banana', label: 'Banane' },
    ],
  },
  {
    groupLabel: 'Légumes',
    options: [
      { value: 'carrot',  label: 'Carotte' },
      { value: 'spinach', label: 'Épinard', disabled: true },
    ],
  },
];

const meta = {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    disabled: { control: 'boolean' },
    isError:  { control: 'boolean' },
  },
  args: {
    options: FRUITS,
    placeholder: 'Choisir un fruit…',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithGroups: Story = {
  args: { options: GROUPED, placeholder: 'Choisir un aliment…' },
};

export const Error: Story = {
  args: { isError: true, errorMessage: 'Veuillez sélectionner une option.' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'apple' },
};

export const WithHint: Story = {
  args: { hint: 'Vous pouvez modifier ce choix ultérieurement.' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', maxWidth: 400 }}>
      {([
        { label: 'Default', props: {} },
        { label: 'Error', props: { isError: true, errorMessage: 'Champ requis.' } },
        { label: 'Disabled', props: { disabled: true, defaultValue: 'banana' } },
      ] as const).map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>{label}</span>
          <Select options={FRUITS} placeholder="Choisir…" {...props} />
        </div>
      ))}
    </div>
  ),
};
