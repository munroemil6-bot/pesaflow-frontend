
import './App.css'
import React, { Suspense } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Loader from './Components/Loader'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'

function AppContent() {
  const location = useLocation()
  const isPublicPage = location.pathname === '/' || location.pathname.startsWith('/auth/') || location.pathname.startsWith('/login') || location.pathname.startsWith('/register')

  return (
    <div className="min-h-screen bg-gray-50">
      {!isPublicPage && <Navbar />}
      <div className="flex">
        {!isPublicPage && <Sidebar />}
        <main className={isPublicPage ? 'w-full' : 'flex-1'}>
          <Suspense fallback={<Loader />}>
            <AppRoutes />
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