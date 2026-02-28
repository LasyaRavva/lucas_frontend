import { cn } from '../../lib/utils'

const Textarea = ({ className, ...props }) => (
  <textarea
    className={cn(
      'flex min-h-[100px] w-full rounded-lg border border-ink/15 bg-white/50 px-4 py-3 text-sm font-body',
      'placeholder:text-ink/40 focus:border-sea focus:outline-none focus:ring-2 focus:ring-sea/20',
      'disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none',
      className
    )}
    {...props}
  />
)

export { Textarea }
