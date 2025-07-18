
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
  "https://res.cloudinary.com/ddzgkirmz/image/upload/v1752841180/alpha7_kq1yjy.jpg",
  "https://res.cloudinary.com/ddzgkirmz/image/upload/v1752841178/apha2_uab1ho.jpg"
];

const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function AboutImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="relative w-full h-96 md:h-full min-h-[400px]">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ opacity: { duration: 1.5 } }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt="Showcase of Alfarid Estates properties"
            fill
            className="rounded-lg shadow-xl object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
            data-ai-hint="luxury estate"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
