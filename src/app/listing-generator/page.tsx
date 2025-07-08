import ListingGeneratorForm from "@/components/listing-generator-form";
import { Bot } from "lucide-react";

export const metadata = {
  title: 'AI Listing Generator | Alfarid Estates',
  description: 'Generate compelling real estate listing descriptions with AI.',
};

export default function ListingGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Bot className="h-12 w-12 mx-auto text-accent mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary">AI-Powered Listing Description Generator</h1>
        <p className="mt-4 text-lg text-foreground/80">
          Craft the perfect property description in seconds. Our AI tool, trained by expert copywriters, generates compelling and professional listings in both English and Spanish to attract more buyers.
        </p>
      </div>
      <ListingGeneratorForm />
    </div>
  );
}
