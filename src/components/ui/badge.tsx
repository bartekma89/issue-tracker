import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Status } from "@prisma/client";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        [Status.OPEN]:
          "border-transparent bg-red-700 text-primary-foreground hover:bg-red-700/80",
        [Status.IS_PROGRESS]:
          "border-transparent bg-blue-600 text-primary-foreground hover:bg-blue-600/80",
        [Status.CLOSED]:
          "border-transparent bg-green-700 text-primary-foreground hover:bg-green-700/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
