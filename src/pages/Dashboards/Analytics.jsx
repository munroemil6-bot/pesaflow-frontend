import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Analytics() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('pesaflow_session'))?.user

  const [dateRange, setDateRange] = useState('7')
  const [isLoading, setIsLoading] = useState(true)

  const [analyticsData, setAnalyticsData] = useState({
    transactionVolume: [],
    userGrowth: [],
    revenue: [],
    transactionTypes: [],
    averageTransaction: 0,
    successRate: 0,
    dailyActiveUsers: 0,
  })

  // Check that the logged-in user is an admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard')
    }
  }, [user, navigate])

  // Load mock analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true)

      setTimeout(() => {
        setAnalyticsData({
          transactionVolume: [
            { day: 'Mon', value: 420000 },
            { day: 'Tue', value: 560000 },
            { day: 'Wed', value: 480000 },
            { day: 'Thu', value: 720000 },
            { day: 'Fri', value: 850000 },
            { day: 'Sat', value: 640000 },
            { day: 'Sun', value: 910000 },
          ],

          userGrowth: [
            { day: 'Mon', value: 820 },
            { day: 'Tue', value: 890 },
            { day: 'Wed', value: 950 },
            { day: 'Thu', value: 1020 },
            { day: 'Fri', value: 1110 },
            { day: 'Sat', value: 1180 },
            { day: 'Sun', value: 1250 },
          ],

          revenue: [
            { day: 'Mon', value: 8500 },
            { day: 'Tue', value: 11200 },
            { day: 'Wed', value: 9800 },
            { day: 'Thu', value: 14500 },
            { day: 'Fri', value: 17200 },
            { day: 'Sat', value: 12800 },
            { day: 'Sun', value: 19400 },
          ],

          transactionTypes: [
            { name: 'Send Money', value: 45 },
            { name: 'Receive Money', value: 30 },
            { name: 'Wallet Funding', value: 15 },
            { name: 'Withdrawals', value: 10 },
          ],

          averageTransaction: 12500,
          successRate: 94.6,
          dailyActiveUsers: 684,
        })

        setIsLoading(false)
      }, 800)
    }

    fetchAnalyticsData()
  }, [dateRange])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
            <p className="text-gray-600">
              Loading analytics...
            </p>
          </div>
        </div>
      </div>
    )
  }

  const maxVolume = Math.max(
    ...analyticsData.transactionVolume.map((item) => item.value)
  )

  const maxUsers = Math.max(
    ...analyticsData.userGrowth.map((item) => item.value)
  )

  const maxRevenue = Math.max(
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