import { cn } from '../../lib/utils'

function ProgressBar({ value = 0, className }) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-ink/10', className)}>
      <div
        className="h-full bg-gradient-to-r from-coral to-sea transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export { ProgressBar }
