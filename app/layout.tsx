import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WoW Education ERP',
  description: 'School Management System for WoW Education - ICSE Affiliated School',
  keywords: ['school', 'erp', 'management', 'education', 'icse'],
  authors: [{ name: 'WoW Education' }],
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0066cc" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}