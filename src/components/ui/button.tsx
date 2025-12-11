import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-primary-500 hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        huge: "btn-xl px-[1.25rem] py-[17px]",
        extraLarge: "btn-xl px-[1.25rem] py-[1rem]",
        large: "btn-l px-[1.25rem] py-[14px]",
        medium: "btn-m px-[1rem] py-[10px]",
        small: "caption-lr px-[0.75rem] py-[0.5rem]",
        extraSmall: "caption-lr px-[10px] py-[6px]",
        tiny: "caption-mr px-[0.5rem] py-[0.25rem]",
      },
      color: {
        primary:
          "bg-primary-500 text-primary-500 border-primary-500 hover:bg-primary-600 focus-visible:bg-primary-700 disabled:bg-primary-100",
        secondary:
          "bg-neutral-500 text-neutral-500 border-neutral-500 hover:bg-neutral-600 focus-visible:bg-neutral-700 disabled:bg-neutral-100",
        error:
          "bg-error-500 text-error-500 border-error-500 hover:bg-error-600 focus-visible:bg-error-700 disabled:bg-error-100",
        success:
          "bg-success-500 text-success-500 border-success-500 hover:bg-success-600 focus-visible:bg-success-700 disabled:bg-success-100",
        warning:
          "bg-warning-500 text-warning-500 border-warning-500 hover:bg-warning-600 focus-visible:bg-warning-700 disabled:bg-warning-100",
      },
      style: {
        filled: "text-white border-none",
        outlined:
          "border border-solid border-1 bg-transparent hover:bg-primary-600/8 focus-visible:bg-primary-700/16",
        ghost: "bg-transparents hover:bg-opacity-50  hover:text-white dark:hover:bg-accent/50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "huge",
      color: "primary",
      style: "filled",
    },
  }
);

function Button({
  className,
  variant,
  size,
  color,
  style,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, style, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
