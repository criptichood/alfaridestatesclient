import ListingGeneratorForm from "@/components/listing-generator-form";
import { Bot } from "lucide-react";
import {useTranslations} from 'next-intl';

export default function ListingGeneratorPage() {
  const t = useTranslations('ListingGeneratorPage');
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Bot className="h-12 w-12 mx-auto text-accent mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('title')}</h1>
        <p className="mt-4 text-lg text-foreground/80">
          {t('subtitle')}
        </p>
      </div>
      <ListingGeneratorForm />
    </div>
  );
}
