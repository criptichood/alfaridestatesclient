import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Handshake, Search } from 'lucide-react';
import GalleryClientPage from '@/components/gallery-client-page';
import VideosClientPage from '@/components/videos-client-page';

export default function Home() {
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
            Discover Your Dream Property
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Alfarid Estates: Unlocking the door to your future with unparalleled service and expertise in luxury real estate.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/gallery">Explore Properties <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">About Alfarid Estates</h2>
            <p className="mt-4 text-lg text-foreground/80">
              At Alfarid Estates, we are more than just real estate agents; we are curators of exceptional living experiences. With a legacy of trust and a commitment to excellence, we specialize in connecting discerning clients with the world's most exclusive properties.
            </p>
            <p className="mt-4 text-lg text-foreground/80">
              Our bespoke approach ensures that every transaction is seamless, personalized, and exceeds expectations. We believe that a home is a sanctuary, a statement, and a legacy. Let us guide you on your journey to finding the perfect one.
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Services</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-foreground/80">
            We offer a comprehensive suite of services to cater to all your real estate needs, from buying and selling to property management and consultation.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
            <Card>
              <CardContent className="p-6">
                <Handshake className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-bold text-primary">Buying & Selling</h3>
                <p className="mt-2 text-foreground/80">Expert guidance through every step of purchasing or listing your luxury property, ensuring optimal value and a smooth process.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Building2 className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-bold text-primary">Property Management</h3>
                <p className="mt-2 text-foreground/80">Comprehensive management services for your investment properties, handling everything from tenant relations to maintenance.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Search className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-bold text-primary">Market Analysis</h3>
                <p className="mt-2 text-foreground/80">In-depth market research and analysis to empower your decisions with data-driven insights and strategic advice.</p>
              </CardContent>
            </Card>
          </div>
          <Button asChild size="lg" className="mt-12 bg-accent text-accent-foreground hover:bg-accent/90">
            <a href="https://zcal.co" target="_blank" rel="noopener noreferrer">Book a Consultation</a>
          </Button>
        </div>
      </section>

      <section id="gallery-preview" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center">Featured Properties</h2>
          <p className="mt-4 mb-12 text-lg text-center max-w-3xl mx-auto text-foreground/80">
            A glimpse into the extraordinary properties we represent. Explore our full gallery for more.
          </p>
          <GalleryClientPage initialImagesCount={4} />
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/gallery">View Full Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="video-preview" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center">Property Tours</h2>
          <p className="mt-4 mb-12 text-lg text-center max-w-3xl mx-auto text-foreground/80">
            Immerse yourself in our properties with stunning high-definition video tours.
          </p>
          <VideosClientPage initialVideosCount={1} />
           <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/videos">Watch More Videos <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
