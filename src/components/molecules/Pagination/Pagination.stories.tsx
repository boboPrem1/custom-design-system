import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { userEvent, within, expect } from 'storybook/test';
import { Pagination } from './Pagination';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return <Pagination page={page} totalPages={5} onPageChange={setPage} />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(7);
    return <Pagination page={page} totalPages={50} onPageChange={setPage} siblingCount={2} />;
  },
};

export const Compact: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return <Pagination page={page} totalPages={20} onPageChange={setPage} compact />;
  },
};

export const FirstPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const LastPage: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
};

// ─── Play functions ──────────────────────────────────────────────────────

export const ClickPages: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(1);
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // click page 2 (always visible when on page 1)
    await userEvent.click(canvas.getByLabelText('Page 2'));
    // click next
    await userEvent.click(canvas.getByLabelText('Page suivante'));
    // click prev
    await userEvent.click(canvas.getByLabelText('Page précédente'));
  },
};

export const CompactNav: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(5);
    return <Pagination page={page} totalPages={20} onPageChange={setPage} compact />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText('Page suivante'));
    await userEvent.click(canvas.getByLabelText('Page précédente'));
    await userEvent.click(canvas.getByLabelText('Page précédente'));
  },
};
