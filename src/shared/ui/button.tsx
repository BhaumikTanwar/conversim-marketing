import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // active:scale is global (every variant should give press feedback); hover lift is per-variant since it looks jittery on `ghost`'s tight inline icon buttons.
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-[transform,background-color,box-shadow,border-color,color] duration-200 ease-out outline-none select-none active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-aurora-bg disabled:pointer-events-none disabled:opacity-40 disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-brand text-white border border-brand/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_2px_8px_rgba(37,99,235,0.25)] hover:bg-brand-hover hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_6px_18px_rgba(37,99,235,0.35)] hover:-translate-y-px",
        secondary:
          "bg-slate-100 text-slate-800 border border-slate-200/90 hover:bg-slate-200/80 hover:text-slate-900 hover:-translate-y-px",
        outline:
          "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-2xs hover:-translate-y-px",
        ghost: "bg-transparent text-slate-600 border border-transparent hover:bg-slate-100 hover:text-slate-900",
        destructive:
          "bg-[#d64545] text-white border border-[#d64545] hover:bg-[#b83737] shadow-2xs hover:-translate-y-px",
        link: "border-transparent text-brand underline-offset-4 hover:underline font-medium",
        subtle: "bg-accent-50 text-accent-700 border border-accent-200 hover:bg-accent-100 hover:-translate-y-px",
      },
      size: {
        default: "px-4 py-2.5 text-sm h-10",
        sm: "px-3 py-1.5 text-xs h-8",
        lg: "px-6 py-3 text-base h-12",
        icon: "p-2 h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
// Type-only export: exporting the value would break Fast Refresh by mixing a component export with a non-component one.
export type { buttonVariants };
