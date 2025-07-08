// src/lib/firestore.ts
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export interface ImageDoc {
  id: string;
  url: string;
  title?: string;
}

export interface VideoDoc {
  id:string;
  youtubeId: string;
  title?: string;
}

export async function getImages(count?: number): Promise<ImageDoc[]> {
  if (!db) return [];
  try {
    const imagesRef = collection(db, "images");
    // Assuming you might want to order them, e.g., by a 'createdAt' field.
    // If not, you can remove the orderBy call.
    const q = count ? query(imagesRef, limit(count)) : query(imagesRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as ImageDoc));
  } catch (error) {
    console.error("Error fetching images: ", error);
    // In a real app, you might want to handle this more gracefully
    return [];
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
  } catch (error) {
    console.error("Error fetching videos: ", error);
    return [];
  }
}
