const cn = (...classes) => classes.filter(Boolean).join(' ')

export default function Button({children, type = 'button', variant = 'primary', size = 'md', fullWidth = false, className = '', ...props}) {
  const variants = {
    primary: 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 hover:bg-blue-700 focus:ring-blue-500/40',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500/20',
    success: 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 hover:bg-emerald-700 focus:ring-emerald-500/40',
    danger: 'bg-red-600 text-white shadow-sm shadow-red-600/30 hover:bg-red-700 focus:ring-red-500/40',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400/20',
    outline: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400/20',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  }

  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
