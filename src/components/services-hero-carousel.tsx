'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const images = [
  'https://res.cloudinary.com/ddzgkirmz/image/upload/v1752841642/alfarid1_hqnz8c.jpg',
  'https://res.cloudinary.com/ddzgkirmz/image/upload/v1752841706/apha3_xsvgtm.jpg',
];

export default function ServicesHeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="h-full">
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[50vh] w-full">
              <Image
                src={src}
                alt={`Real estate service showcase ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                data-ai-hint="real estate service"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
