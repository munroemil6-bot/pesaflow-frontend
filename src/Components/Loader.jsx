export default function Loader({ text = 'Loading...', size = 'md', fullScreen = false }) {
  const sizeMap = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  }

  return (
    <div className={fullScreen ? 'flex min-h-[200px] items-center justify-center' : 'flex items-center justify-center'}>
      <div className="flex flex-col items-center justify-center gap-3 text-slate-600">
        <div
          className={[
            'animate-spin rounded-full border border-slate-200 border-t-blue-600',
            sizeMap[size] || sizeMap.md,
          ].join(' ')}
          role="status"
          aria-live="polite"
          aria-label={text}
        />

        {text && <span className="text-sm font-medium">{text}</span>}
      </div>
    </div>
  )
}
