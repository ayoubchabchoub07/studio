'use server';

/**
 * @fileOverview AI-powered recipe generation flow that personalizes recipes based on user dietary preferences and available ingredients.
 *
 * - generatePersonalizedRecipes - A function that generates personalized recipes.
 * - GeneratePersonalizedRecipesInput - The input type for the generatePersonalizedRecipes function.
 * - GeneratePersonalizedRecipesOutput - The return type for the generatePersonalizedRecipes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedRecipesInputSchema = z.object({
  dietaryPreferences: z
    .array(z.string())
    .describe('An array of dietary preferences (e.g., vegan, keto, gluten-free).'),
  availableIngredients: z
    .array(z.string())
    .describe('An array of available ingredients in the user\'s fridge/pantry.'),
  cookingHistory: z
    .string()
    .optional()
    .describe('A summary of the user\'s past cooking history and preferences.'),
  prepTime: z
    .string()
    .optional()
    .describe('The maximum preparation time for the recipe.'),
  difficulty: z
    .string()
    .optional()
    .describe('The difficulty level of the recipe (e.g., easy, medium, hard).'),
});

export type GeneratePersonalizedRecipesInput = z.infer<
  typeof GeneratePersonalizedRecipesInputSchema
>;

const GeneratePersonalizedRecipesOutputSchema = z.object({
  recipes: z
    .array(
      z.object({
        name: z.string().describe('The name of the recipe.'),
        ingredients: z.array(z.string()).describe('The list of ingredients required for the recipe.'),
        instructions: z.string().describe('The cooking instructions for the recipe.'),
        nutritionFacts: z
          .string()
          .optional()
          .describe('The nutritional information for the recipe.'),
      })
    )
    .describe('An array of personalized recipes.'),
});

export type GeneratePersonalizedRecipesOutput = z.infer<
  typeof GeneratePersonalizedRecipesOutputSchema
>;

export async function generatePersonalizedRecipes(
  input: GeneratePersonalizedRecipesInput
): Promise<GeneratePersonalizedRecipesOutput> {
  return generatePersonalizedRecipesFlow(input);
}

const generatePersonalizedRecipesPrompt = ai.definePrompt({
  name: 'generatePersonalizedRecipesPrompt',
  input: {schema: GeneratePersonalizedRecipesInputSchema},
  output: {schema: GeneratePersonalizedRecipesOutputSchema},
  prompt: `You are an AI recipe generator that creates personalized recipes based on user preferences and available ingredients.

  Consider the following dietary preferences: {{dietaryPreferences}}
  Available ingredients: {{availableIngredients}}
  {% if cookingHistory %}User's cooking history: {{cookingHistory}}{% endif %}
  {% if prepTime %}Maximum preparation time: {{prepTime}}{% endif %}
  {% if difficulty %}Difficulty level: {{difficulty}}{% endif %}

  Generate a list of recipes that match these criteria. Each recipe should include a name, a list of ingredients, cooking instructions, and optional nutritional information.

  Format the response as a JSON object with a "recipes" array. Each recipe object in the array should have the following fields:
  - name: string
  - ingredients: string[]
  - instructions: string
  - nutritionFacts: string (optional)
`,
});

const generatePersonalizedRecipesFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRecipesFlow',
    inputSchema: GeneratePersonalizedRecipesInputSchema,
    outputSchema: GeneratePersonalizedRecipesOutputSchema,
  },
  async input => {
    const {output} = await generatePersonalizedRecipesPrompt(input);
    return output!;
  }
);
