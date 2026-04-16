import { type CSSProperties, type ReactNode, useState } from 'react';
import { TabBar, type TabBarItem } from '../../organisms/TabBar';
import { Icon, type IconName } from '../../atoms/Icon';

export interface MobileAppTemplateProps {
  /** Titre de l'écran courant */
  screenTitle?: string;
  /** Action gauche header (ex. bouton retour) */
  headerLeft?: ReactNode;
  /** Action droite header */
  headerRight?: ReactNode;
  children?: ReactNode;
  /** Items de la bottom tab bar */
  tabBarItems?: TabBarItem[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  /** Floating action button */
  fab?: { icon: IconName; onClick: () => void; label: string };
  /** Couleur de la status bar simulée */
  statusBarColor?: string;
  showStatusBar?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_TABS: TabBarItem[] = [
  { id: 'home',    label: 'Accueil',   icon: 'home'    },
  { id: 'search',  label: 'Explorer',  icon: 'search'  },
  { id: 'notifs',  label: 'Alertes',   icon: 'bell', badge: 3 },
  { id: 'profile', label: 'Profil',    icon: 'user'    },
];

export const MobileAppTemplate = ({
  screenTitle = 'Accueil',
  headerLeft,
  headerRight,
  children,
  tabBarItems = DEFAULT_TABS,
  activeTabId = 'home',
  onTabChange,
  fab,
  statusBarColor = '#1a1a2e',
  showStatusBar = true,
  className,
  style,
}: MobileAppTemplateProps) => {
  const [activeTab, setActiveTab] = useState(activeTabId);
  const DEVICE_W = 390;
  const DEVICE_H = 844;

  const deviceStyle: CSSProperties = {
    width: DEVICE_W,
    height: DEVICE_H,
    borderRadius: 44,
    background: 'var(--color-surface-primary)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.3), 0 0 0 12px #1c1c1e',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  /* Status bar */
  const statusBarStyle: CSSProperties = {
    height: 44,
    flexShrink: 0,
    background: statusBarColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
  };

  /* App header */
  const appHeaderStyle: CSSProperties = {
    height: 52,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 var(--spacing-4)',
    background: 'var(--color-surface-primary)',
    borderBottom: '1px solid var(--color-border-primary)',
  };

  /* Scrollable content zone */
  const TAB_BAR_H = 56;
  const SAFE_AREA  = 34;

  const contentStyle: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: TAB_BAR_H + SAFE_AREA + 16,
    position: 'relative',
  };

  /* FAB */
  const fabStyle: CSSProperties = {
    position: 'absolute',
    bottom: TAB_BAR_H + SAFE_AREA + 16,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: '50%',
    background: 'var(--color-primary-default)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-lg)',
    border: 'none',
    cursor: 'pointer',
    zIndex: 10,
  };

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-8)', background: 'var(--color-surface-secondary)', minHeight: '100vh' }}>
      <div style={deviceStyle}>
        {/* Status bar */}
        {showStatusBar && (
          <div style={statusBarStyle}>
            <span>{timeStr}</span>
            {/* Notch simulation */}
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: 32, background: '#0d0d0f', borderRadius: '0 0 20px 20px' }} />
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span>●●●</span>
              <span>WiFi</span>
              <span>100%</span>
            </span>
          </div>
        )}

        {/* App header */}
        <div style={appHeaderStyle}>
          <div style={{ width: 40 }}>{headerLeft}</div>
          <h1 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{screenTitle}</h1>
          <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>{headerRight}</div>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          {children ?? (
            <div style={{ padding: 'var(--spacing-6)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ padding: 'var(--spacing-4)', background: 'var(--color-surface-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-primary)' }}>
                  <div style={{ height: 120, background: `hsl(${i * 45},60%,92%)`, borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-3)' }} />
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>Élément {i + 1}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAB */}
        {fab && (
          <button aria-label={fab.label} onClick={fab.onClick} style={fabStyle}>
            <Icon name={fab.icon} size={24} color="#fff" />
          </button>
        )}

        {/* TabBar — position absolute en bas du device */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <TabBar
            items={tabBarItems}
            activeId={activeTab}
            onSelect={(id) => { setActiveTab(id); onTabChange?.(id); }}
            style={{ position: 'relative' }}
          />
          {/* Safe area — home indicator */}
          <div style={{ height: 34, background: 'var(--color-surface-primary)' }} />
        </div>
      </div>
    </div>
  );
};
