'use client';

import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, RadialBar, RadialBarChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { mockNutritionData } from '@/lib/data';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';

export default function NutritionCharts() {
  const { dailySummary, macros } = mockNutritionData;
  const calorieData = [
    { name: 'Consumed', value: dailySummary.calories.value, fill: 'hsl(var(--primary))' },
    { name: 'Remaining', value: Math.max(0, dailySummary.calories.goal - dailySummary.calories.value), fill: 'hsl(var(--muted))' },
  ];

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Macronutrient Breakdown</CardTitle>
          <CardDescription>Your protein, carbs, and fat intake for today.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={macros} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}g`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Calorie Goal</CardTitle>
          <CardDescription>You've consumed {dailySummary.calories.value} of your {dailySummary.calories.goal} kcal goal.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                innerRadius="80%" 
                outerRadius="100%" 
                data={[{ value: (dailySummary.calories.value / dailySummary.calories.goal) * 100, fill: 'hsl(var(--primary))' }]}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={10}
                />
                 <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-3xl font-bold font-headline"
                >
                  {`${Math.round((dailySummary.calories.value / dailySummary.calories.goal) * 100)}%`}
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
