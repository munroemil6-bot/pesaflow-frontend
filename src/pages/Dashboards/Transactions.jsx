import React, { useMemo, useState } from 'react'

export default function Transactions() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const transactions = [
    {
      id: 'TX001',
      sender: 'Myles Munroe',
      receiver: 'Nasra Hassan',
      amount: 5000,
      status: 'Completed',
      date: '2026-08-18',
      type: 'Money Transfer',
    },
    {
      id: 'TX002',
      sender: 'Mason',
      receiver: 'Naomi Nafula',
      amount: 2500,
      status: 'Completed',
      date: '2026-08-17',
      type: 'Money Transfer',
    },
    {
      id: 'TX003',
      sender: 'Nasra Hassan',
      receiver: 'Myles Munroe',
      amount: 10000,
      status: 'Pending',
      date: '2026-08-17',
      type: 'Money Transfer',
    },
    {
      id: 'TX004',
      sender: 'Naomi Nafula',
      receiver: 'Mason',
      amount: 3500,
      status: 'Completed',
      date: '2026-08-16',
      type: 'Money Transfer',
    },
    {
      id: 'TX005',
      sender: 'Myles Munroe',
      receiver: 'Naomi Nafula',
      amount: 7500,
      status: 'Failed',
      date: '2026-08-16',
      type: 'Money Transfer',
    },
    {
      id: 'TX006',
      sender: 'John Kamau',
      receiver: 'Aisha Mohammed',
      amount: 4200,
      status: 'Completed',
      date: '2026-08-15',
      type: 'Money Transfer',
    },
    {
      id: 'TX007',
      sender: 'Brian Otieno',
      receiver: 'Grace Wanjiku',
      amount: 8500,
      status: 'Pending',
      date: '2026-08-15',
      type: 'Money Transfer',
    },
    {
      id: 'TX008',
      sender: 'Grace Wanjiku',
      receiver: 'Mason',
      amount: 3000,
      status: 'Completed',
      date: '2026-08-14',
      type: 'Money Transfer',
    },
  ]

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
  }, [search, statusFilter])

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
                        {transaction.id}
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

      {/* =========================
          SUMMARY
      ========================== */}
      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Transactions
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {transactions.length}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Completed
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {
              transactions.filter(
                (transaction) => transaction.status === 'Completed'
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {
              transactions.filter(
                (transaction) => transaction.status === 'Pending'
              ).length
            }
          </p>
        </div>

      </section>

    </div>
  )
}