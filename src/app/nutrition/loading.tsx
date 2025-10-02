import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Nutrition" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-80" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 mt-4">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
        </div>
      </main>
    </div>
  );
}
