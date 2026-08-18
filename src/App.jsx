
import './App.css'
import React, { Suspense } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Loader from './Components/Loader'
import Footer from './Components/Footer'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'

function AppContent() {
  const location = useLocation()
  const isPublicPage = location.pathname === '/' || location.pathname.startsWith('/auth/') || location.pathname.startsWith('/login') || location.pathname.startsWith('/register')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isPublicPage && <Navbar />}
      <div className="flex flex-1">
        {!isPublicPage && <Sidebar />}
        <main className={isPublicPage ? 'w-full flex flex-col' : 'flex-1 flex flex-col'}>
          <div className="flex-1">
            <Suspense fallback={<Loader />}>
              <AppRoutes />
            </Suspense>
          </div>
          {!isPublicPage && <Footer isAuthenticated={true} />}
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