import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { sampleRecipes, mockMealPlan, initialFridgeItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowUpRight, ChefHat, Refrigerator, CalendarDays, UtensilsCrossed, ShoppingCart } from 'lucide-react';

export default function Dashboard() {
  const recipeImage = PlaceHolderImages.find(p => p.id === 'recipe-placeholder-1');
  const fridgeImage = PlaceHolderImages.find(p => p.id === 'dashboard-fridge');
  const mealPlanImage = PlaceHolderImages.find(p => p.id === 'dashboard-meal-plan');
  
  const expiringSoon = initialFridgeItems.filter(item => {
    const expiry = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3;
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Meal Plan</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{Object.keys(mockMealPlan).length} Days Planned</div>
              <p className="text-xs text-muted-foreground">View and edit your weekly schedule</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fridge Items</CardTitle>
              <Refrigerator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{initialFridgeItems.length} Items</div>
              <p className="text-xs text-muted-foreground">{expiringSoon.length} expiring soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recipe Ideas</CardTitle>
              <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">AI-Powered</div>
              <p className="text-xs text-muted-foreground">Generate recipes from your fridge</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Dinner</CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{mockMealPlan.monday.dinner}</div>
              <p className="text-xs text-muted-foreground">From your meal plan</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Featured Recipe</CardTitle>
                <CardDescription>
                  A simple and delicious recipe to try this week.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/recipes">
                  Generate More
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
                {recipeImage && (
                    <Image
                        alt={recipeImage.description}
                        className="rounded-lg object-cover"
                        height="200"
                        src={recipeImage.imageUrl}
                        data-ai-hint={recipeImage.imageHint}
                        width="300"
                    />
                )}
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold font-headline">{sampleRecipes[0].name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{sampleRecipes[0].instructions.substring(0, 100)}...</p>
                <p className="text-sm font-medium mt-4">Prep time: {sampleRecipes[0].prepTime}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link href="/fridge" className='block p-2 rounded-lg hover:bg-secondary'>
                <div className="flex items-center gap-4">
                  <Refrigerator className="h-6 w-6 text-accent" />
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">Manage Your Fridge</p>
                    <p className="text-sm text-muted-foreground">Add or remove ingredients.</p>
                  </div>
                </div>
              </Link>
              <Link href="/planner" className='block p-2 rounded-lg hover:bg-secondary'>
                <div className="flex items-center gap-4">
                  <CalendarDays className="h-6 w-6 text-accent" />
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">Plan Your Meals</p>
                    <p className="text-sm text-muted-foreground">Create your weekly meal plan.</p>
                  </div>
                </div>
              </Link>
              <Link href="/grocery-list" className='block p-2 rounded-lg hover:bg-secondary'>
                <div className="flex items-center gap-4">
                  <ShoppingCart className="h-6 w-6 text-accent" />
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">View Grocery List</p>
                    <p className="text-sm text-muted-foreground">Check your shopping needs.</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
