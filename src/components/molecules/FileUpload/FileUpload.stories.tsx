import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FileUpload, type UploadFile } from './FileUpload';

const meta = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);
    const handleFiles = (newFiles: File[]) => {
      const mapped: UploadFile[] = newFiles.map((f) => ({
        id: Math.random().toString(36).slice(2),
        name: f.name,
        size: f.size,
        progress: 100,
      }));
      setFiles((prev) => [...prev, ...mapped]);
    };
    return (
      <div style={{ maxWidth: 480 }}>
        <FileUpload
          files={files}
          onFilesChange={handleFiles}
          onRemoveFile={(id) => setFiles((p) => p.filter((f) => f.id !== id))}
          accept=".jpg,.png,.pdf"
          maxSize={5 * 1024 * 1024}
        />
      </div>
    );
  },
};

export const WithProgress: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <FileUpload
        files={[
          { id: '1', name: 'rapport-annuel.pdf', size: 2048000, progress: 72 },
          { id: '2', name: 'photo-couverture.jpg', size: 512000, progress: 100 },
          { id: '3', name: 'video.mp4', size: 104857600, error: 'Fichier trop volumineux (max 5 Mo)' },
        ]}
        onFilesChange={() => {}}
        onRemoveFile={() => {}}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <FileUpload disabled onFilesChange={() => {}} />
    </div>
  ),
};
