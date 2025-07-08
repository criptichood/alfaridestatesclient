'use client';

import { useState, useEffect } from 'react';
import { getVideos, type VideoDoc } from '@/lib/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

interface VideosClientPageProps {
  initialVideosCount?: number;
}

export default function VideosClientPage({ initialVideosCount }: VideosClientPageProps) {
  const [videos, setVideos] = useState<VideoDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      const fetchedVideos = await getVideos(initialVideosCount);
      // For demo purposes, using placeholders if firestore is empty
      if (fetchedVideos.length === 0) {
        const placeholderCount = initialVideosCount || 4;
        const placeholders = Array.from({ length: placeholderCount }, (_, i) => ({
          id: `placeholder-${i}`,
          youtubeId: '_F-y9mWhmis', // A sample luxury house tour video
          title: `Exclusive Property Tour ${i + 1}`,
        }));
        setVideos(placeholders);
      } else {
        setVideos(fetchedVideos);
      }
      setLoading(false);
    }
    fetchVideos();
  }, [initialVideosCount]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: initialVideosCount || 4 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-0 pb-[56.25%] w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {videos.map((video) => (
        <motion.div key={video.id} variants={itemVariants}>
          <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title || "YouTube video player"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              {video.title && (
                <div className="p-4 bg-background">
                  <h3 className="font-semibold text-lg truncate">{video.title}</h3>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
