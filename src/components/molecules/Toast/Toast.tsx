import {
  type CSSProperties,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Icon } from '../../atoms/Icon';

export type ToastSemantic = 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type ToastPlacement = 'top' | 'bottom';

export interface ToastItem {
  id: string;
  message: ReactNode;
  semantic?: ToastSemantic;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

const SEMANTIC_MAP: Record<ToastSemantic, { bg: string; color: string; iconColor: string; icon: 'info' | 'check' | 'warning' | 'bell' }> = {
  info:    { bg: 'var(--color-neutral-900)', color: '#fff', iconColor: 'var(--color-semantic-info-default)',    icon: 'info' },
  success: { bg: 'var(--color-neutral-900)', color: '#fff', iconColor: 'var(--color-semantic-success-default)', icon: 'check' },
  warning: { bg: 'var(--color-neutral-900)', color: '#fff', iconColor: 'var(--color-semantic-warning-default)', icon: 'warning' },
  error:   { bg: 'var(--color-neutral-900)', color: '#fff', iconColor: 'var(--color-semantic-error-default)',   icon: 'warning' },
  neutral: { bg: 'var(--color-neutral-900)', color: '#fff', iconColor: 'var(--color-text-inverse)',             icon: 'bell' },
};

interface ToastContextType {
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
  removeToast: () => {},
});

export const useToast = () => useContext(ToastContext);

const ToastCard = ({
  item,
  onRemove,
}: {
  item: ToastItem;
  onRemove: (id: string) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const s = SEMANTIC_MAP[item.semantic ?? 'neutral'];

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    if (item.duration !== 0) {
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onRemove(item.id), 300);
      }, item.duration ?? 4000);
    }
    return () => clearTimeout(timerRef.current);
  }, []);

  const cardStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-3) var(--spacing-4)',
    borderRadius: 'var(--radius-lg)',
    background: s.bg,
    color: s.color,
    boxShadow: 'var(--shadow-xl)',
    minWidth: 280,
    maxWidth: 420,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(8px)',
    transition: 'opacity var(--motion-duration-base) var(--motion-easing-ease-out), transform var(--motion-duration-base) var(--motion-easing-ease-out)',
    pointerEvents: 'auto',
  };

  return (
    <div role="status" aria-live="polite" style={cardStyle}>
      <Icon name={s.icon} size={20} color={s.iconColor} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)' }}>
        {item.message}
      </span>
      {item.action && (
        <button
          type="button"
          onClick={item.action.onClick}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary-300)', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' as unknown as number, padding: 0, flexShrink: 0 }}
        >
          {item.action.label}
        </button>
      )}
      <button
        type="button"
        aria-label="Fermer"
        onClick={() => { setVisible(false); setTimeout(() => onRemove(item.id), 300); }}
        style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}
      >
        <Icon name="close" size={16} />
      </button>
    </div>
  );
};

export interface ToastProviderProps {
  children: ReactNode;
  placement?: ToastPlacement;
  maxToasts?: number;
}

export const ToastProvider = ({
  children,
  placement = 'bottom',
  maxToasts = 5,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => {
      const next = [{ ...toast, id }, ...prev];
      return next.slice(0, maxToasts);
    });
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const portalStyle: CSSProperties = {
    position: 'fixed',
    ...(placement === 'bottom' ? { bottom: 'var(--spacing-6)' } : { top: 'var(--spacing-6)' }),
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: placement === 'bottom' ? 'column-reverse' : 'column',
    gap: 'var(--spacing-2)',
    zIndex: 9999,
    pointerEvents: 'none',
    alignItems: 'center',
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div aria-live="polite" aria-atomic="false" style={portalStyle}>
        {toasts.map((t) => (
          <ToastCard key={t.id} item={t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export interface ToastDemoProps {
  toasts: ToastItem[];
  placement?: ToastPlacement;
}

export const ToastStack = ({ toasts, placement = 'bottom' }: ToastDemoProps) => {
  const [items, setItems] = useState<ToastItem[]>(toasts);

  const portalStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: placement === 'bottom' ? 'column-reverse' : 'column',
    gap: 'var(--spacing-2)',
    alignItems: 'flex-start',
    padding: 'var(--spacing-4)',
  };

  return (
    <div style={portalStyle}>
      {items.map((t) => (
        <ToastCard key={t.id} item={t} onRemove={(id) => setItems((p) => p.filter((x) => x.id !== id))} />
      ))}
    </div>
  );
};
