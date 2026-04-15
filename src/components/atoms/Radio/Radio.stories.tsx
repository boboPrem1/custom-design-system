import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './Radio';

const meta = {
  title: 'Atoms/Radio',
  component: RadioGroup,
  argTypes: {
    direction: { control: { type: 'radio' }, options: ['vertical', 'horizontal'] },
    disabled:  { control: 'boolean' },
  },
  args: {
    name: 'demo',
    direction: 'vertical',
    disabled: false,
    options: [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' },
    ],
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('a');
    return <RadioGroup {...args} value={value} onChange={setValue} />;
  },
};

export const Horizontal: Story = {
  args: { direction: 'horizontal' },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('a');
    return <RadioGroup {...args} value={value} onChange={setValue} />;
  },
};

export const WithDisabledOption: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('a');
    return (
      <RadioGroup
        name="plan"
        value={value}
        onChange={setValue}
        options={[
          { value: 'free', label: 'Gratuit' },
          { value: 'pro', label: 'Pro' },
          { value: 'enterprise', label: 'Enterprise (indisponible)', disabled: true },
        ]}
      />
    );
  },
};

export const GroupDisabled: Story = {
  args: { disabled: true },
  args: { disabled: true, options: [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]},
  render: (args) => <RadioGroup {...args} defaultValue="a" />,
};

export const SingleRadio: Story = {
  name: 'Radio individuel',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);
    return (
      <Radio
        name="single"
        label="Je suis un radio seul"
        checked={checked}
        onChange={() => setChecked(true)}
      />
    );
  },
};
