'use server';
/**
 * @fileOverview Summarizes nutrition information of meals.
 *
 * - summarizeNutritionInfo - A function that handles the summarization of nutrition information.
 * - SummarizeNutritionInfoInput - The input type for the summarizeNutritionInfo function.
 * - SummarizeNutritionInfoOutput - The return type for the summarizeNutritionInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeNutritionInfoInputSchema = z.object({
  mealName: z.string().describe('The name of the meal.'),
  calories: z.number().describe('The number of calories in the meal.'),
  protein: z.number().describe('The amount of protein in grams.'),
  carbohydrates: z.number().describe('The amount of carbohydrates in grams.'),
  fat: z.number().describe('The amount of fat in grams.'),
});
export type SummarizeNutritionInfoInput = z.infer<typeof SummarizeNutritionInfoInputSchema>;

const SummarizeNutritionInfoOutputSchema = z.object({
  summary: z.string().describe('A short summary of the nutrition information.'),
});
export type SummarizeNutritionInfoOutput = z.infer<typeof SummarizeNutritionInfoOutputSchema>;

export async function summarizeNutritionInfo(input: SummarizeNutritionInfoInput): Promise<SummarizeNutritionInfoOutput> {
  return summarizeNutritionInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNutritionInfoPrompt',
  input: {schema: SummarizeNutritionInfoInputSchema},
  output: {schema: SummarizeNutritionInfoOutputSchema},
  prompt: `Summarize the following nutrition information for {{mealName}} in one sentence:\nCalories: {{calories}}\nProtein: {{protein}}g\nCarbohydrates: {{carbohydrates}}g\nFat: {{fat}}g`,
});

const summarizeNutritionInfoFlow = ai.defineFlow(
  {
    name: 'summarizeNutritionInfoFlow',
    inputSchema: SummarizeNutritionInfoInputSchema,
    outputSchema: SummarizeNutritionInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
