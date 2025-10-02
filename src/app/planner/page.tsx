import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockMealPlan } from '@/lib/data';
import { Utensils } from 'lucide-react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function PlannerPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Meal Planner" />
      <main className="flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold font-headline">Weekly Meal Planner</h1>
          <p className="text-muted-foreground">
            Organize your week, your way. Drag and drop recipes to build your perfect meal plan.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {daysOfWeek.map(day => {
            const dayKey = day.toLowerCase() as keyof typeof mockMealPlan;
            const meals = mockMealPlan[dayKey];
            return (
              <div key={day} className="flex flex-col gap-4">
                <h2 className="text-center text-xl font-semibold font-headline">{day}</h2>
                <Card className="flex-grow">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">Breakfast</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Utensils className="h-4 w-4" />
                        <span>{meals.breakfast}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex-grow">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">Lunch</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Utensils className="h-4 w-4" />
                        <span>{meals.lunch}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex-grow">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">Dinner</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Utensils className="h-4 w-4" />
                        <span>{meals.dinner}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
