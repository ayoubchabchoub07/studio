import type { FC } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import type { Recipe } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Clock, BarChart, BookOpen, Soup } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe, index }) => {
  const placeholderIds = ['recipe-placeholder-1', 'recipe-placeholder-2', 'recipe-placeholder-3', 'recipe-placeholder-4'];
  const image = PlaceHolderImages.find(p => p.id === placeholderIds[index % placeholderIds.length]);

  return (
    <Card>
      <CardHeader>
        {image && (
          <div className="relative h-48 w-full mb-4">
            <Image
              src={image.imageUrl}
              alt={recipe.name}
              fill
              className="rounded-lg object-cover"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <CardTitle className="font-headline text-2xl">{recipe.name}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
          {recipe.prepTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime}</span>
            </div>
          )}
          {recipe.difficulty && (
            <div className="flex items-center gap-1">
              <Soup className="h-4 w-4" />
              <span>{recipe.difficulty}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="ingredients">
          <AccordionItem value="ingredients">
            <AccordionTrigger className="text-base font-bold">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Ingredients
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-2 pl-6 pt-2">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="instructions">
            <AccordionTrigger className="text-base font-bold">
               <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" /> Instructions
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose prose-sm max-w-none whitespace-pre-line pt-2">
                {recipe.instructions}
              </div>
            </AccordionContent>
          </AccordionItem>
          {recipe.nutritionFacts && (
            <AccordionItem value="nutrition">
              <AccordionTrigger className="text-base font-bold">
                <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" /> Nutrition Facts
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="pt-2">{recipe.nutritionFacts}</p>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
