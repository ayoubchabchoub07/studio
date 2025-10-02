import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="AI Recipes" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-80" />
        </div>
        <div className="mx-auto w-full max-w-6xl items-start gap-6 md:grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <div className="grid auto-rows-max items-start gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="grid gap-6">
            <Skeleton className="h-[500px] w-full" />
            <Skeleton className="h-[500px] w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}
