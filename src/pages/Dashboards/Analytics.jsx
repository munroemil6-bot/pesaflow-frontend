import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Analytics() {
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)
  const transactions = useSelector((state) => state.transactions.list)
  const users = useSelector((state) => state.users.list)

  const [dateRange, setDateRange] = useState('7')

  // Check that the logged-in user is an admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const analyticsData = useMemo(() => {
    const rangeDays = Number(dateRange)
    const now = Date.now()
    const rangeStart = now - rangeDays * 24 * 60 * 60 * 1000
    const filteredTransactions = transactions.filter((transaction) => new Date(transaction.date || transaction.createdAt).getTime() >= rangeStart)
    const bucketSize = Math.max(1, Math.ceil(rangeDays / 7))
    const buckets = Array.from({ length: 7 }, (_, index) => {
      const end = now - (6 - index) * bucketSize * 24 * 60 * 60 * 1000
      const start = end - bucketSize * 24 * 60 * 60 * 1000
      const bucketTransactions = filteredTransactions.filter((transaction) => {
        const timestamp = new Date(transaction.date || transaction.createdAt).getTime()
        return timestamp >= start && timestamp < end
      })
      const bucketUsers = users.filter((registeredUser) => new Date(registeredUser.createdAt).getTime() < end)
      return {
        day: new Intl.DateTimeFormat('en-KE', { weekday: 'short' }).format(new Date(end)),
        value: bucketTransactions.reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0),
        revenue: bucketTransactions.reduce((sum, transaction) => sum + Number(transaction.fee || 0), 0),
        users: bucketUsers.length,
      }
    })

    const successfulTransactions = filteredTransactions.filter((transaction) => transaction.status === 'successful').length
    const typeCounts = filteredTransactions.reduce((counts, transaction) => {
      const key = transaction.type === 'received' ? 'Receive Money' : 'Send Money'
      counts[key] = (counts[key] || 0) + 1
      return counts
    }, {})
    const totalAmount = filteredTransactions.reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0)
    const activeUserIds = new Set(filteredTransactions.filter((transaction) => new Date(transaction.date || transaction.createdAt).getTime() >= now - 24 * 60 * 60 * 1000).map((transaction) => transaction.ownerId))
    const totalTypes = filteredTransactions.length || 1

    return {
      transactionVolume: buckets.map(({ day, value }) => ({ day, value })),
      userGrowth: buckets.map(({ day, users: value }) => ({ day, value })),
      revenue: buckets.map(({ day, revenue: value }) => ({ day, value })),
      transactionTypes: Object.entries(typeCounts).map(([name, count]) => ({ name, value: Math.round((count / totalTypes) * 100) })),
      averageTransaction: filteredTransactions.length ? totalAmount / filteredTransactions.length : 0,
      successRate: filteredTransactions.length ? (successfulTransactions / filteredTransactions.length) * 100 : 0,
      dailyActiveUsers: activeUserIds.size,
    }
  }, [dateRange, transactions, users])

  const maxVolume = Math.max(1,
    ...analyticsData.transactionVolume.map((item) => item.value)
  )

  const maxUsers = Math.max(1,
    ...analyticsData.userGrowth.map((item) => item.value)
  )

  const maxRevenue = Math.max(1,
    ...analyticsData.revenue.map((item) => item.value)
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Monitor platform performance and transaction activity
          </p>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="dateRange"
            className="text-sm font-medium text-gray-600"
          >
            Date range
          </label>

          <select
            id="dateRange"
            value={dateRange}
            onChange={(event) => setDateRange(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Summary Statistics */}
      <section className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Avg. Transaction Size
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              KES {analyticsData.averageTransaction.toLocaleString()}
            </h2>

            <p className="mt-2 text-sm text-green-600">
              Average transaction value
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Success Rate
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {analyticsData.successRate}%
            </h2>

            <p className="mt-2 text-sm text-green-600">
              Successful transactions
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Daily Active Users
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {analyticsData.dailyActiveUsers.toLocaleString()}
            </h2>

            <p className="mt-2 text-sm text-green-600">
              Active users today
            </p>
          </div>

        </div>
      </section>

      {/* Transaction Volume + User Growth */}
      <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Transaction Volume */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Transaction Volume Trend
            </h2>

            <p className="text-sm text-gray-500">
              Total transaction volume over time
            </p>
          </div>

          <div className="flex h-64 items-end gap-3 sm:gap-5">
            {analyticsData.transactionVolume.map((item) => {
              const height = (item.value / maxVolume) * 100

              return (
                <div
                  key={item.day}
                  className="flex flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-[10px] text-gray-500 sm:text-xs">
                    {(item.value / 1000).toFixed(0)}k
                  </span>

                  <div className="flex h-48 w-full items-end">
                    <div
                      className="w-full rounded-t-md bg-green-500 transition-all hover:bg-green-600"
                      style={{ height: `${height}%` }}
                    />
                  </div>

                  <span className="text-xs text-gray-500">
                    {item.day}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* User Growth */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              User Growth
            </h2>

            <p className="text-sm text-gray-500">
              Registered users over time
            </p>
          </div>

          <div className="flex h-64 items-end gap-3 sm:gap-5">
            {analyticsData.userGrowth.map((item) => {
              const height = (item.value / maxUsers) * 100

              return (
                <div
                  key={item.day}
                  className="flex flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-[10px] text-gray-500 sm:text-xs">
                    {item.value}
                  </span>

                  <div className="flex h-48 w-full items-end">
                    <div
                      className="w-full rounded-t-md bg-blue-500 transition-all hover:bg-blue-600"
                      style={{ height: `${height}%` }}
                    />
                  </div>

                  <span className="text-xs text-gray-500">
                    {item.day}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Revenue + Transaction Types */}
      <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Revenue Trend */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Revenue Trend
            </h2>

            <p className="text-sm text-gray-500">
              Platform revenue from transaction fees
            </p>
          </div>

          <div className="flex h-64 items-end gap-3 sm:gap-5">
            {analyticsData.revenue.map((item) => {
              const height = (item.value / maxRevenue) * 100

              return (
                <div
                  key={item.day}
                  className="flex flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-[10px] text-gray-500 sm:text-xs">
                    {(item.value / 1000).toFixed(1)}k
                  </span>

                  <div className="flex h-48 w-full items-end">
                    <div
                      className="w-full rounded-t-md bg-purple-500 transition-all hover:bg-purple-600"
                      style={{ height: `${height}%` }}
                    />
                  </div>

                  <span className="text-xs text-gray-500">
                    {item.day}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Transaction Type Distribution */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Transaction Type Distribution
            </h2>

            <p className="text-sm text-gray-500">
              Breakdown of transaction types
            </p>
          </div>

          <div className="flex flex-col gap-5">

            {analyticsData.transactionTypes.map((type) => (
              <div key={type.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {type.name}
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {type.value}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{ width: `${type.value}%` }}
                  />
                </div>
              </div>
            ))}

          </div>

          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              Send Money accounts for the largest share of
              platform transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Dashboard */}
      <div>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          Back to Admin Dashboard
        </button>
      </div>

    </div>
  )
}