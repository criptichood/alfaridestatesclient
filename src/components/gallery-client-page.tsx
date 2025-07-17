
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getImages, type ImageDoc } from '@/lib/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryClientPageProps {
  initialImagesCount?: number;
  isPage?: boolean;
}

export default function GalleryClientPage({ initialImagesCount, isPage = false }: GalleryClientPageProps) {
  const t = useTranslations('GalleryPage');
  const [images, setImages] = useState<ImageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const fetchedImages = await getImages(initialImagesCount);
      setImages(fetchedImages);
      setLoading(false);
    }
    fetchImages();
  }, [initialImagesCount]);

  const handleNext = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => {
      if (prevIndex === null || prevIndex === images.length - 1) {
        return 0; // Loop to the first image
      }
      return prevIndex + 1;
    });
  }, [selectedImageIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => {
      if (prevIndex === null || prevIndex === 0) {
        return images.length - 1; // Loop to the last image
      }
      return prevIndex - 1;
    });
  }, [selectedImageIndex, images.length]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex, handleNext, handlePrev]);

  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

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
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              onClick={() => setSelectedImageIndex(index)}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative aspect-w-4 aspect-h-3 h-64">
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
        
        <Dialog open={selectedImageIndex !== null} onOpenChange={(isOpen) => !isOpen && setSelectedImageIndex(null)}>
          <DialogContent className="max-w-5xl w-full p-0 border-0 bg-transparent shadow-none">
            {selectedImage && (
              <div className="relative aspect-video w-full flex items-center justify-center">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={selectedImage.url} 
                    alt={selectedImage.title || t('loadingText')} 
                    fill 
                    className="object-contain"
                  />
                </motion.div>

                {selectedImage.title && (
                  <div className="p-4 bg-black/50 backdrop-blur-sm absolute bottom-0 w-full text-center">
                    <h3 className="font-semibold text-lg text-white">{selectedImage.title}</h3>
                  </div>
                )}
                
                <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-black/30 hover:bg-black/50 text-white hover:text-white" onClick={handlePrev}>
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-black/30 hover:bg-black/50 text-white hover:text-white" onClick={handleNext}>
                  <ChevronRight className="h-8 w-8" />
                </Button>

              </div>
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
