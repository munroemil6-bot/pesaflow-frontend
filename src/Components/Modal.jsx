import { useEffect } from 'react'

const cn = (...classes) => classes.filter(Boolean).join(' ')

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className = '',
}) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={cn(
          'w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl',
          sizes[size] || sizes.md,
          className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || description || onClose) && (
          <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
            <div>
              {title && (
                <h3 id="modal-title" className="text-lg font-semibold text-slate-900">
                  {title}
                </h3>
              )}
              {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                aria-label="Close modal"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  )
}
