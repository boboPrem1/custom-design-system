import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../../atoms/Icon';

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  range?: boolean;
  rangeEnd?: Date | null;
  onRangeEndChange?: (date: Date | null) => void;
  onChange?: (date: Date | null) => void;
  className?: string;
  style?: CSSProperties;
}

const DAYS = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDate = (d: Date | null | undefined) => {
  if (!d) return '';
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const DatePicker = ({
  value: valueProp,
  defaultValue = null,
  minDate,
  maxDate,
  placeholder = 'jj/mm/aaaa',
  disabled = false,
  range = false,
  rangeEnd,
  onRangeEndChange,
  onChange,
  className,
  style,
}: DatePickerProps) => {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState<Date | null>(defaultValue);
  const value = isControlled ? valueProp! : internal;

  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState<Date>(() => value ?? new Date());
  const [hovered, setHovered] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = (d: Date | null) => {
    if (!isControlled) setInternal(d);
    onChange?.(d);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getDaysInMonth = useCallback((year: number, month: number) => {
    const first = new Date(year, month, 1);
    const dayOfWeek = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid: (Date | null)[] = Array(dayOfWeek).fill(null);
    for (let d = 1; d <= daysInMonth; d++) grid.push(new Date(year, month, d));
    while (grid.length % 7 !== 0) grid.push(null);
    return grid;
  }, []);

  const days = getDaysInMonth(cursor.getFullYear(), cursor.getMonth());

  const isDisabledDate = (d: Date) =>
    (minDate && d < minDate) || (maxDate && d > maxDate) || false;

  const isInRange = (d: Date) => {
    if (!range || !value || !rangeEnd) return false;
    const start = value < rangeEnd ? value : rangeEnd;
    const end = value < rangeEnd ? rangeEnd : value;
    return d > start && d < end;
  };

  const isHoverRange = (d: Date) => {
    if (!range || !value || rangeEnd || !hovered) return false;
    const start = value < hovered ? value : hovered;
    const end = value < hovered ? hovered : value;
    return d >= start && d <= end;
  };

  const inputStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    padding: '0 var(--spacing-3)',
    borderRadius: 'var(--radius-md)',
    border: `1.5px solid ${open ? 'var(--color-border-focus)' : 'var(--color-border-primary)'}`,
    background: disabled ? 'var(--color-surface-tertiary)' : 'var(--color-surface-primary)',
    boxShadow: open ? '0 0 0 3px rgba(108,99,255,0.18)' : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-base)',
    color: value ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
    userSelect: 'none',
    transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out), box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out)',
  };

  const popupStyle: CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    background: 'var(--color-surface-primary)',
    border: '1.5px solid var(--color-border-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-xl)',
    zIndex: 1000,
    padding: 'var(--spacing-4)',
    minWidth: 280,
    userSelect: 'none',
  };

  const navBtnStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 'var(--radius-md)',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'var(--color-text-secondary)',
  };

  const dayBtnStyle = (d: Date | null): CSSProperties => {
    if (!d) return {};
    const isSelected = value && isSameDay(d, value);
    const isRangeEnd = range && rangeEnd && isSameDay(d, rangeEnd);
    const isRanged = isInRange(d) || isHoverRange(d);
    const isDisabled = isDisabledDate(d);
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      borderRadius: (isSelected || isRangeEnd) ? '50%' : isRanged ? 0 : 'var(--radius-md)',
      border: 'none',
      background: (isSelected || isRangeEnd)
        ? 'var(--color-primary-default)'
        : isRanged
        ? 'var(--color-primary-50)'
        : 'none',
      color: (isSelected || isRangeEnd)
        ? '#fff'
        : isDisabled
        ? 'var(--color-text-disabled)'
        : 'var(--color-text-primary)',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--font-size-sm)',
      opacity: isDisabled ? 0.4 : 1,
    };
  };

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative', ...style }}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={inputStyle}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={(e) => e.key === 'Enter' && !disabled && setOpen((o) => !o)}
      >
        <span>{value ? formatDate(value) : placeholder}{range && rangeEnd ? ` → ${formatDate(rangeEnd)}` : ''}</span>
        <Icon name="arrow_right" size={16} color="var(--color-text-tertiary)" style={{ transform: 'rotate(90deg)' }} />
      </div>

      {open && (
        <div role="dialog" aria-label="Calendrier" style={popupStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-3)' }}>
            <button style={navBtnStyle} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
              <Icon name="arrow_left" size={16} />
            </button>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' as unknown as number, color: 'var(--color-text-primary)' }}>
              {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
            </span>
            <button style={navBtnStyle} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
              <Icon name="arrow_right" size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', gap: 0 }}>
            {DAYS.map((d) => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 32, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-medium)' as unknown as number, color: 'var(--color-text-tertiary)' }}>
                {d}
              </div>
            ))}
            {days.map((d, i) => (
              <div key={i}>
                {d ? (
                  <button
                    style={dayBtnStyle(d)}
                    disabled={isDisabledDate(d)}
                    onClick={() => {
                      if (range && value && !rangeEnd) {
                        onRangeEndChange?.(d);
                        setOpen(false);
                      } else {
                        update(d);
                        if (!range) setOpen(false);
                      }
                    }}
                    onMouseEnter={() => setHovered(d)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {d.getDate()}
                  </button>
                ) : (
                  <div style={{ width: 36, height: 36 }} />
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-3)', paddingTop: 'var(--spacing-3)', borderTop: '1px solid var(--color-border-primary)' }}>
            <button
              style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => { update(null); onRangeEndChange?.(null); setOpen(false); }}
            >
              Effacer
            </button>
            <button
              style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-primary-default)', fontWeight: 'var(--font-weight-medium)' as unknown as number, background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => { update(new Date()); setOpen(false); }}
            >
              Aujourd'hui
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
