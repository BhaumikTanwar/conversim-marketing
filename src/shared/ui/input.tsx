import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full min-w-0 rounded-lg border border-aurora-border bg-aurora-surface px-4 py-2.5 text-sm text-aurora-text outline-none transition-all placeholder:text-aurora-text-3  shadow-2xs disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
