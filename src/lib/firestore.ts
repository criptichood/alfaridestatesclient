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
}

export const IMAGES_PER_PAGE = 8;

export async function getImages(
  startAfterDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{ images: ImageDoc[]; lastVisible: QueryDocumentSnapshot<DocumentData> | null }> {
  if (!db) return { images: [], lastVisible: null };

  try {
    const imagesRef = collection(db, "images");
    
    // Order by a consistent field, 'createdAt' is ideal. Use descending to get newest first.
    let q = query(
      imagesRef, 
      orderBy("createdAt", "desc"), 
      limit(IMAGES_PER_PAGE)
    );

    if (startAfterDoc) {
      q = query(
        imagesRef,
        orderBy("createdAt", "desc"),
        startAfter(startAfterDoc),
        limit(IMAGES_PER_PAGE)
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


export async function getVideos(count?: number): Promise<VideoDoc[]> {
  if (!db) return [];
  try {
    const videosRef = collection(db, "videos");
    const q = count ? query(videosRef, limit(count)) : query(videosRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as VideoDoc));
  } catch (error)
 {
    console.error("Error fetching videos: ", error);
    return [];
  }
}
