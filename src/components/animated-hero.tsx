// src/components/animated-hero.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { ImageDoc } from '@/lib/firestore';
import { getImages } from '@/lib/firestore';

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export default function AnimatedHero() {
  const [images, setImages] = useState<ImageDoc[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchHeroImages() {
      // Fetch only the latest 4 images for the hero section
      const { images: fetchedImages } = await getImages(undefined, 4);
      setImages(fetchedImages);
    }
    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const timer = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds
      return () => clearTimeout(timer);
    }
  }, [index, images.length]);

  if (!images || images.length === 0) {
    return (
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Luxury modern home placeholder"
        data-ai-hint="luxury modern home"
        fill
        className="object-cover"
        priority
      />
    );
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={index}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          opacity: { duration: 1.5 },
        }}
        className="absolute inset-0"
      >
        <motion.div
          key={images[index].id}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 7, ease: "easeInOut", yoyo: Infinity }}
          className="w-full h-full"
        >
          <Image
            src={images[index].url}
            alt={images[index].title || 'Luxury modern home'}
            data-ai-hint="luxury modern home"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
