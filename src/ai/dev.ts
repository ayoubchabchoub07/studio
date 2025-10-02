import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-recipes-from-fridge.ts';
import '@/ai/flows/summarize-nutrition-info.ts';
import '@/ai/flows/generate-personalized-recipes.ts';