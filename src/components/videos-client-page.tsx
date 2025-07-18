
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getVideos, type VideoDoc, VIDEOS_PER_PAGE } from '@/lib/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Button } from './ui/button';
import { Loader2, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VideosClientPageProps {
  isPage?: boolean;
}

export default function VideosClientPage({ isPage = false }: VideosClientPageProps) {
  const t = useTranslations('VideosPage');
  const [videos, setVideos] = useState<VideoDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoDoc | null>(null);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchInitialVideos = useCallback(async () => {
    setLoading(true);
    const limit = isPage ? VIDEOS_PER_PAGE : 2;
    const { videos: fetchedVideos, lastVisible: newLastVisible } = await getVideos(undefined, limit);
    setVideos(fetchedVideos);
    setLastVisible(newLastVisible);
    setHasMore(fetchedVideos.length === limit);
    setLoading(false);
  }, [isPage]);

  useEffect(() => {
    fetchInitialVideos();
  }, [fetchInitialVideos]);

  const handleLoadMore = async () => {
    if (!lastVisible || !hasMore) return;

    setLoadingMore(true);
    const { videos: newVideos, lastVisible: newLastVisible } = await getVideos(lastVisible, VIDEOS_PER_PAGE);
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
  
  const videosToDisplay = isPage ? videos : videos.slice(0, 2);
  const gridCols = isPage ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2';

  const videoGrid = (
    <motion.div
      className={`grid ${gridCols} gap-8`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {videosToDisplay.map((video) => (
        <motion.div 
          key={video.id} 
          variants={itemVariants}
          onClick={() => setSelectedVideo(video)}
          className="cursor-pointer"
        >
          <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative aspect-video w-full">
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title || "Video thumbnail"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-all transform group-hover:scale-110" />
                </div>
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
         <div className={`grid ${gridCols} gap-8`}>
         {Array.from({ length: isPage ? VIDEOS_PER_PAGE : 2 }).map((_, index) => (
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

      <Dialog open={selectedVideo !== null} onOpenChange={(isOpen) => !isOpen && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-full p-0 border-0 bg-transparent shadow-none">
          {selectedVideo && (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title || "YouTube video player"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );

  return <PageContent />;
}
