
'use client';

import { useState, useEffect, useTransition } from 'react';
import { Menu, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from './theme-toggle';
import { Link, usePathname, pathnames } from '@/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './language-switcher';
import Image from 'next/image';

type NavItem = {
  href: keyof typeof pathnames;
  label: string;
};

export function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems: NavItem[] = [
    { href: '/', label: t('home') },
    { href: '/gallery', label: t('gallery') },
    { href: '/videos', label: t('videos') },
    { href: '/services', label: t('services') },
    { href: '/listing-generator', label: t('aiTool') },
  ];

  const NavLink = ({ href, label }: NavItem) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
        isClient && pathname === href ? "text-primary" : "text-foreground/60"
      )}
      onClick={(e) => {
        if (pathname !== href) {
          startTransition(() => {
            // The navigation is wrapped in startTransition
          });
        }
        setIsMobileMenuOpen(false)
      }}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/logo.jpg" alt="Alfarid Estates Logo" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6">
          {navItems.map(item => <NavLink key={item.href} {...item} />)}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isPending && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t('toggleMenu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="p-4">
                   <Link href="/" className="mr-6 flex items-center space-x-2 mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                     <Image src="/logo.jpg" alt="Alfarid Estates Logo" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navItems.map(item => <NavLink key={item.href} {...item} />)}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
