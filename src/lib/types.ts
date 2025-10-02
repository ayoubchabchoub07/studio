import type { LucideIcon } from 'lucide-react';

export type Recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  nutritionFacts?: string;
  prepTime?: string;
  difficulty?: string;
};

export type DietaryPreference = {
  id: string;
  label: string;
};

export type FridgeItem = {
  id: string;
  name: string;
  category: string;
  expiryDate: string; 
  quantity: string;
};

export type GroceryItem = {
  id: string;
  name: string;
  purchased: boolean;
};

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
};
