import React, { useMemo, useState } from 'react'

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState(null)

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Myles Munroe',
      email: 'myles@pesaflow.com',
      phone: '+254 700 111 222',
      status: 'Active',
      joined: '2026-08-18',
    },
    {
      id: 2,
      name: 'Mason',
      email: 'mason@pesaflow.com',
      phone: '+254 701 222 333',
      status: 'Active',
      joined: '2026-08-17',
    },
    {
      id: 3,
      name: 'Nasra Hassan',
      email: 'nasra@pesaflow.com',
      phone: '+254 702 333 444',
      status: 'Active',
      joined: '2026-08-16',
    },
    {
      id: 4,
      name: 'Naomi Nafula',
      email: 'naomi@pesaflow.com',
      phone: '+254 703 444 555',
      status: 'Active',
      joined: '2026-08-15',
    },
    {
      id: 5,
      name: 'John Kamau',
      email: 'john@pesaflow.com',
      phone: '+254 704 555 666',
      status: 'Active',
      joined: '2026-08-14',
    },
    {
      id: 6,
      name: 'Aisha Mohammed',
      email: 'aisha@pesaflow.com',
      phone: '+254 705 666 777',
      status: 'Inactive',
      joined: '2026-08-13',
    },
    {
      id: 7,
      name: 'Brian Otieno',
      email: 'brian@pesaflow.com',
      phone: '+254 706 777 888',
      status: 'inative',
      joined: '2026-08-12',
    },
    {
      id: 8,
      name: 'Grace Wanjiku',
      email: 'grace@pesaflow.com',
      phone: '+254 707 888 999',
      status: 'Active',
      joined: '2026-08-11',
    },
  ])

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)

      const matchesStatus =
        statusFilter === 'All' || user.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [users, searchTerm, statusFilter])

  const handleDelete = (userId) => {
    const confirmed = window.confirm(
      'Are you sure you want to remove this user?'
    )

    if (!confirmed) return

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId)
    )
  }

  const handleToggleStatus = (userId) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'Active' ? 'Inactive' : 'Active',
            }
          : user
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Users
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Manage registered PesaFlow users
        </p>
      </div>

      {/* Search and Filter */}
      <section className="mb-6 rounded-xl bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <label
              htmlFor="user-search"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Search Users
            </label>

            <input
              id="user-search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, email or phone..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="w-full lg:w-48">
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
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">All Users</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </section>

      {/* Users Table */}
      <section className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Users List
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredUsers.length} user
              {filteredUsers.length === 1 ? '' : 's'} found
            </p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="transition hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {user.name}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {user.phone}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {user.joined}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(user.id)}
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        {user.status === 'Active' ? 'Disable' : 'Activate'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-gray-100 md:hidden">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {user.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {user.email}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {user.phone}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {user.status}
                </span>
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Joined {user.joined}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedUser(user)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  View
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleStatus(user.id)}
                  className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                >
                  {user.status === 'Active' ? 'Disable' : 'Activate'}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(user.id)}
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="p-10 text-center">
            <h3 className="font-semibold text-gray-900">
              No users found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </section>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  User Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Account information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="text-xl text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Name
                </p>

                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.name}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Email
                </p>

                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Phone
                </p>

                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.phone}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Status
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                    selectedUser.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {selectedUser.status}
                </span>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-gray-500">
                  Joined
                </p>

                <p className="mt-1 text-sm text-gray-900">
                  {selectedUser.joined}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}