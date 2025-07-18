
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/navigation';
import { ArrowRight, Building2, Handshake, Search, Phone, Mail, MapPin } from 'lucide-react';
import GalleryClientPage from '@/components/gallery-client-page';
import VideosClientPage from '@/components/videos-client-page';
import {useTranslations} from 'next-intl';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import AnimatedHero from '@/components/animated-hero';
import ScrollAnimationWrapper from '@/components/scroll-animation-wrapper';
import AboutImageCarousel from '@/components/about-image-carousel';


export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <AnimatedHero />
      </section>

      <ScrollAnimationWrapper>
        <section id="about" className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('aboutTitle')}</h2>
                <p className="mt-4 text-lg text-foreground/80">
                  {t('aboutText1')}
                </p>
                <p className="mt-4 text-lg text-foreground/80">
                  {t('aboutText2')}
                </p>
              </div>
              <div>
                <AboutImageCarousel />
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <section id="services" className="py-16 md:py-24 animated-gradient">
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
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <section id="gallery-preview" className="py-16 md:py-24 animated-gradient">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center">{t('featuredPropertiesTitle')}</h2>
            <p className="mt-4 mb-12 text-lg text-center max-w-3xl mx-auto text-foreground/80">
              {t('featuredPropertiesSubtitle')}
            </p>
            <GalleryClientPage isPage={false} />
            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/gallery">{t('viewFullGallery')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <section id="video-preview" className="py-16 md:py-24 animated-gradient">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center">{t('propertyToursTitle')}</h2>
            <p className="mt-4 mb-12 text-lg text-center max-w-3xl mx-auto text-foreground/80">
              {t('propertyToursSubtitle')}
            </p>
            <VideosClientPage isPage={false} />
            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/videos">{t('watchMoreVideos')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <section id="contact" className="py-16 md:py-24 animated-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('contactTitle')}</h2>
              <p className="mt-4 text-lg max-w-3xl mx-auto text-foreground/80">
                {t('contactSubtitle')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="p-8 shadow-lg">
                <form className="space-y-6">
                  <Input placeholder={t('formName')} />
                  <Input type="email" placeholder={t('formEmail')} />
                  <Textarea placeholder={t('formMessage')} rows={5} />
                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    {t('formSend')}
                  </Button>
                </form>
              </Card>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-primary">Address</h3>
                      <p className="text-foreground/80">{t('contactAddress')}</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-primary">Phone</h3>
                      <p className="text-foreground/80">{t('contactPhone')}</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-primary">Email</h3>
                      <p className="text-foreground/80">{t('contactEmail')}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>
    </div>
  );
}
