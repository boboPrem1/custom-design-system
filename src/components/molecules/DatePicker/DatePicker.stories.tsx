import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { userEvent, within, expect } from 'storybook/test';
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

// ─── Play functions ──────────────────────────────────────────────────────

export const OpenAndSelectDate: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ width: 280, paddingBottom: 360 }}>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    // click to open calendar
    const trigger = canvasElement.querySelector('[role="button"]')!;
    await userEvent.click(trigger);
    // dialog should appear
    const dialog = canvasElement.querySelector('[role="dialog"]');
    await expect(dialog).toBeInTheDocument();
    // click a day button (15th)
    const dayBtns = canvasElement.querySelectorAll('[role="dialog"] button:not(:disabled)');
    const day15 = Array.from(dayBtns).find((b) => b.textContent === '15');
    if (day15) await userEvent.click(day15);
  },
};

export const NavigateMonths: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ width: 280, paddingBottom: 360 }}>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvasElement.querySelector('[role="button"]')!);
    // navigate next month
    const navBtns = canvasElement.querySelectorAll('[role="dialog"] > div:first-child button');
    if (navBtns[1]) await userEvent.click(navBtns[1]); // next
    if (navBtns[0]) await userEvent.click(navBtns[0]); // prev
    // click Aujourd'hui
    const todayBtn = canvas.getByText("Aujourd'hui");
    await userEvent.click(todayBtn);
  },
};

export const ClearDate: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <div style={{ width: 280, paddingBottom: 360 }}>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvasElement.querySelector('[role="button"]')!);
    await userEvent.click(canvas.getByText('Effacer'));
  },
};

export const KeyboardOpen: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div style={{ width: 280, paddingBottom: 360 }}>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector('[role="button"]')!;
    (trigger as HTMLElement).focus();
    await userEvent.keyboard('{Enter}');
    await expect(canvasElement.querySelector('[role="dialog"]')).toBeInTheDocument();
  },
};
