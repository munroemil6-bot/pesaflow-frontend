import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'

const navigation = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Wallet', to: '/wallet' },
  { label: 'Send money', to: '/transfer/send' },
  { label: 'Beneficiaries', to: '/beneficiaries' },
  { label: 'Transactions', to: '/transactions' },
  { label: 'Profile', to: '/profile' },
]

export default function UserDashboardLayout({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const userName = user?.fullName?.trim() || 'PesaFlow user'
  const initial = userName.charAt(0).toUpperCase()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/', { replace: true })
  }

  const renderNavigation = (mobile = false) => (
    <nav className={mobile ? 'space-y-1 px-4 pb-4' : 'space-y-1 p-4'} aria-label="Main navigation">
      {navigation.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive }) => `block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'}`}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link to="/dashboard" className="flex items-center gap-2.5 font-bold text-slate-900"><span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white">P</span><span>PesaFlow</span></Link>
          <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-xs text-slate-500">Welcome back</p><p className="text-sm font-semibold text-slate-900">{userName}</p></div><Link to="/profile" aria-label="Open profile" className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">{initial}</Link><button type="button" onClick={() => setIsMenuOpen((open) => !open)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 lg:hidden" aria-expanded={isMenuOpen} aria-controls="user-navigation">Menu</button></div>
        </div>
        {isMenuOpen && <div id="user-navigation" className="border-t border-slate-200 bg-white lg:hidden">{renderNavigation(true)}<div className="px-4 pb-4"><button type="button" onClick={handleLogout} className="w-full rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100">Log out</button></div></div>}
      </header>

      <div className="mx-auto flex max-w-screen-2xl">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          {renderNavigation()}
          <div className="mt-auto border-t border-slate-200 p-4"><div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-900"><p className="font-semibold">Your account is protected</p><p className="mt-1 text-xs leading-5 text-emerald-700">PesaFlow keeps your transfers private and secure.</p></div><button type="button" onClick={handleLogout} className="mt-3 w-full rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100">Log out</button></div>
        </aside>
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children ?? <Outlet />}</main>
      </div>
    </div>
  )
}
