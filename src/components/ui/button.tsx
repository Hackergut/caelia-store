import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[11px] uppercase tracking-[0.22em] transition-colors disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-burgundy text-cream hover:bg-burgundy-deep",
        outline:
          "border border-mist bg-transparent text-ink hover:border-burgundy hover:text-burgundy",
        ghost: "text-ink hover:bg-cream-deep",
        link: "text-burgundy underline-offset-8 hover:underline tracking-[0.2em]",
        subtle: "bg-cream-deep text-ink hover:bg-mist",
      },
      size: {
        // 44px+ touch targets on mobile, tighter on desktop
        default: "h-12 px-6 md:h-11 md:px-7",
        sm: "h-11 px-4 md:h-9 md:px-4",
        lg: "h-14 px-8 text-xs",
        icon: "h-11 w-11 md:h-10 md:w-10",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "default", size: "default", block: false },
  },
);

function Button({
  className,
  variant,
  size,
  block,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, block, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
