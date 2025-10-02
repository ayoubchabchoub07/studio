import type { DietaryPreference, FridgeItem, Recipe, GroceryItem } from './types';

export const DIETARY_PREFERENCES: DietaryPreference[] = [
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'keto', label: 'Keto' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'paleo', label: 'Paleo' },
  { id: 'pescatarian', label: 'Pescatarian' },
  { id: 'low-fodmap', label: 'Low-FODMAP' },
  { id: 'dairy-free', label: 'Dairy-Free' },
];

const today = new Date();
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const initialFridgeItems: FridgeItem[] = [
  { id: '1', name: 'Chicken Breast', category: 'Meat', quantity: '2 lbs', expiryDate: addDays(today, 3).toISOString().split('T')[0] },
  { id: '2', name: 'Broccoli', category: 'Produce', quantity: '1 head', expiryDate: addDays(today, 5).toISOString().split('T')[0] },
  { id: '3', name: 'Milk', category: 'Dairy', quantity: '1/2 gallon', expiryDate: addDays(today, 7).toISOString().split('T')[0] },
  { id: '4', name: 'Eggs', category: 'Dairy', quantity: '1 dozen', expiryDate: addDays(today, 14).toISOString().split('T')[0] },
  { id: '5', name: 'Spinach', category: 'Produce', quantity: '1 bag', expiryDate: addDays(today, 1).toISOString().split('T')[0] },
  { id: '6', name: 'Cheddar Cheese', category: 'Dairy', quantity: '8 oz block', expiryDate: addDays(today, 20).toISOString().split('T')[0] },
  { id: '7', name: 'Frozen Peas', category: 'Frozen', quantity: '1 bag', expiryDate: addDays(today, 365).toISOString().split('T')[0] },
  { id: '8', name: 'Old Carrots', category: 'Produce', quantity: '3', expiryDate: addDays(today, -2).toISOString().split('T')[0] },
];

export const sampleRecipes: Recipe[] = [
    {
        name: "Classic Tomato Bruschetta",
        ingredients: [
            "4 ripe tomatoes, diced",
            "1/2 red onion, finely chopped",
            "2 cloves garlic, minced",
            "1/4 cup fresh basil, chopped",
            "1 tablespoon balsamic vinegar",
            "2 tablespoons olive oil",
            "Salt and pepper to taste",
            "1 baguette, sliced"
        ],
        instructions: "1. In a bowl, combine tomatoes, onion, garlic, and basil. 2. Stir in balsamic vinegar and olive oil. Season with salt and pepper. 3. Toast baguette slices until golden. 4. Top with tomato mixture and serve immediately.",
        nutritionFacts: "Approx. 150 calories per serving.",
        prepTime: '15 minutes',
        difficulty: 'Easy'
    }
];

export const mockMealPlan = {
  monday: { breakfast: 'Oatmeal', lunch: 'Chicken Salad', dinner: 'Spaghetti Bolognese' },
  tuesday: { breakfast: 'Yogurt Parfait', lunch: 'Leftover Spaghetti', dinner: 'Taco Tuesday' },
  wednesday: { breakfast: 'Scrambled Eggs', lunch: 'Tuna Sandwich', dinner: 'Sheet Pan Lemon Herb Chicken' },
  thursday: { breakfast: 'Smoothie', lunch: 'Leftover Chicken', dinner: 'Veggie Stir-fry' },
  friday: { breakfast: 'Avocado Toast', lunch: 'Quinoa Bowl', dinner: 'Pizza Night' },
  saturday: { breakfast: 'Pancakes', lunch: 'Out', dinner: 'Grilled Salmon with Asparagus' },
  sunday: { breakfast: 'Omelette', lunch: 'Leftover Salmon', dinner: 'Roast Chicken' },
};


export const initialGroceryItems: GroceryItem[] = [
  { id: '1', name: 'Avocado', purchased: false },
  { id: '2', name: 'Sourdough Bread', purchased: false },
  { id: '3', name: 'Organic Eggs', purchased: true },
  { id: '4', name: 'Quinoa', purchased: false },
];

export const MOCK_CATEGORIES = Array.from(new Set(initialFridgeItems.map(item => item.category)));

export const mockNutritionData = {
  dailySummary: {
    calories: { value: 1850, goal: 2200 },
    protein: { value: 120, goal: 150 },
    carbs: { value: 200, goal: 250 },
    fat: { value: 60, goal: 70 },
  },
  macros: [
    { name: 'Protein', value: 120, fill: "hsl(var(--chart-1))" },
    { name: 'Carbs', value: 200, fill: "hsl(var(--chart-2))" },
    { name: 'Fat', value: 60, fill: "hsl(var(--chart-3))" },
  ],
};
