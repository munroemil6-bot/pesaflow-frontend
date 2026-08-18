const cn = (...classes) => classes.filter(Boolean).join(' ')

export default function Input({label, id, type = 'text', error, className = '', ...props}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        className={cn(
          'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500/10',
          className,
        )}
        {...props}
      />

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}
