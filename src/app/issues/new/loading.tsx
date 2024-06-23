import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-xl space-y-3">
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="h-60 w-auto" />
    </div>
  );
}
