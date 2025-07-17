// src/lib/firestore.ts
import { collection, getDocs, limit, query, orderBy, startAfter, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export interface ImageDoc {
  id: string;
  url: string;
  title?: string;
  createdAt?: any;
}

export interface VideoDoc {
  id:string;
  youtubeId: string;
  title?: string;
  createdAt?: any;
}

export const IMAGES_PER_PAGE = 8;
export const VIDEOS_PER_PAGE = 6;

export async function getImages(
  startAfterDoc?: QueryDocumentSnapshot<DocumentData>,
  customLimit: number = IMAGES_PER_PAGE
): Promise<{ images: ImageDoc[]; lastVisible: QueryDocumentSnapshot<DocumentData> | null }> {
  if (!db) return { images: [], lastVisible: null };

  try {
    const imagesRef = collection(db, "images");
    
    let q;

    if (startAfterDoc) {
      q = query(
        imagesRef,
        orderBy("createdAt", "desc"),
        startAfter(startAfterDoc),
        limit(customLimit)
      );
    } else {
      q = query(
        imagesRef, 
        orderBy("createdAt", "desc"), 
        limit(customLimit)
      );
    }
    
    const querySnapshot = await getDocs(q);
    
    const images = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as ImageDoc));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { images, lastVisible };
  } catch (error) {
    console.error("Error fetching images: ", error);
    return { images: [], lastVisible: null };
  }
}


export async function getVideos(
  startAfterDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{ videos: VideoDoc[]; lastVisible: QueryDocumentSnapshot<DocumentData> | null }> {
  if (!db) return { videos: [], lastVisible: null };
  try {
    const videosRef = collection(db, "videos");
    let q;
    if (startAfterDoc) {
      q = query(
        videosRef,
        orderBy("createdAt", "desc"),
        startAfter(startAfterDoc),
        limit(VIDEOS_PER_PAGE)
      );
    } else {
       q = query(
        videosRef, 
        orderBy("createdAt", "desc"), 
        limit(VIDEOS_PER_PAGE)
      );
    }
    
    const querySnapshot = await getDocs(q);

    const videos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as VideoDoc));
    
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { videos, lastVisible };
  } catch (error) {
    console.error("Error fetching videos: ", error);
    return { videos: [], lastVisible: null };
  }
}
