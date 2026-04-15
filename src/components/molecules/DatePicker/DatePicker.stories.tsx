import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ width: 280, paddingBottom: 320 }}>
        <DatePicker value={date} onChange={setDate} placeholder="Sélectionner une date" />
      </div>
    );
  },
};

export const WithDefault: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div style={{ width: 280, paddingBottom: 320 }}>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const min = new Date();
    const max = new Date();
    max.setMonth(max.getMonth() + 2);
    return (
      <div style={{ width: 280, paddingBottom: 320 }}>
        <DatePicker value={date} onChange={setDate} minDate={min} maxDate={max} placeholder="Dans les 2 prochains mois" />
      </div>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    return (
      <div style={{ width: 320, paddingBottom: 320 }}>
        <DatePicker
          value={start}
          onChange={setStart}
          rangeEnd={end}
          onRangeEndChange={setEnd}
          range
          placeholder="Sélectionner une plage"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <DatePicker disabled placeholder="Désactivé" />
    </div>
  ),
};
