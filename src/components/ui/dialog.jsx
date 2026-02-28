import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

const Dialog = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'unset')
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

const DialogContent = ({ className, children, onClose, ...props }) => (
  <div
    className={cn(
      'w-full max-w-md rounded-2xl border border-ink/10 bg-white/95 shadow-card backdrop-blur-md p-6',
      'animate-in fade-in zoom-in-95 duration-200',
      className
    )}
    {...props}
  >
    <button
      onClick={onClose}
      className="absolute top-4 right-4 p-1 hover:bg-ink/10 rounded-lg transition"
    >
      <X className="w-5 h-5" />
    </button>
    {children}
  </div>
)

const DialogHeader = ({ className, ...props }) => (
  <div className={cn('mb-4 space-y-2', className)} {...props} />
)

const DialogTitle = ({ className, ...props }) => (
  <h2 className={cn('text-lg font-display font-semibold text-ink', className)} {...props} />
)

const DialogDescription = ({ className, ...props }) => (
  <p className={cn('text-sm text-ink/60', className)} {...props} />
)

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn('flex gap-3 justify-end mt-6 pt-6 border-t border-ink/10', className)}
    {...props}
  />
)

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter }
