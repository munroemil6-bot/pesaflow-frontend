import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'

const navigation = [
  { label: 'Overview', to: '/admin/dashboard' },
  { label: 'Analytics', to: '/admin/analytics' },
  { label: 'User management', to: '/admin/users' },
  { label: 'Transactions', to: '/transactions' },
]

export default function AdminDashboardLayout({ children }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useSelector((state) => state.auth.user)
  const userName = user?.fullName?.trim() || 'Administrator'
  const initial = userName.charAt(0).toUpperCase()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/', { replace: true })
  }

  const renderNavigation = (mobile = false) => (
    <nav className={mobile ? 'space-y-1 px-4 pb-4' : 'space-y-1 p-4'} aria-label="Admin navigation">
      {navigation.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setIsMenuOpen(false)}
          className={({ isActive }) => `block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6"><Link to="/admin/dashboard" className="flex items-center gap-2.5 font-bold text-slate-900"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white">P</span><span>PesaFlow <span className="text-slate-500">Admin</span></span></Link><div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-xs text-slate-500">Administrator</p><p className="text-sm font-semibold text-slate-900">{userName}</p></div><span className="grid h-9 w-9 place-items-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">{initial}</span><button type="button" onClick={() => setIsMenuOpen((open) => !open)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 lg:hidden" aria-expanded={isMenuOpen} aria-controls="admin-navigation">Menu</button></div></div>
        {isMenuOpen && <div id="admin-navigation" className="border-t border-slate-200 bg-white lg:hidden">{renderNavigation(true)}<div className="px-4 pb-4"><button type="button" onClick={handleLogout} className="w-full rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100">Log out</button></div></div>}
      </header>

      <div className="mx-auto flex max-w-screen-2xl">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          {renderNavigation()}
          <div className="mt-auto border-t border-slate-200 p-4"><div className="rounded-xl bg-slate-900 p-3 text-sm text-white"><p className="font-semibold">Admin workspace</p><p className="mt-1 text-xs leading-5 text-slate-300">Manage platform activity and customer accounts.</p></div><button type="button" onClick={handleLogout} className="mt-3 w-full rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100">Log out</button></div>
        </aside>
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children ?? <Outlet />}</main>
      </div>
    </div>
  )
}
