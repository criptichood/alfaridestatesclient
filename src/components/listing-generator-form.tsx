'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { generateAction } from "@/app/listing-generator/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  propertyType: z.string().min(2, { message: "Property type must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  bedrooms: z.coerce.number().int().min(0, { message: "Bedrooms must be a positive number." }),
  bathrooms: z.coerce.number().min(0.5, { message: "Bathrooms must be at least 0.5." }),
  squareFootage: z.coerce.number().int().min(1, { message: "Square footage must be a positive number." }),
  amenities: z.string().min(3, { message: "Please list at least one amenity." }),
  uniqueFeatures: z.string().min(10, { message: "Describe unique features in at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;
type GenerationResult = {
  englishDescription: string;
  hausaDescription: string;
};

export default function ListingGeneratorForm() {
  const t = useTranslations('ListingGeneratorPage');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "Apartment",
      location: "Miami, FL",
      bedrooms: 3,
      bathrooms: 2,
      squareFootage: 1800,
      amenities: "Pool, Gym, Ocean view, Valet parking",
      uniqueFeatures: "Floor-to-ceiling windows with panoramic city views, private elevator access.",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    const response = await generateAction(values);
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
      toast({
        title: t('successToastTitle'),
        description: t('successToastDescription'),
        variant: "default",
      });
    } else {
      toast({
        title: t('errorToastTitle'),
        description: response.error || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">{t('formTitle')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('propertyTypeLabel')}</FormLabel>
                    <FormControl><Input placeholder={t('propertyTypePlaceholder')} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('locationLabel')}</FormLabel>
                    <FormControl><Input placeholder={t('locationPlaceholder')} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('bedroomsLabel')}</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('bathroomsLabel')}</FormLabel>
                    <FormControl><Input type="number" step="0.5" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="squareFootage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('squareFootageLabel')}</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amenities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('amenitiesLabel')}</FormLabel>
                    <FormControl><Input placeholder={t('amenitiesPlaceholder')} {...field} /></FormControl>
                    <FormDescription>{t('amenitiesDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="uniqueFeatures"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('uniqueFeaturesLabel')}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t('uniqueFeaturesPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('generatingButton')}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t('generateButton')}
                </>
              )}
            </Button>
          </form>
        </Form>
        <AnimatePresence>
        {result && (
          <motion.div 
            className="mt-12 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-headline text-primary">{t('englishDescription')}</h3>
              <Textarea readOnly value={result.englishDescription} className="h-40 bg-secondary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-headline text-primary">{t('hausaDescription')}</h3>
              <Textarea readOnly value={result.hausaDescription} className="h-40 bg-secondary" />
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
