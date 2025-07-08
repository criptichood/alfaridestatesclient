import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Our Services | Alfarid Estates',
  description: 'Comprehensive real estate services tailored to your needs.',
};

const services = [
  {
    title: 'Residential Sales',
    description: 'Our core expertise lies in the buying and selling of luxury residential properties. We provide unparalleled market knowledge, strategic marketing, and negotiation skills to achieve the best possible outcomes for our clients. Whether you are a first-time buyer or a seasoned investor, we are your trusted partners.',
    points: ['Exclusive Listings', 'Buyer Representation', 'Luxury Condominiums', 'Waterfront Properties']
  },
  {
    title: 'Commercial Real Estate',
    description: 'We offer specialized services for commercial properties, including office spaces, retail locations, and industrial sites. Our team understands the unique complexities of commercial transactions and provides data-driven advice to maximize your return on investment.',
    points: ['Office & Retail Leasing', 'Investment Sales', 'Land Acquisition', 'Market Analysis']
  },
  {
    title: 'Property Management',
    description: 'Protect your investment with our comprehensive property management services. We handle all aspects of property ownership, from tenant screening and rent collection to maintenance and financial reporting, allowing you to enjoy the benefits of ownership without the hassle.',
    points: ['Tenant Relations', '24/7 Maintenance', 'Financial Reporting', 'Lease Administration']
  },
  {
    title: 'Real Estate Consultation',
    description: 'Leverage our decades of experience through our consultation services. We provide strategic advice on property investment, portfolio management, market trends, and development projects to help you make informed decisions that align with your financial goals.',
    points: ['Portfolio Strategy', 'Development Feasibility', 'Market Trend Analysis', 'Investment Advisory']
  }
];

export default function ServicesPage() {
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
          <h1 className="text-4xl md:text-6xl font-bold font-headline">Our Services</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Tailored solutions for every real estate need.
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
            <h2 className="text-3xl font-bold text-primary">Ready to Take the Next Step?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
              Our team of experts is ready to assist you. Schedule a no-obligation consultation to discuss your real estate goals and how we can help you achieve them.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="https://zcal.co" target="_blank" rel="noopener noreferrer">
                Book a Free Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
