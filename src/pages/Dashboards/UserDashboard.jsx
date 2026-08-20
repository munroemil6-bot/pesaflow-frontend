import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const currency = (amount) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(Number(amount) || 0)

const dateLabel = (value) => {
  if (!value) return 'Just now'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Recently' : new Intl.DateTimeFormat('en-KE', { dateStyle: 'medium' }).format(date)
}

const normaliseType = (transaction) => String(transaction.type || transaction.direction || '').toLowerCase()

export default function UserDashboard() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const authLoading = useSelector((state) => state.auth.isLoading)
  const { balance, currency: walletCurrency, isLoading: walletLoading } = useSelector((state) => state.wallet)
  const { list: transactions, recent, isLoading: transactionsLoading } = useSelector((state) => state.transactions)

  const recentTransactions = recent.length ? recent : transactions.slice(0, 5)
  const isLoading = authLoading || walletLoading || transactionsLoading
  const firstName = user?.fullName?.trim().split(/\s+/)[0] || 'there'

  const stats = useMemo(() => transactions.reduce((summary, transaction) => {
    const amount = Number(transaction.amount) || 0
    const status = String(transaction.status || 'completed').toLowerCase()
    const type = normaliseType(transaction)
    if (status === 'pending') summary.pending += 1
    if (status === 'failed') summary.failed += 1
    if (type === 'received' || type === 'credit' || type === 'in') summary.received += amount
    else if (type === 'sent' || type === 'debit' || type === 'out') summary.sent += amount
    return summary
  }, { sent: 0, received: 0, pending: 0, failed: 0 }), [transactions])

  if (!authLoading && !user) return <Navigate to="/auth/login" replace />

  const statCards = [
    { label: 'Money sent', value: currency(stats.sent), detail: 'Completed outgoing transfers', tone: 'bg-blue-50 text-blue-700' },
    { label: 'Money received', value: currency(stats.received), detail: 'Completed incoming transfers', tone: 'bg-emerald-50 text-emerald-700' },
    { label: 'Pending', value: stats.pending.toLocaleString('en-KE'), detail: 'Transfers awaiting completion', tone: 'bg-amber-50 text-amber-700' },
    { label: 'Failed', value: stats.failed.toLocaleString('en-KE'), detail: 'Transfers that need attention', tone: 'bg-red-50 text-red-700' },
  ]

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8"><p className="text-sm font-semibold text-emerald-600">YOUR WALLET</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Welcome back, {firstName} <span aria-hidden="true">👋</span></h1><p className="mt-2 text-sm text-slate-600">Manage your money, transfers, and contacts in one secure place.</p></header>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-500 p-6 text-white shadow-xl shadow-emerald-700/20 sm:p-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-emerald-100">Available balance</p><p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{isLoading ? '—' : new Intl.NumberFormat('en-KE', { style: 'currency', currency: walletCurrency || 'KES', maximumFractionDigits: 0 }).format(Number(balance) || 0)}</p><p className="mt-3 text-sm text-emerald-100">Send and receive money securely with PesaFlow.</p></div><div className="flex flex-wrap gap-3"><button type="button" onClick={() => navigate('/wallet/add-funds')} className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50">Add funds</button><button type="button" onClick={() => navigate('/transfer/send')} className="rounded-xl border border-white/40 bg-emerald-800/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900/20">Send money</button></div></div></section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Transfer summary">{statCards.map((card) => <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold ${card.tone}`}>{card.label}</span><p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{isLoading ? '—' : card.value}</p><p className="mt-1 text-sm text-slate-500">{card.detail}</p></article>)}</section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4"><div><h2 className="font-bold text-slate-900">Recent transactions</h2><p className="mt-1 text-sm text-slate-500">Your latest money movement.</p></div><Link to="/transactions" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:underline">View all transactions</Link></div>{isLoading ? <LoadingRows /> : recentTransactions.length === 0 ? <div className="px-5 py-12 text-center"><p className="font-semibold text-slate-800">No transactions yet</p><p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">When you send or receive money, your activity will appear here.</p><Link to="/transfer/send" className="mt-5 inline-flex rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Send money</Link></div> : <ul className="divide-y divide-slate-100">{recentTransactions.map((transaction, index) => <TransactionRow key={transaction.id || `${transaction.reference || 'transaction'}-${index}`} transaction={transaction} onClick={() => transaction.id && navigate(`/transactions/${transaction.id}`)} />)}</ul>}</section>
    </main>
  )
}

function TransactionRow({ transaction, onClick }) {
  const type = normaliseType(transaction)
  const received = type === 'received' || type === 'credit' || type === 'in'
  const title = transaction.recipient || transaction.receiver || transaction.sender || transaction.beneficiaryName || transaction.description || 'Money transfer'
  const status = transaction.status || 'Completed'
  const canOpen = Boolean(transaction.id)
  return <li><button type="button" onClick={onClick} disabled={!canOpen} className={`flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left transition ${canOpen ? 'hover:bg-slate-50 focus:bg-slate-50' : 'cursor-default'}`}><div className="flex min-w-0 items-center gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold ${received ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{received ? '↓' : '↑'}</span><div className="min-w-0"><p className="truncate font-semibold text-slate-900">{title}</p><p className="mt-1 text-sm text-slate-500">{dateLabel(transaction.createdAt || transaction.date)} · {status}</p></div></div><p className={`font-bold ${received ? 'text-emerald-700' : 'text-slate-900'}`}>{received ? '+' : '-'}{currency(transaction.amount)}</p></button></li>
}

function LoadingRows() {
  return <div className="space-y-5 p-5" aria-label="Loading transactions">{Array.from({ length: 4 }, (_, index) => <div key={index} className="animate-pulse"><div className="h-4 w-2/5 rounded bg-slate-200" /><div className="mt-2 h-3 w-1/4 rounded bg-slate-100" /></div>)}</div>
}
