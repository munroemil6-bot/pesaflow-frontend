import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Transactions() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const storedTransactions = useSelector((state) => state.transactions.list)
  const transactions = storedTransactions.map((transaction) => ({
    ...transaction,
    sender: transaction.sender || 'Customer',
    receiver: transaction.receiver || transaction.recipient || 'Recipient',
    status: normalizeStatus(transaction.status),
    date: transaction.date || transaction.createdAt,
    type: transaction.type || 'Money Transfer',
  }))

  const summary = {
    total: transactions.length,
    completed: transactions.filter((transaction) => transaction.status === 'Completed').length,
    pending: transactions.filter((transaction) => transaction.status === 'Pending').length,
    failed: transactions.filter((transaction) => transaction.status === 'Failed').length,
  }

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        transaction.id.toLowerCase().includes(searchText) ||
        transaction.sender.toLowerCase().includes(searchText) ||
        transaction.receiver.toLowerCase().includes(searchText)

      const matchesStatus =
        statusFilter === 'All' ||
        transaction.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter, transactions])

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700'

      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'

      case 'Failed':
        return 'bg-red-100 text-red-700'

      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* =========================
          HEADER
      ========================== */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Transactions
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          View and manage PesaFlow transactions
        </p>
      </div>

      {/* =========================
          SEARCH & FILTERS
      ========================== */}
      <section className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* Search */}
          <div className="lg:col-span-2">
            <label
              htmlFor="transaction-search"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Search Transactions
            </label>

            <input
              id="transaction-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by transaction ID, sender or receiver..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status-filter"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Filter by Status
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Transactions</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total Transactions" value={summary.total} />
        <SummaryCard label="Completed" value={summary.completed} tone="text-green-600" />
        <SummaryCard label="Pending" value={summary.pending} tone="text-yellow-600" />
        <SummaryCard label="Failed" value={summary.failed} tone="text-red-600" />
      </section>

      {/* =========================
          TRANSACTIONS LIST
      ========================== */}
      <section className="overflow-hidden rounded-xl bg-white shadow-sm">

        {/* Section heading */}
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Transactions List
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredTransactions.length} transactions found
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">

            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Transaction ID
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Sender
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Receiver
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Amount
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Type
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredTransactions.length > 0 ? (

                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="transition hover:bg-gray-50"
                  >

                    {/* Transaction ID */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="font-medium text-gray-900">
                        {transaction.id.replace(/^demo-/, '')}
                      </span>
                    </td>

                    {/* Sender */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm text-gray-700">
                        {transaction.sender}
                      </span>
                    </td>

                    {/* Receiver */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm text-gray-700">
                        {transaction.receiver}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        KES {transaction.amount.toLocaleString()}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm text-gray-600">
                        {transaction.date}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm text-gray-600">
                        {transaction.type}
                      </span>
                    </td>

                  </tr>
                ))

              ) : (

                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center"
                  >
                    <p className="text-sm font-medium text-gray-700">
                      No transactions found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>

              )}

            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}

function normalizeStatus(status) {
  const value = String(status || 'pending').toLowerCase()
  if (value === 'successful' || value === 'success' || value === 'completed') return 'Completed'
  if (value === 'failed' || value === 'failure') return 'Failed'
  return 'Pending'
}

function SummaryCard({ label, value, tone = 'text-gray-900' }) {
  return <div className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">{label}</p><p className={`mt-2 text-2xl font-bold ${tone}`}>{value}</p></div>
}