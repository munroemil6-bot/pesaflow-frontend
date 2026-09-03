
import './App.css'
import React, { Suspense, useEffect } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import AdminSidebar from './Components/AdminSidebar'
import Loader from './Components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { fetchWallet } from './redux/slices/walletSlice'
import { fetchBeneficiaries } from './redux/slices/beneficiarySlice'
import { fetchTransactions } from './redux/slices/transactionSlice'
import { fetchUsers } from './redux/slices/usersSlice'

const Landing = React.lazy(() => import('./pages/Landing/Landing'))
const Login = React.lazy(() => import('./pages/Auth/Login'))
const Register = React.lazy(() => import('./pages/Auth/Register'))
const ForgotPassword = React.lazy(() => import('./pages/Auth/ForgotPassword'))
const UserDashboard = React.lazy(() => import('./pages/Dashboards/UserDashboard'))
const AdminDashboard = React.lazy(() => import('./pages/Dashboards/AdminDashboard'))
const Analytics = React.lazy(() => import('./pages/Dashboards/Analytics'))
const Users = React.lazy(() => import('./pages/Dashboards/users'))
const Wallet = React.lazy(() => import('./pages/Wallet/Wallet'))
const AddFunds = React.lazy(() => import('./pages/Wallet/AddFunds'))
const Beneficiaries = React.lazy(() => import('./pages/Benefeciaries/Beneficiaries'))
const AddBeneficiary = React.lazy(() => import('./pages/Benefeciaries/AddBeneficiary'))
const Transactions = React.lazy(() => import('./pages/Transactions/Transactions'))
const TransactionDetails = React.lazy(() => import('./pages/Transactions/TransactionDetails'))
const SendMoney = React.lazy(() => import('./pages/Transfer/SendMoney'))
const ConfirmTransfer = React.lazy(() => import('./pages/Transfer/ConfirmTransfer'))
const TrasferStatus = React.lazy(() => import('./pages/Transfer/TrasferStatus'))
const Profile = React.lazy(() => import('./pages/Landing/Profile'))
const AdminTransactions = React.lazy(() => import('./pages/Dashboards/Transactions'))

// TODO: Import layout components when created



function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  if (!isAuthenticated) return <Navigate to="/auth/login" replace />
  if (user?.is_active === false) return <Navigate to="/auth/login" replace />
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />

  return children
}

function AppContent() {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const isPublicPage = location.pathname === '/' || location.pathname.startsWith('/auth/') || location.pathname.startsWith('/login') || location.pathname.startsWith('/register')
  const isAdminPage = location.pathname.startsWith('/admin/')
  const showAdminSidebar = !isPublicPage && isAdminPage && user?.role === 'admin'

  useEffect(() => {
    if (!user) return

    dispatch(fetchWallet())
    dispatch(fetchBeneficiaries())
    dispatch(fetchTransactions(user.role))
    if (user.role === 'admin') dispatch(fetchUsers())
  }, [dispatch, user?.id, user?.role])

  useEffect(() => {
    if (user && location.pathname === '/dashboard') dispatch(fetchWallet())
  }, [dispatch, location.pathname, user])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isPublicPage && <Navbar />}
      <div className="flex flex-1">
        {!isPublicPage && (showAdminSidebar ? <AdminSidebar /> : <Sidebar />)}
        <main className={isPublicPage ? 'w-full' : 'flex-1'}>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              
              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              
              {/* User Routes (Protected) */}
              <Route 
                path="/dashboard" 
                element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} 
              />
              <Route 
                path="/admin/transactions" 
                element={<ProtectedRoute adminOnly><AdminTransactions /></ProtectedRoute>}
              />
              <Route 
                path="/wallet" 
                element={<ProtectedRoute><Wallet /></ProtectedRoute>} 
              />
              <Route 
                path="/wallet/add-funds" 
                element={<ProtectedRoute><AddFunds /></ProtectedRoute>} 
              />
              <Route 
                path="/beneficiaries" 
                element={<ProtectedRoute><Beneficiaries /></ProtectedRoute>} 
              />
              <Route 
                path="/beneficiaries/add" 
                element={<ProtectedRoute><AddBeneficiary /></ProtectedRoute>} 
              />
              <Route 
                path="/transactions" 
                element={<ProtectedRoute><Transactions /></ProtectedRoute>} 
              />
              <Route 
                path="/transactions/:id" 
                element={<ProtectedRoute><TransactionDetails /></ProtectedRoute>} 
              />
              <Route 
                path="/transfer/send" 
                element={<ProtectedRoute><SendMoney /></ProtectedRoute>} 
              />
              <Route 
                path="/transfer/confirm" 
                element={<ProtectedRoute><ConfirmTransfer /></ProtectedRoute>} 
              />
              <Route 
                path="/transfer/status" 
                element={<ProtectedRoute><TrasferStatus /></ProtectedRoute>} 
              />
              <Route 
                path="/profile" 
                element={<ProtectedRoute><Profile /></ProtectedRoute>} 
              />
              
              {/* Admin Routes (Protected - Admin Only) */}
              <Route 
                path="/admin/dashboard" 
                element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>}
              />
              <Route 
                path="/admin/analytics" 
                element={<ProtectedRoute adminOnly><Analytics /></ProtectedRoute>}
              />
              <Route 
                path="/admin/users" 
                element={<ProtectedRoute adminOnly><Users /></ProtectedRoute>}
              />
              
              {/* Redirect unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App