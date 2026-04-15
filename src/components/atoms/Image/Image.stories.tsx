import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './Image';

const meta = {
  title: 'Atoms/Image',
  component: Image,
  argTypes: {
    ratio: { control: { type: 'select' }, options: [undefined, '1:1', '4:3', '16:9', '3:2'] },
    fit:   { control: { type: 'radio' }, options: ['cover', 'contain', 'fill'] },
    lazy:  { control: 'boolean' },
    showSkeleton: { control: 'boolean' },
  },
  args: {
    src: 'https://picsum.photos/seed/ds/800/450',
    alt: 'Image de démonstration',
    ratio: '16:9',
    fit: 'cover',
    lazy: true,
    showSkeleton: true,
    width: 400,
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllRatios: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-4)', width: 600 }}>
      {(['1:1', '4:3', '16:9', '3:2'] as const).map((ratio) => (
        <div key={ratio}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', display: 'block', marginBottom: 'var(--spacing-1)' }}>{ratio}</span>
          <Image
            src={`https://picsum.photos/seed/${ratio.replace(':', '')}/800/600`}
            alt={`Ratio ${ratio}`}
            ratio={ratio}
          />
        </div>
      ))}
    </div>
  ),
};

export const ErrorState: Story = {
  args: { src: 'https://invalid-url/image.png', alt: 'Image invalide' },
};

export const WithoutRatio: Story = {
  args: { ratio: undefined, width: 300 },
};
