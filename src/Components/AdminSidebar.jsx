import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const adminMenuItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: '▦' },
  { label: 'Analytics', to: '/admin/analytics', icon: '◔' },
  { label: 'Users', to: '/admin/users', icon: '♙' },
  { label: 'Transactions', to: '/admin/transactions', icon: '↔' },
]

export default function AdminSidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <aside className="hidden w-72 border-r border-slate-800 bg-slate-950 p-5 text-white lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/20">
          P
        </div>
        <div>
          <p className="text-lg font-bold">PesaFlow</p>
          <p className="text-xs text-slate-400">Admin workspace</p>
        </div>
      </div>

      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Administration
      </p>
      <nav className="space-y-2">
        {adminMenuItems.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span aria-hidden="true" className="w-5 text-center text-base">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 space-y-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Access</p>
          <h3 className="mt-2 text-lg font-semibold">Administrator</h3>
          <p className="mt-1 text-sm text-slate-400">Manage the PesaFlow platform.</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-xl bg-red-500/10 px-4 py-2.5 font-medium text-red-300 transition hover:bg-red-500/20 hover:text-red-200"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
