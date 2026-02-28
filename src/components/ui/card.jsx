import { cn } from '../../lib/utils'

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-card backdrop-blur-md',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return <div className={cn('mb-4 space-y-2', className)} {...props} />
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn('font-display text-xl font-semibold text-ink', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return <div className={cn('text-sm text-ink/70', className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardContent }
