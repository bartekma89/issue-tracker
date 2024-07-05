import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFormSkeleton() {
  return (
    <div className="max-w-xl space-y-3">
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="h-[23rem] w-auto" />
    </div>
  );
}
