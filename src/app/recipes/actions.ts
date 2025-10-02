"use server";

import { generatePersonalizedRecipes } from '@/ai/flows/generate-personalized-recipes';
import type { GeneratePersonalizedRecipesInput, GeneratePersonalizedRecipesOutput } from '@/ai/flows/generate-personalized-recipes';

export async function generateRecipesAction(input: GeneratePersonalizedRecipesInput): Promise<{
    success: boolean;
    data: GeneratePersonalizedRecipesOutput | null;
    error: string | null;
}> {
    try {
        const result = await generatePersonalizedRecipes(input);
        if (!result || !result.recipes || result.recipes.length === 0) {
            return {
                success: false,
                data: null,
                error: "The AI couldn't generate any recipes with the provided options. Try being less restrictive."
            };
        }
        return { success: true, data: result, error: null };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { success: false, data: null, error: `Failed to generate recipes: ${errorMessage}` };
    }
}
