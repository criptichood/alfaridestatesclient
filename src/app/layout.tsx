import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { PageWrapper } from '@/components/page-wrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'Alfarid Estates Showcase',
  description: 'Luxury real estate showcase by Alfarid Estates.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          inter.variable,
          playfairDisplay.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <PageWrapper>{children}</PageWrapper>
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
