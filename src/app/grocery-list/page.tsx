import Header from '@/components/layout/Header';
import GroceryListManager from './components/GroceryListManager';

export default function GroceryListPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Grocery List" />
      <main className="flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
         <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold font-headline">Shopping List</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Manage your grocery needs. Add items manually or generate a list from your meal plan.
          </p>
        </div>
        <GroceryListManager />
      </main>
    </div>
  );
}
