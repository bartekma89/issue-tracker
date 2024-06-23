import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-3xl font-bold">
        <Skeleton className="h-9 w-auto" />
      </h2>
      <div className="flex space-x-3">
        <Skeleton className="h-5 w-[40%]" />
        <Skeleton className="h-5 w-[60%]" />
      </div>
      <article>
        <Skeleton className="h-11 w-auto" />
      </article>
    </div>
  );
}
