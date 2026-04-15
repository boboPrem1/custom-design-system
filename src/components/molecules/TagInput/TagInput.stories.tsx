import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TagInput } from './TagInput';

const meta = {
  title: 'Molecules/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const TECH_SUGGESTIONS = ['React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Rust', 'Go', 'Docker'];

export const Default: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    return (
      <div style={{ width: 400 }}>
        <TagInput value={tags} onChange={setTags} placeholder="Ajouter un tag (Entrée ou virgule)…" />
      </div>
    );
  },
};

export const WithSuggestions: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['React', 'TypeScript']);
    return (
      <div style={{ width: 400, paddingBottom: 200 }}>
        <TagInput
          value={tags}
          onChange={setTags}
          suggestions={TECH_SUGGESTIONS}
          placeholder="Technologies…"
        />
      </div>
    );
  },
};

export const WithMaxTags: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(['Design', 'Code']);
    return (
      <div style={{ width: 400 }}>
        <TagInput value={tags} onChange={setTags} maxTags={3} placeholder="Max 3 tags…" />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginTop: 'var(--spacing-2)' }}>
          {tags.length}/3 tags utilisés
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <TagInput
        value={['React', 'TypeScript', 'Storybook']}
        disabled
      />
    </div>
  ),
};
