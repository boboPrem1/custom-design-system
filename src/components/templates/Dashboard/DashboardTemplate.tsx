import { type CSSProperties, type ReactNode, useState } from 'react';
import { Navbar } from '../../organisms/Navbar';
import { Sidebar, type SidebarGroup } from '../../organisms/Sidebar';
import { Drawer } from '../../organisms/Drawer';

export interface DashboardTemplateProps {
  /** Contenu principal */
  children?: ReactNode;
  /** Groupes de navigation sidebar */
  sidebarGroups?: SidebarGroup[];
  activeNavId?: string;
  onNavChange?: (id: string) => void;
  /** Info utilisateur sidebar */
  userInfo?: { name: string; role?: string; initials?: string };
  /** Titre de la page courante */
  pageTitle?: string;
  /** Actions dans la topbar */
  navActions?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_GROUPS: SidebarGroup[] = [
  {
    label: 'Principal',
    items: [
      { id: 'dashboard',   label: 'Tableau de bord', icon: 'home'     },
      { id: 'analytics',   label: 'Analytiques',     icon: 'star'     },
      { id: 'reports',     label: 'Rapports',        icon: 'code'     },
    ],
  },
  {
    label: 'Gestion',
    items: [
      { id: 'users',       label: 'Utilisateurs',    icon: 'user'     },
      { id: 'settings',    label: 'Paramètres',      icon: 'settings' },
    ],
  },
];

export const DashboardTemplate = ({
  children,
  sidebarGroups = DEFAULT_GROUPS,
  activeNavId = 'dashboard',
  onNavChange,
  userInfo = { name: 'Jean Dupont', role: 'Admin', initials: 'JD' },
  pageTitle = 'Tableau de bord',
  navActions,
  className,
  style,
}: DashboardTemplateProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState(activeNavId);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const shell: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: 'var(--font-body)',
    background: 'var(--color-surface-secondary)',
    ...style,
  };

  const body: CSSProperties = {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  };

  const main: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: 'var(--spacing-8)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-6)',
  };

  const SidebarNav = (
    <Sidebar
      groups={sidebarGroups}
      activeId={activeId}
      onItemClick={(id) => { setActiveId(id); onNavChange?.(id); setMobileNavOpen(false); }}
      collapsed={collapsed}
      onToggleCollapse={() => setCollapsed((c) => !c)}
      userInfo={userInfo}
      style={{ height: '100%' }}
    />
  );

  return (
    <div className={className} style={shell}>
      <style>{`
        @media (max-width: 768px) {
          .ds-dashboard-sidebar { display: none !important; }
          .ds-dashboard-hamburger { display: flex !important; }
          .ds-dashboard-main { padding: var(--spacing-4) !important; }
          .ds-dashboard-kpi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Topbar */}
      <Navbar
        logoText="Design System"
        sticky
        items={[]}
        actions={
          <>
            {/* Hamburger visible only on mobile via CSS */}
            <button
              className="ds-dashboard-hamburger"
              aria-label="Ouvrir la navigation"
              onClick={() => setMobileNavOpen(true)}
              style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-primary)', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>☰</span>
            </button>
            {navActions}
          </>
        }
      />

      {/* Mobile Drawer */}
      <Drawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        side="left"
        title="Navigation"
      >
        <Sidebar
          groups={sidebarGroups}
          activeId={activeId}
          onItemClick={(id) => { setActiveId(id); onNavChange?.(id); setMobileNavOpen(false); }}
          userInfo={userInfo}
          style={{ boxShadow: 'none', border: 'none', borderRadius: 0 }}
        />
      </Drawer>

      <div style={body}>
        {/* Sidebar — desktop only */}
        <div className="ds-dashboard-sidebar" style={{ height: '100%', display: 'flex' }}>
          {SidebarNav}
        </div>

        {/* Main content */}
        <main className="ds-dashboard-main" style={main} role="main" aria-label={pageTitle}>
          {/* Page header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
            <h1 style={{ margin: 0, fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
              {pageTitle}
            </h1>
          </div>

          {children ?? (
            <div className="ds-dashboard-kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-6)' }}>
              {['Utilisateurs', 'Revenus', 'Taux de conv.'].map((label, i) => (
                <div key={label} style={{ padding: 'var(--spacing-6)', background: 'var(--color-surface-primary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-primary)', boxShadow: 'var(--shadow-sm)' }}>
                  <p style={{ margin: '0 0 var(--spacing-2)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text-primary)' }}>{['2 841', '€ 48 200', '3,2 %'][i]}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
