// src/ai/flows/generate-listing-description.ts
'use server';

/**
 * @fileOverview An AI agent for generating real estate listing descriptions in English and Spanish.
 *
 * - generateListingDescription - A function that generates listing descriptions.
 * - GenerateListingDescriptionInput - The input type for the generateListingDescription function.
 * - GenerateListingDescriptionOutput - The return type for the generateListingDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateListingDescriptionInputSchema = z.object({
  propertyType: z.string().describe('The type of property (e.g., house, apartment, condo).'),
  location: z.string().describe('The location of the property (city, neighborhood).'),
  bedrooms: z.number().describe('The number of bedrooms in the property.'),
  bathrooms: z.number().describe('The number of bathrooms in the property.'),
  squareFootage: z.number().describe('The square footage of the property.'),
  amenities: z.string().describe('A comma-separated list of amenities (e.g., pool, gym, parking).'),
  uniqueFeatures: z.string().describe('A description of the unique features of the property.'),
});
export type GenerateListingDescriptionInput = z.infer<typeof GenerateListingDescriptionInputSchema>;

const GenerateListingDescriptionOutputSchema = z.object({
  englishDescription: z.string().describe('The generated property description in English.'),
  spanishDescription: z.string().describe('The generated property description in Spanish.'),
});
export type GenerateListingDescriptionOutput = z.infer<typeof GenerateListingDescriptionOutputSchema>;

export async function generateListingDescription(
  input: GenerateListingDescriptionInput
): Promise<GenerateListingDescriptionOutput> {
  return generateListingDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateListingDescriptionPrompt',
  input: {schema: GenerateListingDescriptionInputSchema},
  output: {schema: GenerateListingDescriptionOutputSchema},
  prompt: `You are an expert real estate copywriter. Generate compelling and concise descriptions of properties in both English and Spanish, highlighting key features and amenities.

Property Type: {{{propertyType}}}
Location: {{{location}}}
Bedrooms: {{{bedrooms}}}
Bathrooms: {{{bathrooms}}}
Square Footage: {{{squareFootage}}}
Amenities: {{{amenities}}}
Unique Features: {{{uniqueFeatures}}}

English Description:
Spanish Description:`, // Ensure output is valid JSON
});

const generateListingDescriptionFlow = ai.defineFlow(
  {
    name: 'generateListingDescriptionFlow',
    inputSchema: GenerateListingDescriptionInputSchema,
    outputSchema: GenerateListingDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
