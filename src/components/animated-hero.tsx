
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { ImageDoc } from '@/lib/firestore';
import { getImages } from '@/lib/firestore';
import { useTranslations } from 'next-intl';
import { Button } from './ui/button';
import { Link } from '@/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';

const imageVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: i * 0.3 },
  }),
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

export default function AnimatedHero() {
  const t = useTranslations('HomePage');
  const [images, setImages] = useState<ImageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const heroMessages = [
    { title: t('heroTitle'), subtitle: t('heroSubtitle') },
    { title: "Find Your Legacy", subtitle: "Extraordinary homes for discerning clients." },
    { title: "The Art of Living", subtitle: "Where luxury meets lifestyle." },
    { title: "Your New Chapter Awaits", subtitle: "Begin your journey with Alfarid Estates." },
  ];

  useEffect(() => {
    async function fetchHeroImages() {
      setLoading(true);
      const { images: fetchedImages } = await getImages(undefined, 4);
      setImages(fetchedImages);
      setLoading(false);
    }
    fetchHeroImages();
  }, []);

  useEffect(() => {
    const cycleDuration = 7000; // 7 seconds for each slide
    if (images.length > 1) {
      const timer = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, cycleDuration);
      return () => clearTimeout(timer);
    }
  }, [index, images.length]);

  if (loading || images.length === 0) {
    return (
      <>
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
         <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
             <motion.div
                initial="hidden"
                animate="visible"
                variants={textContainerVariants}
                className="text-center"
              >
                <motion.h1
                    variants={textVariants}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline leading-tight tracking-tight"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
                >
                    {t('heroTitle')}
                </motion.h1>
                <motion.p
                    variants={textVariants}
                    className="mt-4 text-lg md:text-xl max-w-2xl mx-auto"
                    style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
                >
                    {t('heroSubtitle')}
                </motion.p>
                <motion.div variants={textVariants} className="mt-8">
                    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/gallery">{t('exploreProperties')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                </motion.div>
             </motion.div>
        </div>
      </>
    );
  }

  const currentMessage = heroMessages[index % heroMessages.length];

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ opacity: { duration: 1.5 } }}
          className="absolute inset-0"
        >
          <motion.div
            key={images[index].id}
            initial={{ scale: 1 }}
            animate={{ scale: 1.1, transition: { duration: 9, ease: 'linear' } }}
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
       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
       <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="text-center"
            >
              <motion.h1
                variants={textVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline leading-tight tracking-tight"
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
              >
                {currentMessage.title}
              </motion.h1>
              <motion.p
                variants={textVariants}
                className="mt-4 text-lg md:text-xl max-w-2xl mx-auto"
                style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
              >
                {currentMessage.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8"
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/gallery">{t('exploreProperties')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </motion.div>
       </div>
    </>
  );
}
