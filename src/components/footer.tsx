import { Building } from "lucide-react";
import {useTranslations} from 'next-intl';

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
             <Building className="h-6 w-6 text-primary" />
             <span className="font-bold font-headline text-lg">{t('Header.companyName')}</span>
          </div>
          <p className="text-sm text-foreground/60">
            {t('Footer.copyright', {year: new Date().getFullYear()})}
          </p>
        </div>
      </div>
    </footer>
  );
}
