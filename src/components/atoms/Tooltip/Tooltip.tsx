import {
  type CSSProperties,
  type ReactNode,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  /** Délai avant apparition en ms */
  delay?: number;
  /** Largeur max du tooltip */
  maxWidth?: number;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const OFFSET = 8;

const getTranslate = (placement: TooltipPlacement): string => ({
  top:    'translateX(-50%) translateY(-4px)',
  bottom: 'translateX(-50%) translateY(4px)',
  left:   'translateY(-50%) translateX(-4px)',
  right:  'translateY(-50%) translateX(4px)',
}[placement]);

const getPlacementStyle = (placement: TooltipPlacement): CSSProperties => ({
  top: {
    bottom: `calc(100% + ${OFFSET}px)`,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  bottom: {
    top: `calc(100% + ${OFFSET}px)`,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  left: {
    right: `calc(100% + ${OFFSET}px)`,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  right: {
    left: `calc(100% + ${OFFSET}px)`,
    top: '50%',
    transform: 'translateY(-50%)',
  },
}[placement] as CSSProperties);

export const Tooltip = ({
  content,
  placement = 'top',
  delay = 300,
  maxWidth = 280,
  disabled = false,
  children,
  className,
  style,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay, disabled]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const tooltipStyle: CSSProperties = {
    position: 'absolute',
    zIndex: 9999,
    padding: '8px 12px',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-neutral-900)',
    color: 'var(--color-text-inverse)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-xs)',
    lineHeight: 'var(--line-height-normal)',
    maxWidth,
    minWidth: 'min-content',
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
    pointerEvents: 'none',
    boxShadow: 'var(--shadow-md)',
    opacity: visible ? 1 : 0,
    transform: visible ? getPlacementStyle(placement).transform as string : getTranslate(placement),
    transition: `opacity var(--motion-duration-fast) var(--motion-easing-ease-out),
                 transform var(--motion-duration-fast) var(--motion-easing-ease-out)`,
    ...getPlacementStyle(placement),
  };

  return (
    <span
      className={className}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {!disabled && (
        <span role="tooltip" style={tooltipStyle} aria-hidden={!visible}>
          {content}
        </span>
      )}
    </span>
  );
};
