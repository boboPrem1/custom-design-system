import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { PresentationTemplate, type Slide } from './PresentationTemplate';

const ALL_LAYOUTS: Slide[] = [
  { id: 'title', layout: 'title', title: 'Title Slide', subtitle: 'Subtitle here' },
  { id: 'content', layout: 'content', title: 'Content', subtitle: 'Sub', content: <p>Content body</p> },
  { id: 'data', layout: 'data', title: 'Data', data: [{ label: 'Comp', value: 42, color: '#6C63FF' }, { label: 'Tests', value: '100%' }] },
  { id: 'image', layout: 'image', title: 'Image', subtitle: 'Caption' },
  { id: 'image-src', layout: 'image', imageSrc: 'https://via.placeholder.com/800x450', imageAlt: 'Placeholder' },
  { id: 'split', layout: 'split', title: 'Split', subtitle: 'Half', content: <p>Left content</p> },
  { id: 'split-img', layout: 'split', title: 'Split Image', imageSrc: 'https://via.placeholder.com/400x450', imageAlt: 'Split' },
];

const meta = {
  title: 'Templates/Presentation',
  component: PresentationTemplate,
  parameters: { layout: 'centered' },
  args: { logoText: 'Design System' },
} satisfies Meta<typeof PresentationTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoProgressBar: Story = { args: { showProgressBar: false } };
export const CustomColor: Story = { args: { primaryColor: '#20d4a0' } };

export const AllLayouts: Story = {
  args: { slides: ALL_LAYOUTS },
};

// ─── Play functions ──────────────────────────────────────────────────────

export const NavigateSlides: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // click → to go to next slide
    const nextBtn = canvas.getByText('→');
    await userEvent.click(nextBtn);
    await expect(canvas.getByText('2 / 3')).toBeInTheDocument();
    // click ← to go back
    const prevBtn = canvas.getByText('←');
    await userEvent.click(prevBtn);
    await expect(canvas.getByText('1 / 3')).toBeInTheDocument();
  },
};

export const ClickThumbnail: Story = {
  args: { slides: ALL_LAYOUTS },
  play: async ({ canvasElement }) => {
    // click 3rd dot to jump to data slide
    const dots = canvasElement.querySelectorAll('button[style*="border-radius: 50%"]');
    if (dots[2]) await userEvent.click(dots[2]);
    // click slide title button
    const titleBtns = canvasElement.querySelectorAll('button[style*="border-radius: var(--radius-full)"]');
    if (titleBtns[4]) await userEvent.click(titleBtns[4]);
  },
};

export const NavigateAllLayouts: Story = {
  args: { slides: ALL_LAYOUTS },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nextBtn = canvas.getByText('→');
    // navigate through all slides to render each layout
    for (let i = 0; i < ALL_LAYOUTS.length - 1; i++) {
      await userEvent.click(nextBtn);
    }
  },
};
