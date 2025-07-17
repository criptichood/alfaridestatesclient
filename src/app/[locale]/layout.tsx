import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { PageWrapper } from '@/components/page-wrapper';
import { ThemeProvider } from '@/components/theme-provider';

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

export default async function LocaleLayout({
  children,
  params: {locale}
}: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="relative flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">
            <PageWrapper>{children}</PageWrapper>
          </main>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
