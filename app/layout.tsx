import type { Metadata } from 'next';

import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Next Auth',
  description: 'Created by Arsalan Ansari'
};

type Props = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  );
}
