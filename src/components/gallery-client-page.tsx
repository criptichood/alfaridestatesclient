
'use client';

import { useState, useEffect } from 'react';
import { getImages, type ImageDoc } from '@/lib/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface GalleryClientPageProps {
  initialImagesCount?: number;
  isPage?: boolean;
}

export default function GalleryClientPage({ initialImagesCount, isPage = false }: GalleryClientPageProps) {
  const t = useTranslations('GalleryPage');
  const [images, setImages] = useState<ImageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageDoc | null>(null);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const fetchedImages = await getImages(initialImagesCount);
      setImages(fetchedImages);
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

  const galleryGrid = (
    loading ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: initialImagesCount || 8 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ))}
      </div>
    ) : (
      <>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {images.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              onClick={() => setSelectedImage(image)}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative aspect-w-4 aspect-h-3 w-full h-64">
                    <Image
                      src={image.url}
                      alt={image.title || t('loadingText')}
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
        
        <Dialog open={!!selectedImage} onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 border-0">
            {selectedImage && (
              <>
                <div className="relative aspect-video w-full">
                  <Image 
                    src={selectedImage.url} 
                    alt={selectedImage.title || t('loadingText')} 
                    fill 
                    className="object-contain"
                  />
                </div>
                {selectedImage.title && (
                  <div className="p-4 bg-background/80 backdrop-blur-sm absolute bottom-0 w-full">
                    <h3 className="font-semibold text-lg text-white">{selectedImage.title}</h3>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </>
    )
  );

  if (isPage) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('title')}</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-foreground/80">
            {t('subtitle')}
          </p>
        </div>
        {galleryGrid}
      </div>
    );
  }

  return galleryGrid;
}
