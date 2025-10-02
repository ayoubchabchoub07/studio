import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Meal Planner" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-80" />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
