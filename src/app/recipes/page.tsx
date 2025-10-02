import Header from '@/components/layout/Header';
import { RecipeGenerationForm } from './components/RecipeGenerationForm';

export default function RecipeGeneratorPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="AI Recipes" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-bold font-headline">Personalized Recipe Generator</h1>
          <p className="text-muted-foreground">
            Tell our AI what you have and what you like, and we'll create recipes just for you.
          </p>
        </div>
        <div className="mt-4">
          <RecipeGenerationForm />
        </div>
      </main>
    </div>
  );
}
