// src/components/animated-hero.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { ImageDoc } from '@/lib/firestore';

interface AnimatedHeroProps {
  images: ImageDoc[];
}

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

export default function AnimatedHero({ images }: AnimatedHeroProps) {
  const [index, setIndex] = useState(0);

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
          key={index}
          initial={{ scale: 1, x:0, y:0 }}
          animate={{ scale: [1.05, 1.1], x: [0, -20], y: [0, 10] }}
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
