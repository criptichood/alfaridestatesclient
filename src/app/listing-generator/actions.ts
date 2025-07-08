'use server';

import { 
  generateListingDescription, 
  type GenerateListingDescriptionInput 
} from '@/ai/flows/generate-listing-description';

export async function generateAction(input: GenerateListingDescriptionInput) {
  try {
    const result = await generateListingDescription(input);
    if (!result || !result.englishDescription || !result.spanishDescription) {
      throw new Error('AI failed to return a valid description.');
    }
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in generateAction:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate description: ${errorMessage}` };
  }
}
