import GalleryClientPage from "@/components/gallery-client-page";

export const metadata = {
  title: 'Gallery | Alfarid Estates',
  description: 'Explore our portfolio of luxury properties.',
};

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Property Gallery</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-foreground/80">
          A curated collection of our finest properties. Click on any image to envision your future home.
        </p>
      </div>
      <GalleryClientPage />
    </div>
  );
}
