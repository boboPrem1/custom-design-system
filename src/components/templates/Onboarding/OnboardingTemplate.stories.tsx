import type { Meta, StoryObj } from '@storybook/react-vite';
import { OnboardingTemplate } from './OnboardingTemplate';

/* Input avec label — utilise des champs natifs pour éviter les couplages à l'atom */
const LabeledInput = ({ id, label, placeholder }: { id: string; label: string; placeholder?: string }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
    {label}
    <input
      id={id}
      placeholder={placeholder}
      style={{ height: 40, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border-primary)', padding: '0 12px', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--color-surface-primary)' }}
    />
  </label>
);

const STEPS = [
  {
    id: 'welcome',
    title: 'Bienvenue ! 👋',
    subtitle: 'Configurons votre compte en quelques étapes.',
    content: <p style={{ color: 'var(--color-text-secondary)' }}>Ce processus prend moins de 2 minutes. Vous pouvez revenir à n'importe quelle étape.</p>,
  },
  {
    id: 'profile',
    title: 'Votre profil',
    subtitle: 'Dites-nous qui vous êtes.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <LabeledInput id="ob-name"    label="Nom complet"  placeholder="Jean Dupont"    />
        <LabeledInput id="ob-company" label="Entreprise"   placeholder="Acme Inc."      />
        <LabeledInput id="ob-role"    label="Votre rôle"   placeholder="Lead Frontend"  />
      </div>
    ),
  },
  {
    id: 'preferences',
    title: 'Vos préférences',
    subtitle: 'Configurez votre expérience.',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        {['Emails de bienvenue', 'Résumé hebdomadaire', 'Alertes produit'].map((label) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--spacing-4)', background: 'var(--color-surface-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-primary)' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>{label}</span>
            {/* Toggle natif via checkbox stylisé */}
            <input type="checkbox" defaultChecked style={{ width: 20, height: 20, accentColor: 'var(--color-primary-default)', cursor: 'pointer' }} />
          </div>
        ))}
      </div>
    ),
  },
];

const meta = {
  title: 'Templates/Onboarding',
  component: OnboardingTemplate,
  parameters: { layout: 'fullscreen' },
  args: { steps: STEPS, onSkip: () => {} },
} satisfies Meta<typeof OnboardingTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoSkip: Story = { args: { onSkip: undefined } };
