import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

const formatCurrency = (amount) => new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
}).format(Number(amount) || 0)

const formatDate = (value) => {
  if (!value) return 'Just now'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Recently' : new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium' }).format(date)
}

export default function AdminDashboard() {
  const user = useSelector((state) => state.auth.user)
  const isAuthLoading = useSelector((state) => state.auth.isLoading)
  const transactions = useSelector((state) => state.transactions.list)
  const users = useSelector((state) => state.users.list)
  const isTransactionLoading = useSelector((state) => state.transactions.isLoading)

  const metrics = useMemo(() => {
    const totalVolume = transactions.reduce((sum, transaction) => sum + (Number(transaction.amount) || 0), 0)
    const revenue = transactions.reduce((sum, transaction) => sum + (Number(transaction.fee ?? transaction.transactionFee) || 0), 0)
    return { totalUsers: users.length, totalTransactions: transactions.length, totalVolume, revenue }
  }, [transactions, users])

  const recentTransactions = useMemo(() => transactions.slice(0, 5), [transactions])
  const recentUsers = users.slice(0, 5)
  const isLoading = isAuthLoading || isTransactionLoading

  if (!isAuthLoading && !user) return <Navigate to="/auth/login" replace />
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />

  const cards = [
    { label: 'Total users', value: metrics.totalUsers.toLocaleString('en-KE'), hint: 'Registered accounts', tone: 'bg-blue-50 text-blue-700' },
    { label: 'Transactions', value: metrics.totalTransactions.toLocaleString('en-KE'), hint: 'Recorded transfers', tone: 'bg-violet-50 text-violet-700' },
    { label: 'Transfer volume', value: formatCurrency(metrics.totalVolume), hint: 'Across all transfers', tone: 'bg-emerald-50 text-emerald-700' },
    { label: 'Revenue', value: formatCurrency(metrics.revenue), hint: 'Fees collected', tone: 'bg-amber-50 text-amber-700' },
  ]

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-emerald-600">ADMIN WORKSPACE</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Admin dashboard</h1><p className="mt-2 text-sm text-slate-600">Monitor platform activity, transfers, and account growth.</p></div><Link to="/admin/analytics" className="rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50">View analytics</Link></header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Platform metrics">
        {cards.map((card) => <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold ${card.tone}`}>{card.label}</span><p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{isLoading ? '—' : card.value}</p><p className="mt-1 text-sm text-slate-500">{card.hint}</p></article>)}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-bold text-slate-900">Recent transactions</h2><p className="mt-1 text-sm text-slate-500">Latest transfer activity across the platform.</p></div><Link to="/transactions" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">View all</Link></div>{isLoading ? <LoadingRows count={4} /> : recentTransactions.length === 0 ? <EmptyState title="No transactions yet" detail="Transactions will appear here as customers begin transferring money." /> : <ul className="divide-y divide-slate-100">{recentTransactions.map((transaction, index) => <li key={transaction.id || `${transaction.reference || 'transaction'}-${index}`} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><p className="font-semibold text-slate-900">{transaction.recipient || transaction.beneficiaryName || transaction.description || 'Money transfer'}</p><p className="mt-1 text-sm text-slate-500">{formatDate(transaction.createdAt || transaction.date)} · {transaction.status || 'Completed'}</p></div><p className="font-bold text-slate-900">{formatCurrency(transaction.amount)}</p></li>)}</ul>}</section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h2 className="font-bold text-slate-900">Recent users</h2><p className="mt-1 text-sm text-slate-500">Latest registered account activity.</p></div>{isLoading ? <LoadingRows count={2} /> : recentUsers.length === 0 ? <EmptyState title="No users yet" detail="New user accounts will appear here." /> : <ul className="divide-y divide-slate-100">{recentUsers.map((recentUser) => <li key={recentUser.id} className="flex items-center gap-3 px-5 py-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 font-bold text-emerald-700">{(recentUser.fullName || 'P').charAt(0).toUpperCase()}</span><div className="min-w-0"><p className="truncate font-semibold text-slate-900">{recentUser.fullName || 'PesaFlow user'}</p><p className="truncate text-sm text-slate-500">{recentUser.email || recentUser.phone || 'Account created'}</p></div></li>)}</ul>}<div className="border-t border-slate-100 p-4"><Link to="/admin/users" className="block rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-slate-800">Manage users</Link></div></section>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-bold text-slate-900">Quick actions</h2><p className="mt-1 text-sm text-slate-600">Jump directly to the administrative tools you need.</p><div className="mt-5 grid gap-3 sm:grid-cols-3"><QuickLink to="/admin/users" title="Manage users" detail="Review customer accounts" /><QuickLink to="/transactions" title="Review transfers" detail="See all transaction records" /><QuickLink to="/admin/analytics" title="View analytics" detail="Explore platform trends" /></div></section>
    </main>
  )
}

function QuickLink({ to, title, detail }) {
  return <Link to={to} className="rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"><p className="font-semibold text-slate-900">{title}</p><p className="mt-1 text-sm text-slate-600">{detail}</p></Link>
}

function EmptyState({ title, detail }) {
  return <div className="px-5 py-10 text-center"><p className="font-semibold text-slate-800">{title}</p><p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">{detail}</p></div>
}

function LoadingRows({ count }) {
  return <div className="space-y-4 p-5" aria-label="Loading dashboard data">{Array.from({ length: count }, (_, index) => <div key={index} className="animate-pulse"><div className="h-4 w-2/5 rounded bg-slate-200" /><div className="mt-2 h-3 w-1/4 rounded bg-slate-100" /></div>)}</div>
}
