import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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
