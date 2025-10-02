import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="My Fridge" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
            <div className="grid gap-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-6 w-80" />
            </div>
            <Skeleton className="h-10 w-28 ml-auto" />
        </div>
        <div className="mt-4 space-y-8">
            {[1, 2, 3].map(i => (
                <div key={i}>
                    <Skeleton className="h-7 w-32 mb-4" />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[1, 2, 3, 4].map(j => (
                            <Skeleton key={j} className="h-24 w-full" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
