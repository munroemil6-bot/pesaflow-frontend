import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()

  // Get logged-in user from the current session
  const user = JSON.parse(localStorage.getItem('pesaflow_session'))?.user

  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalTx: 0,
    totalVolume: 0,
    revenue: 0,
  })

  const [recentTransactions, setRecentTransactions] = useState([])
  const [recentUsers, setRecentUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // Check if current user is admin
useEffect(() => {
  if (!user || user.role !== 'admin') {
    navigate('/dashboard')
  }
}, [user, navigate])

  // Mock dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)

      // Simulate API loading
      setTimeout(() => {
        setMetrics({
          totalUsers: 1250,
          totalTx: 3480,
          totalVolume: 12500000,
          revenue: 285000,
        })

        setRecentTransactions([
          {
            id: 'TX001',
            sender: 'Myles',
            receiver: 'Nasra',
            amount: 5000,
            status: 'Completed',
            date: '2026-08-18',
          },
          {
            id: 'TX002',
            sender: 'Mason',
            receiver: 'Naomi',
            amount: 2500,
            status: 'Completed',
            date: '2026-08-18',
          },
          {
            id: 'TX003',
            sender: 'Nasra',
            receiver: 'Myles',
            amount: 10000,
            status: 'Pending',
            date: '2026-08-17',
          },
          {
            id: 'TX004',
            sender: 'Naomi',
            receiver: 'Mason',
            amount: 3500,
            status: 'Completed',
            date: '2026-08-17',
          },
          {
            id: 'TX005',
            sender: 'Myles',
            receiver: 'Naomi',
            amount: 7500,
            status: 'Failed',
            date: '2026-08-16',
          },
        ])

        setRecentUsers([
          {
            id: 1,
            name: 'Myles Munroe',
            email: 'myles@pesaflow.com',
            status: 'Active',
          },
          {
            id: 2,
            name: 'Mason',
            email: 'mason@pesaflow.com',
            status: 'Active',
          },
          {
            id: 3,
            name: 'Nasra Hassan',
            email: 'nasra@pesaflow.com',
            status: 'Active',
          },
          {
            id: 4,
            name: 'Naomi Nafula',
            email: 'naomi@pesaflow.com',
            status: 'Inactive',
          },
        ])

        setIsLoading(false)
      }, 800)
    }

    fetchDashboardData()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>
            <p className="text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* =========================
          HEADER
      ========================== */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Overview of your PesaFlow platform
        </p>
      </div>

      {/* =========================
          KEY METRICS
      ========================== */}
      <section className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Total Users */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Users
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {metrics.totalUsers.toLocaleString()}
            </h2>

            <p className="mt-2 text-sm text-green-600">
              Registered users
            </p>
          </div>

          {/* Total Transactions */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Transactions
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {metrics.totalTx.toLocaleString()}
            </h2>

            <p className="mt-2 text-sm text-green-600">
              All transactions
            </p>
          </div>

          {/* Total Volume */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Volume
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              KES {metrics.totalVolume.toLocaleString()}
            </h2>

            <p className="mt-2 text-sm text-green-600">
              Money transferred
            </p>
          </div>

          {/* Revenue */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Revenue
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              KES {metrics.revenue.toLocaleString()}
            </h2>

            <p className="mt-2 text-sm text-green-600">
              Total fees
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          RECENT ACTIVITY
      ========================== */}
      <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Recent Transactions */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Latest transactions on the platform
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-5 transition hover:bg-gray-50"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.sender} → {transaction.receiver}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {transaction.id} • {transaction.date}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="font-semibold text-gray-900">
                      KES {transaction.amount.toLocaleString()}
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        transaction.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : transaction.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Users
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Recently registered users
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {recentUsers.map((recentUser) => (
              <div
                key={recentUser.id}
                className="flex items-center justify-between p-5"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {recentUser.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {recentUser.email}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    recentUser.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {recentUser.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          QUICK LINKS
      ========================== */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Quick Links
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Quickly access admin management pages
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Users */}
          <button
            onClick={() => navigate('/admin/users')}
            className="rounded-xl bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900">
              View All Users
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Manage registered users
            </p>
          </button>

          {/* Transactions */}
          <button
            onClick={() => navigate('/admin/transactions')}
            className="rounded-xl bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900">
              View All Transactions
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Review platform transactions
            </p>
          </button>

          {/* Analytics */}
          <button
            onClick={() => navigate('/admin/analytics')}
            className="rounded-xl bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900">
              Analytics
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              View platform analytics
            </p>
          </button>

        </div>
      </section>
    </div>
  )
}