
import './App.css'
import React, { Suspense } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Loader from './Components/Loader'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'

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



// Protected Route Component (TODO: implement after Redux is set up)
function ProtectedRoute({ children }) {
  // TODO: Check if user is authenticated from Redux
  // For now, allow all routes
  return children
}

function AppContent() {
  const location = useLocation()
  const isPublicPage = location.pathname === '/' || location.pathname.startsWith('/auth/')

  return (
    <div className="min-h-screen bg-gray-50">
      {!isPublicPage && <Navbar />}
      <div className="flex">
        {!isPublicPage && <Sidebar />}
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
                element={<ProtectedRoute><AdminTransactions /></ProtectedRoute>} 
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
                element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
              />
              <Route 
                path="/admin/analytics" 
                element={<ProtectedRoute><Analytics /></ProtectedRoute>} 
              />
              <Route 
                path="/admin/users" 
                element={<ProtectedRoute><Users /></ProtectedRoute>} 
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