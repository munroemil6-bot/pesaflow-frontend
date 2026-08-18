import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const Landing = React.lazy(() => import('../pages/Landing/Landing'))
const Login = React.lazy(() => import('../pages/Auth/Login'))
const Register = React.lazy(() => import('../pages/Auth/Register'))
const ForgotPassword = React.lazy(() => import('../pages/Auth/ForgotPassword'))
const UserDashboard = React.lazy(() => import('../pages/Dashboards/UserDashboard'))
const AdminDashboard = React.lazy(() => import('../pages/Dashboards/AdminDashboard'))
const Analytics = React.lazy(() => import('../pages/Dashboards/Analytics'))
const Users = React.lazy(() => import('../pages/Dashboards/users'))
const Wallet = React.lazy(() => import('../pages/Wallet/Wallet'))
const AddFunds = React.lazy(() => import('../pages/Wallet/AddFunds'))
const Beneficiaries = React.lazy(() => import('../pages/Benefeciaries/Beneficiaries'))
const AddBeneficiary = React.lazy(() => import('../pages/Benefeciaries/AddBeneficiary'))
const Transactions = React.lazy(() => import('../pages/Transactions/Transactions'))
const TransactionDetails = React.lazy(() => import('../pages/Transactions/TransactionDetails'))
const SendMoney = React.lazy(() => import('../pages/Transfer/SendMoney'))
const ConfirmTransfer = React.lazy(() => import('../pages/Transfer/ConfirmTransfer'))
const TransferStatus = React.lazy(() => import('../pages/Transfer/TrasferStatus'))
const Profile = React.lazy(() => import('../pages/Landing/Profile'))

// Protected Route Component (TODO: implement after Redux is set up)
function ProtectedRoute({ children }) {
  // TODO: Check if user is authenticated from Redux
  // For now, allow all routes
  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}
      
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />

      {/* ==================== PROTECTED ROUTES ==================== */}

      {/* Dashboard Routes */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}
      />
      <Route
        path="/wallet"
        element={<ProtectedRoute><Wallet /></ProtectedRoute>}
      />
      <Route
        path="/wallet/add-funds"
        element={<ProtectedRoute><AddFunds /></ProtectedRoute>}
      />

      {/* Beneficiaries Routes */}
      <Route
        path="/beneficiaries"
        element={<ProtectedRoute><Beneficiaries /></ProtectedRoute>}
      />
      <Route
        path="/beneficiaries/add"
        element={<ProtectedRoute><AddBeneficiary /></ProtectedRoute>}
      />

      {/* Send Money / Transfer Routes */}
      <Route
        path="/send-money"
        element={<ProtectedRoute><SendMoney /></ProtectedRoute>}
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
        element={<ProtectedRoute><TransferStatus /></ProtectedRoute>}
      />

      {/* Transactions Routes */}
      <Route
        path="/transactions"
        element={<ProtectedRoute><Transactions /></ProtectedRoute>}
      />
      <Route
        path="/transactions/:id"
        element={<ProtectedRoute><TransactionDetails /></ProtectedRoute>}
      />

      {/* User Profile */}
      <Route
        path="/profile"
        element={<ProtectedRoute><Profile /></ProtectedRoute>}
      />

      {/* ==================== ADMIN ROUTES ==================== */}

      <Route
        path="/admin"
        element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
      />
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

      {/* ==================== CATCH ALL ==================== */}
      
      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
