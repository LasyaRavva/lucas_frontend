import { cn } from '../../lib/utils'

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-lg border border-ink/20 bg-white/60 px-4 py-2 text-sm placeholder:text-ink/40 transition focus:border-sea/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sea/20 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Input }
