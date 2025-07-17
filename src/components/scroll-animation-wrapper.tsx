'use client';
import { motion } from 'framer-motion';

export default function ScrollAnimationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        offscreen: {
          y: 30,
          opacity: 0,
        },
        onscreen: {
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            bounce: 0.4,
            duration: 0.8,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
