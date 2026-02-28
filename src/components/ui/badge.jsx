import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        coral: 'border-coral/30 bg-coral/15 text-coral',
        sea: 'border-sea/30 bg-sea/15 text-sea',
        moss: 'border-moss/30 bg-moss/15 text-moss',
        clay: 'border-clay/30 bg-clay/15 text-clay',
      },
    },
    defaultVariants: {
      variant: 'coral',
    },
  }
)

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
