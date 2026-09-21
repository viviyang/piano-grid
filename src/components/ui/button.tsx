// Adapted from shadcn/ui new-york Button (MIT), retrieved 2026-09-21.
// Source/license: checks/piano-design-system-fix/COMPONENT-SOURCES.md.
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('am-button', {
  variants: { variant: { default: 'am-primary', secondary: 'am-secondary', ghost: 'am-tertiary' } },
  defaultVariants: { variant: 'default' },
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant }), className)} ref={ref} {...(!asChild ? { type } : {})} {...props}/>;
  },
);
Button.displayName = 'Button';
export { Button, buttonVariants };
