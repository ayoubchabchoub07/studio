import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Grocery List" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-80" />
        </div>
        <div className="w-full max-w-2xl mx-auto mt-8 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <div className="flex justify-end pt-4">
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
      </main>
    </div>
  );
}
