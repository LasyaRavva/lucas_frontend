import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-coral text-white shadow-soft hover:-translate-y-0.5 hover:shadow-card',
        secondary: 'bg-white text-ink border border-ink/10 hover:border-ink/30',
        ghost: 'bg-transparent text-ink hover:bg-ink/5',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-6',
        lg: 'h-12 px-7 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

function Button({ className, variant, size, ...props }) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
}

export { Button, buttonVariants }
