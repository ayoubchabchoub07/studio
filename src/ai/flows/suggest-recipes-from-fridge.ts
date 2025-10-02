'use server';
/**
 * @fileOverview Suggests recipes based on the contents of the user's digital fridge.
 *
 * - suggestRecipesFromFridge - A function that suggests recipes based on fridge contents.
 * - SuggestRecipesFromFridgeInput - The input type for the suggestRecipesFromFridge function.
 * - SuggestRecipesFromFridgeOutput - The return type for the suggestRecipesFromFridge function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRecipesFromFridgeInputSchema = z.object({
  fridgeContents: z
    .array(z.string())
    .describe('The current contents of the user\'s digital fridge.'),
});
export type SuggestRecipesFromFridgeInput = z.infer<
  typeof SuggestRecipesFromFridgeInputSchema
>;

const SuggestRecipesFromFridgeOutputSchema = z.object({
  recipes: z
    .array(z.string())
    .describe('A list of suggested recipes based on the fridge contents.'),
});
export type SuggestRecipesFromFridgeOutput = z.infer<
  typeof SuggestRecipesFromFridgeOutputSchema
>;

export async function suggestRecipesFromFridge(
  input: SuggestRecipesFromFridgeInput
): Promise<SuggestRecipesFromFridgeOutput> {
  return suggestRecipesFromFridgeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRecipesFromFridgePrompt',
  input: {schema: SuggestRecipesFromFridgeInputSchema},
  output: {schema: SuggestRecipesFromFridgeOutputSchema},
  prompt: `You are a recipe suggestion expert. Given the current contents of a user's fridge, suggest a list of recipes that the user can make.

Fridge Contents: {{#each fridgeContents}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Recipes:`,
});

const suggestRecipesFromFridgeFlow = ai.defineFlow(
  {
    name: 'suggestRecipesFromFridgeFlow',
    inputSchema: SuggestRecipesFromFridgeInputSchema,
    outputSchema: SuggestRecipesFromFridgeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
