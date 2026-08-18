import { Link } from 'react-router-dom'

export default function Navbar() {
  // TODO: Get user name from Redux/auth context
  const userName = localStorage.getItem('userName') || 'User'

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 text-lg font-bold text-white shadow-lg shadow-green-500/30">
            P
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">PesaFlow</p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Secure Money</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">Welcome back</p>
            <p className="text-lg font-bold text-green-600">{userName}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <span className="text-sm font-bold text-green-600">{userName.charAt(0).toUpperCase()}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
