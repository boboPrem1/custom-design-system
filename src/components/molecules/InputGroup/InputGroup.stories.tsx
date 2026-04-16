import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { InputGroup } from './InputGroup';

const meta = {
  title: 'Molecules/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrefixText: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <InputGroup prefix={{ type: 'text', content: 'https://' }} placeholder="votresite.com" />
    </div>
  ),
};

export const SuffixText: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <InputGroup suffix={{ type: 'text', content: '.com' }} placeholder="votresite" />
    </div>
  ),
};

export const PrefixIcon: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <InputGroup prefix={{ type: 'icon', name: 'mail' }} placeholder="Email" type="email" />
    </div>
  ),
};

export const SuffixButton: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <InputGroup
        placeholder="Entrez un code promo"
        suffix={{ type: 'button', content: 'Appliquer', onClick: () => alert('Appliqué!') }}
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <InputGroup
        prefix={{ type: 'text', content: 'https://' }}
        defaultValue="site invalide!"
        errorMessage="URL invalide"
      />
    </div>
  ),
};

export const BothSides: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <InputGroup
        prefix={{ type: 'text', content: '€' }}
        suffix={{ type: 'text', content: 'HT' }}
        placeholder="0.00"
        type="number"
        hint="Prix hors taxes"
      />
    </div>
  ),
};

// ─── Play functions ──────────────────────────────────────────────────────

export const TypeAndClickButton: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <InputGroup
        placeholder="Code promo"
        suffix={{ type: 'button', content: 'Appliquer', onClick: () => {} }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Code promo');
    await userEvent.type(input, 'PROMO2024');
    await userEvent.click(canvas.getByText('Appliquer'));
  },
};
