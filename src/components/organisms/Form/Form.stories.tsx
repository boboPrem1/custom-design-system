import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
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

export const WithCancel: Story = {
  args: {
    sections: [{ id: 'c', fields: [{ id: 'x', label: 'Nom', required: true }] }],
    cancelLabel: 'Annuler',
    onCancel: () => {},
  },
};

// ─── Play functions ──────────────────────────────────────────────────────

export const SubmitEmpty: Story = {
  args: {
    sections: [{
      id: 'val',
      fields: [
        { id: 'name', label: 'Nom', required: true },
        { id: 'email', label: 'E-mail', type: 'email' as const, required: true },
        { id: 'bio', label: 'Bio', type: 'textarea' as const },
        { id: 'role', label: 'Rôle', type: 'select' as const, required: true, options: [{ value: 'admin', label: 'Admin' }] },
        { id: 'agree', label: 'Accepter', type: 'checkbox' as const, required: true },
      ],
    }],
    submitLabel: 'Envoyer',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // submit without filling → validation errors
    const submitBtn = canvas.getByRole('button', { name: 'Envoyer' });
    await userEvent.click(submitBtn);
    // error summary should appear
    await expect(canvas.getByText(/erreur/i)).toBeInTheDocument();
  },
};

export const FillAndSubmit: Story = {
  args: {
    sections: [{
      id: 'fill',
      fields: [
        { id: 'name', label: 'Nom', required: true },
        { id: 'email', label: 'E-mail', type: 'email' as const, required: true },
        { id: 'bio', label: 'Bio', type: 'textarea' as const, hint: '280 max' },
        { id: 'role', label: 'Rôle', type: 'select' as const, required: true, options: [{ value: 'admin', label: 'Admin' }] },
        { id: 'agree', label: 'Accepter', type: 'checkbox' as const, required: true },
        { id: 'age', label: 'Âge', type: 'number' as const, validate: (v) => Number(v) < 18 ? 'Trop jeune' : undefined },
      ],
    }],
    submitLabel: 'Envoyer',
    onSubmit: async () => { await new Promise((r) => setTimeout(r, 100)); },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // fill all fields
    await userEvent.type(canvas.getByLabelText(/Nom/), 'Jean Dupont');
    await userEvent.type(canvas.getByLabelText(/E-mail/), 'jean@example.com');
    const bio = canvasElement.querySelector('textarea');
    if (bio) await userEvent.type(bio, 'Ma bio');
    const select = canvasElement.querySelector('select');
    if (select) await userEvent.selectOptions(select, 'admin');
    const checkbox = canvasElement.querySelector('input[type="checkbox"]');
    if (checkbox) await userEvent.click(checkbox);
    await userEvent.type(canvas.getByLabelText(/Âge/), '25');
    // submit
    await userEvent.click(canvas.getByRole('button', { name: 'Envoyer' }));
  },
};

export const BlurValidation: Story = {
  args: {
    sections: [{
      id: 'blur',
      fields: [
        { id: 'email', label: 'E-mail', type: 'email' as const, required: true },
        { id: 'pass', label: 'Mot de passe', type: 'password' as const, required: true },
      ],
    }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText(/E-mail/);
    // type invalid email, then blur
    await userEvent.type(emailInput, 'bad');
    await userEvent.tab();
    // password field: focus and blur empty
    const passInput = canvas.getByLabelText(/Mot de passe/);
    await userEvent.click(passInput);
    await userEvent.tab();
  },
};
