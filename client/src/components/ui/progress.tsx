import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, indicatorClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary/20",
          className
        )}
        {...props}
      >
        <div
          className={cn("h-full transition-all duration-300", indicatorClassName)}
          style={{ width: `${value || 0}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
