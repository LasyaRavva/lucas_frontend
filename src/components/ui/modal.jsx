import { X } from 'lucide-react'

import { cn } from '../../lib/utils'

function Modal({ open, onOpenChange, children }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm">
      <div
        className="rounded-2xl bg-parchment shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

function ModalContent({ className, children, onClose, ...props }) {
  return (
    <div className={cn('relative', className)} {...props}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-ink/50 transition hover:text-ink"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      {children}
    </div>
  )
}

export { Modal, ModalContent }
