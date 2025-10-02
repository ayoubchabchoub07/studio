'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DIETARY_PREFERENCES } from '@/lib/data';
import { generateRecipesAction } from '../actions';
import RecipeCard from './RecipeCard';
import type { Recipe } from '@/lib/types';
import { Loader2, Sparkles, Terminal } from 'lucide-react';

const formSchema = z.object({
  dietaryPreferences: z.array(z.string()).default([]),
  availableIngredients: z.string().min(1, 'Please list at least one ingredient.'),
  prepTime: z.string().optional(),
  difficulty: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RecipeGenerationForm() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryPreferences: [],
      availableIngredients: '',
      prepTime: 'any',
      difficulty: 'any',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    const result = await generateRecipesAction({
      ...values,
      availableIngredients: values.availableIngredients.split(',').map(s => s.trim()).filter(Boolean),
      prepTime: values.prepTime === 'any' ? undefined : values.prepTime,
      difficulty: values.difficulty === 'any' ? undefined : values.difficulty,
    });

    if (result.success && result.data?.recipes) {
      setRecipes(result.data.recipes);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="mx-auto w-full max-w-6xl items-start gap-6 md:grid md:grid-cols-[250px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recipe Filters</CardTitle>
          <CardDescription>Refine your recipe generation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="availableIngredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Ingredients</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g. chicken breast, broccoli, garlic" {...field} />
                    </FormControl>
                    <FormDescription>Separate ingredients with a comma.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietaryPreferences"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Dietary Preferences</FormLabel>
                      <FormDescription>Select any that apply.</FormDescription>
                    </div>
                    {DIETARY_PREFERENCES.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="dietaryPreferences"
                        render={({ field }) => {
                          return (
                            <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(field.value?.filter((value) => value !== item.id));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
              
              <FormField
                  control={form.control}
                  name="prepTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Prep Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="15 minutes">Under 15 mins</SelectItem>
                          <SelectItem value="30 minutes">Under 30 mins</SelectItem>
                          <SelectItem value="1 hour">Under 1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Any difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />


              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Recipes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="grid gap-6">
        {isLoading && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-xl font-bold tracking-tight font-headline">AI is thinking...</h3>
                <p className="text-sm text-muted-foreground">Generating delicious recipes just for you.</p>
            </div>
        )}
        {error && (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Generation Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {recipes.length > 0 && (
          <div className="grid gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} index={index} />
            ))}
          </div>
        )}
        {!isLoading && !error && recipes.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center h-full">
            <Sparkles className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold tracking-tight font-headline">Ready to Cook?</h3>
            <p className="text-sm text-muted-foreground">Fill out the form to generate personalized recipes.</p>
          </div>
        )}
      </div>
    </div>
  );
}
