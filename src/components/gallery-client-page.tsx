'use client';

import { useState, useEffect } from 'react';
import { getImages, type ImageDoc } from '@/lib/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GalleryClientPageProps {
  initialImagesCount?: number;
}

export default function GalleryClientPage({ initialImagesCount }: GalleryClientPageProps) {
  const [images, setImages] = useState<ImageDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const fetchedImages = await getImages(initialImagesCount);
      // For demo purposes, using placeholders if firestore is empty
      if (fetchedImages.length === 0) {
        const placeholderCount = initialImagesCount || 8;
        const placeholders = Array.from({ length: placeholderCount }, (_, i) => ({
          id: `placeholder-${i}`,
          url: `https://placehold.co/800x600.png?text=Property+${i + 1}`,
          title: `Luxury Property ${i + 1}`,
        }));
        setImages(placeholders);
      } else {
        setImages(fetchedImages);
      }
      setLoading(false);
    }
    fetchImages();
  }, [initialImagesCount]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: initialImagesCount || 8 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {images.map((image) => (
        <motion.div key={image.id} variants={itemVariants}>
          <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative aspect-w-4 aspect-h-3 w-full">
                <Image
                  src={image.url}
                  alt={image.title || 'Luxury property'}
                  data-ai-hint="luxury property interior"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {image.title && (
                <div className="p-4 bg-background">
                  <h3 className="font-semibold text-lg truncate">{image.title}</h3>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
