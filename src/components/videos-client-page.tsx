
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getVideos, type VideoDoc, VIDEOS_PER_PAGE } from '@/lib/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface VideosClientPageProps {
  isPage?: boolean;
}

export default function VideosClientPage({ isPage = false }: VideosClientPageProps) {
  const t = useTranslations('VideosPage');
  const [videos, setVideos] = useState<VideoDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchInitialVideos = useCallback(async () => {
    setLoading(true);
    const { videos: fetchedVideos, lastVisible: newLastVisible } = await getVideos();
    setVideos(fetchedVideos);
    setLastVisible(newLastVisible);
    setHasMore(fetchedVideos.length === VIDEOS_PER_PAGE);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInitialVideos();
  }, [fetchInitialVideos]);

  const handleLoadMore = async () => {
    if (!lastVisible || !hasMore) return;

    setLoadingMore(true);
    const { videos: newVideos, lastVisible: newLastVisible } = await getVideos(lastVisible);
    setVideos((prevVideos) => [...prevVideos, ...newVideos]);
    setLastVisible(newLastVisible);
    setHasMore(newVideos.length === VIDEOS_PER_PAGE);
    setLoadingMore(false);
  };

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
  
  const videoGrid = (
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
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );


  const PageContent = () => (
    <div className="container mx-auto px-4 py-16">
      {isPage && (
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('title')}</h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-foreground/80">
            {t('subtitle')}
            </p>
        </div>
      )}
      
      {loading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {Array.from({ length: isPage ? VIDEOS_PER_PAGE : 1 }).map((_, index) => (
           <div key={index} className="space-y-2">
             <Skeleton className="h-0 pb-[56.25%] w-full rounded-lg" />
           </div>
         ))}
       </div>
      ) : (
        <>
          {videoGrid}
          {isPage && hasMore && (
            <div className="text-center mt-12">
              <Button onClick={handleLoadMore} disabled={loadingMore} size="lg">
                {loadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More Videos'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );

  if (!isPage) {
     return (
        <div className="container mx-auto px-4">
             {loading ? (
                <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-2">
                        <Skeleton className="h-0 pb-[56.25%] w-full rounded-lg" />
                    </div>
                </div>
             ) : (
                <div className="grid grid-cols-1 gap-8">
                 {videos.slice(0, 1).map((video) => (
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
                        </CardContent>
                      </Card>
                    </motion.div>
                ))}
                </div>
            )}
        </div>
     )
  }

  return <PageContent />;
}
