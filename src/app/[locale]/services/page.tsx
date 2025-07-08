import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations('ServicesPage');

  const services = [
    {
      title: t('residentialSalesTitle'),
      description: t('residentialSalesText'),
      points: [t('residentialSalesPoint1'), t('residentialSalesPoint2'), t('residentialSalesPoint3'), t('residentialSalesPoint4')]
    },
    {
      title: t('commercialRealEstateTitle'),
      description: t('commercialRealEstateText'),
      points: [t('commercialPoint1'), t('commercialPoint2'), t('commercialPoint3'), t('commercialPoint4')]
    },
    {
      title: t('propertyManagementTitle'),
      description: t('propertyManagementText'),
      points: [t('managementPoint1'), t('managementPoint2'), t('managementPoint3'), t('managementPoint4')]
    },
    {
      title: t('consultationTitle'),
      description: t('consultationText'),
      points: [t('consultationPoint1'), t('consultationPoint2'), t('consultationPoint3'), t('consultationPoint4')]
    }
  ];

  return (
    <>
      <section className="relative h-[40vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x800.png"
          alt="Architectural detail"
          data-ai-hint="architectural detail"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline">{t('heroTitle')}</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-12">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-primary mb-4">{service.title}</h2>
                  <p className="text-foreground/80 mb-6">{service.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                    {service.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16 md:mt-24 bg-secondary p-12 rounded-lg">
            <h2 className="text-3xl font-bold text-primary">{t('ctaTitle')}</h2>
            <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
              {t('ctaText')}
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="https://zcal.co" target="_blank" rel="noopener noreferrer">
                {t('bookFreeConsultation')}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
