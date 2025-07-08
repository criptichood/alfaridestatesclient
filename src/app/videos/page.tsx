import VideosClientPage from "@/components/videos-client-page";

export const metadata = {
  title: 'Video Tours | Alfarid Estates',
  description: 'Immersive video tours of our exclusive properties.',
};

export default function VideosPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Immersive Video Tours</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-foreground/80">
          Step inside our properties from anywhere in the world. Our high-definition video tours offer an in-depth look at what makes each home unique.
        </p>
      </div>
      <VideosClientPage />
    </div>
  );
}
