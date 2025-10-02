import Header from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Beef, Wheat, Droplet } from 'lucide-react';
import { mockNutritionData } from '@/lib/data';
import NutritionCharts from './components/NutritionCharts';
import { Progress } from '@/components/ui/progress';

export default function NutritionPage() {
    const { dailySummary } = mockNutritionData;
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Nutrition Tracker" />
      <main className="flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold font-headline">Today's Nutrition</h1>
          <p className="text-muted-foreground">
            Monitor your daily intake to stay on track with your health goals.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calories</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{dailySummary.calories.value} <span className="text-sm text-muted-foreground">/ {dailySummary.calories.goal} kcal</span></div>
              <Progress value={(dailySummary.calories.value / dailySummary.calories.goal) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protein</CardTitle>
              <Beef className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{dailySummary.protein.value}g <span className="text-sm text-muted-foreground">/ {dailySummary.protein.goal}g</span></div>
              <Progress value={(dailySummary.protein.value / dailySummary.protein.goal) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carbohydrates</CardTitle>
              <Wheat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{dailySummary.carbs.value}g <span className="text-sm text-muted-foreground">/ {dailySummary.carbs.goal}g</span></div>
              <Progress value={(dailySummary.carbs.value / dailySummary.carbs.goal) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fat</CardTitle>
              <Droplet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{dailySummary.fat.value}g <span className="text-sm text-muted-foreground">/ {dailySummary.fat.goal}g</span></div>
              <Progress value={(dailySummary.fat.value / dailySummary.fat.goal) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>
        
        <NutritionCharts />
      </main>
    </div>
  );
}
