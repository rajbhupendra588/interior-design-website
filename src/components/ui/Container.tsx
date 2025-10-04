import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
}

export function Container({ children, className, size = "lg" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-4xl": size === "sm",
          "max-w-6xl": size === "md",
          "max-w-7xl": size === "lg",
          "max-w-full": size === "full",
        },
        className
      )}
    >
      {children}
    </div>
  );
}


