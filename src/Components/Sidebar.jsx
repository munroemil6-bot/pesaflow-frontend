import { NavLink } from 'react-router-dom'

const menuItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Wallet', to: '/wallet' },
  { label: 'Transfer', to: '/transfer/send' },
  { label: 'Beneficiaries', to: '/beneficiaries' },
  { label: 'Transactions', to: '/transactions' },
  { label: 'Profile', to: '/profile' },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-slate-50/80 p-5 lg:block">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
          P
        </div>
        <div>
          <p className="text-lg font-bold text-slate-900">PesaFlow</p>
          <p className="text-xs text-slate-500">Workspace</p>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`
            }
          >
            <span aria-hidden="true">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-4 text-white shadow-xl shadow-slate-900/10">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Security</p>
        <h3 className="mt-2 text-lg font-semibold">Protected</h3>
        <p className="mt-1 text-sm text-slate-300">All transactions are encrypted and verified.</p>
      </div>
    </aside>
  )
}
