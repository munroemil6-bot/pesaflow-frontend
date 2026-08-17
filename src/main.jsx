/**
 * ========================================================
 * PESAFLOW FRONTEND - ENTRY POINT
 * ========================================================
 * 
 * This is where the React app mounts to the DOM.
 * 
 * 📝 FOR THE TEAM:
 * 
 * This file rarely needs changes. The main application
 * structure is set up in App.jsx
 * 
 * Global providers (if needed later):
 * - Redux Provider (state management)
 * - Theme Provider
 * - Auth Provider
 * 
 * These should be added around <App /> here
 * 
 * ========================================================
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
