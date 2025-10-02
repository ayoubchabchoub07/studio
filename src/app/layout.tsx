import type {Metadata} from 'next';
import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'KitchenSync AI',
  description: 'Your complete kitchen companion for smarter cooking and healthier eating!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
            <SidebarNav />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
