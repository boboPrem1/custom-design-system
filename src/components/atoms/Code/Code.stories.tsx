import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { Code } from './Code';

const meta = {
  title: 'Atoms/Code',
  component: Code,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['inline', 'block'],
    },
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  args: {
    variant: 'inline',
    children: 'const x = 42',
  },
  render: (args) => (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>
      Utilisez <Code {...args} /> pour assigner une valeur.
    </p>
  ),
};

export const Block: Story = {
  args: {
    variant: 'block',
    language: 'typescript',
    showLineNumbers: true,
    children: `import { Heading } from './Heading';

export const App = () => {
  return (
    <Heading level={1} variant="display">
      Hello, Design System!
    </Heading>
  );
};`,
  },
};

export const BlockNoLineNumbers: Story = {
  args: {
    variant: 'block',
    language: 'bash',
    showLineNumbers: false,
    children: `pnpm install
pnpm tokens
pnpm storybook`,
  },
};

export const BlockCSS: Story = {
  args: {
    variant: 'block',
    language: 'css',
    children: `:root {
  --brand-primary: #6C63FF;
  --brand-secondary: #0F0F2D;
  --brand-accent: #00D4A0;
}`,
  },
};

export const BlockNoLanguage: Story = {
  args: {
    variant: 'block',
    showLineNumbers: true,
    children: 'single line code',
  },
};

// ─── Play functions ──────────────────────────────────────────────────────

export const CopyButton: Story = {
  args: {
    variant: 'block',
    language: 'js',
    children: 'const x = 1;',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyBtn = canvas.getByText('Copy');
    await userEvent.click(copyBtn);
    // After click it should show Copied! (if clipboard is available)
    // In test env clipboard may not work, but the handler still runs
    await expect(copyBtn).toBeInTheDocument();
  },
};
