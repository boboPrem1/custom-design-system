import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from './Form';

const meta = {
  title: 'Organisms/Form',
  component: Form,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Form>;
export default meta;
type Story = StoryObj<typeof meta>;

const PROFILE_SECTIONS = [
  {
    id: 'identity',
    title: 'Informations personnelles',
    description: 'Vos informations de profil publiques.',
    fields: [
      { id: 'firstName', label: 'Prénom', required: true, placeholder: 'Jean' },
      { id: 'lastName',  label: 'Nom',    required: true, placeholder: 'Dupont' },
      { id: 'email',     label: 'E-mail', type: 'email' as const, required: true, placeholder: 'jean@exemple.com' },
      { id: 'bio',       label: 'Bio',    type: 'textarea' as const, placeholder: 'Parlez-nous de vous…', hint: 'Max 280 caractères.' },
    ],
  },
  {
    id: 'preferences',
    title: 'Préférences',
    description: 'Configurez vos préférences de compte.',
    fields: [
      { id: 'role', label: 'Rôle', type: 'select' as const, required: true, options: [
        { value: 'admin',  label: 'Administrateur' },
        { value: 'editor', label: 'Éditeur' },
        { value: 'reader', label: 'Lecteur' },
      ]},
      { id: 'newsletter', label: 'Recevoir la newsletter hebdomadaire', type: 'checkbox' as const, defaultValue: true },
    ],
  },
];

export const ProfileForm: Story = {
  args: {
    sections: PROFILE_SECTIONS,
    submitLabel: 'Enregistrer le profil',
    cancelLabel: 'Annuler',
    onSubmit: async (values) => {
      await new Promise((r) => setTimeout(r, 1200));
      alert(JSON.stringify(values, null, 2));
    },
  },
};

export const LoginForm: Story = {
  args: {
    sections: [{
      id: 'login',
      fields: [
        { id: 'email',    label: 'E-mail',      type: 'email'    as const, required: true, placeholder: 'vous@exemple.com' },
        { id: 'password', label: 'Mot de passe', type: 'password' as const, required: true, placeholder: '••••••••', hint: 'Au moins 8 caractères.' },
        { id: 'remember', label: 'Se souvenir de moi', type: 'checkbox' as const },
      ],
    }],
    submitLabel: 'Se connecter',
  },
};

export const ValidationErrors: Story = {
  args: {
    sections: [{
      id: 'errors',
      title: 'Formulaire avec validation',
      fields: [
        { id: 'name',     label: 'Nom complet', required: true },
        { id: 'email',    label: 'E-mail',       type: 'email' as const, required: true },
        { id: 'age',      label: 'Âge',          type: 'number' as const, validate: (v) => Number(v) < 18 ? 'Vous devez avoir au moins 18 ans.' : undefined },
        { id: 'terms',    label: 'Accepter les conditions', type: 'checkbox' as const, required: true },
      ],
    }],
    submitLabel: 'Valider',
  },
};
