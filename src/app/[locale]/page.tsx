import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Link } from '@/navigation';
import { ArrowRight, Building2, Handshake, Search } from 'lucide-react';
import GalleryClientPage from '@/components/gallery-client-page';
import VideosClientPage from '@/components/videos-client-page';
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Luxury modern home"
          data-ai-hint="luxury modern home"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline leading-tight tracking-tight">
            {t('heroTitle')}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/gallery">{t('exploreProperties')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('aboutTitle')}</h2>
            <p className="mt-4 text-lg text-foreground/80">
              {t('aboutText1')}
            </p>
            <p className="mt-4 text-lg text-foreground/80">
              {t('aboutText2')}
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
             <Image
                src="https://placehold.co/800x600.png"
                alt="Realtor team"
                data-ai-hint="realtor team"
                fill
                className="object-cover"
              />
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('servicesTitle')}</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-foreground/80">
            {t('servicesSubtitle')}
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
            <Card>
              <CardContent className="p-6">
                <Handshake className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-bold text-primary">{t('buyingSellingTitle')}</h3>
                <p className="mt-2 text-foreground/80">{t('buyingSellingText')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Building2 className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-bold text-primary">{t('propertyManagementTitle')}</h3>
                <p className="mt-2 text-foreground/80">{t('propertyManagementText')}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Search className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-bold text-primary">{t('marketAnalysisTitle')}</h3>
                <p className="mt-2 text-foreground/80">{t('marketAnalysisText')}</p>
              </CardContent>
            </Card>
          </div>
          <Button asChild size="lg" className="mt-12 bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="https://zcal.co" target="_blank" rel="noopener noreferrer">{t('bookConsultation')}</a>
          </Button>
        </div>
      </section>

      <section id="gallery-preview" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center">{t('featuredPropertiesTitle')}</h2>
          <p className="mt-4 mb-12 text-lg text-center max-w-3xl mx-auto text-foreground/80">
            {t('featuredPropertiesSubtitle')}
          </p>
          <GalleryClientPage initialImagesCount={4} />
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/gallery">{t('viewFullGallery')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="video-preview" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center">{t('propertyToursTitle')}</h2>
          <p className="mt-4 mb-12 text-lg text-center max-w-3xl mx-auto text-foreground/80">
            {t('propertyToursSubtitle')}
          </p>
          <VideosClientPage initialVideosCount={1} />
           <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/videos">{t('watchMoreVideos')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
