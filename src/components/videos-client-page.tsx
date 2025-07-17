
'use client';

import { useState, useEffect } from 'react';
import { getVideos, type VideoDoc } from '@/lib/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useMessages, useTranslations } from 'next-intl';

interface VideosClientPageProps {
  initialVideosCount?: number;
}

export default function VideosClientPage({ initialVideosCount }: VideosClientPageProps) {
  const t = useTranslations('VideosPage');
  const [videos, setVideos] = useState<VideoDoc[]>([]);
  const [loading, setLoading] = useState(true);

  // This is a workaround to pass metadata to a client component
  const messages = useMessages();
  const pageMessages = messages.VideosPage as {title: string, subtitle: string};

  useEffect(() => {
    document.title = `${pageMessages.title} | Alfarid Estates`;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', pageMessages.subtitle);
    }
  }, [pageMessages]);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      const fetchedVideos = await getVideos(initialVideosCount);
      setVideos(fetchedVideos);
      setLoading(false);
    }
    fetchVideos();
  }, [initialVideosCount, t]);

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
  
  const PageContent = () => (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('title')}</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-foreground/80">
          {t('subtitle')}
        </p>
      </div>
      {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {Array.from({ length: initialVideosCount || 4 }).map((_, index) => (
           <div key={index} className="space-y-2">
             <Skeleton className="h-0 pb-[56.25%] w-full rounded-lg" />
             <Skeleton className="h-6 w-3/4" />
           </div>
         ))}
       </div>
      ) : (
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
      )}
    </div>
  );

  return <PageContent />;
}
