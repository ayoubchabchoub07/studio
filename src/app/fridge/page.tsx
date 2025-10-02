import Header from '@/components/layout/Header';
import FridgeManager from './components/FridgeManager';

export default function FridgePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="My Fridge" />
      <main className="flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <FridgeManager />
      </main>
    </div>
  );
}
