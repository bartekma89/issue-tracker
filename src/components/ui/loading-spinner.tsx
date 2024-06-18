import { cn } from "@/lib/utils";
import React, { forwardRef, HTMLAttributes } from "react";

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-16 h-16 border-4 border-t-4 border-gray-300 border-t-gray-600 rounded-full animate-spin",
          className
        )}
        {...rest}
      />
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner };
