'use client';

import { useState } from 'react';
import { Building, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from './theme-toggle';
import { Link, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './language-switcher';


export function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/gallery', label: t('gallery') },
    { href: '/videos', label: t('videos') },
    { href: '/services', label: t('services') },
    { href: '/listing-generator', label: t('aiTool') },
  ];

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-foreground/60"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Building className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">{t('companyName')}</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6">
          {navItems.map(item => <NavLink key={item.href} {...item} />)}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
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
                    <Building className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">{t('companyName')}</span>
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
