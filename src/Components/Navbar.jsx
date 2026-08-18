import { Link, NavLink } from 'react-router-dom'
import Button from './Button'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Wallet', to: '/wallet' },
  { label: 'Transactions', to: '/transactions' },
  { label: 'Beneficiaries', to: '/beneficiaries' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-blue-500/30">
            P
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">PesaFlow</p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Secure Money</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/auth/login" className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 sm:inline-flex">
            Login
          </Link>
          <Link to="/auth/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
