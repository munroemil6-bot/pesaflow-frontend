/**
 * ========================================================
 * USER DASHBOARD
 * ========================================================
 * 
 * Owner: Nassra (Group Leader - Main Dashboard)
 * Week 1: Day 3 (Main Application)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌──────────────────────────────────────────┐
 * │  Welcome, Myles 👋                       │
 * │  Manage your money easily and securely   │
 * │                                          │
 * │  ┌──────────────────────────────────────┐
 * │  │  Wallet Balance                      │
 * │  │  KSh 25,450                         │
 * │  │  [ + Add Funds ] [ Send Money ]      │
 * │  └──────────────────────────────────────┘
 * │                                          │
 * │  Quick Stats (4 cards in grid)           │
 * │  [Sent] [Received] [Pending] [Failed]    │
 * │                                          │
 * │  Recent Transactions                     │
 * │  - Transaction list with filters         │
 * │  - [View All Transactions] link          │
 * └──────────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Welcome message with user's name (from Redux)
 * ✅ Wallet balance card (gradient background)
 * ✅ Quick action buttons (Add Funds, Send Money)
 * ✅ 4 stat cards: Sent, Received, Pending, Failed
 * ✅ Recent transactions list (last 5-10 transactions)
 * ✅ Transaction clickable to see details
 * ✅ "View All Transactions" link
 * ✅ Empty state if no transactions
 * ✅ Loading state while fetching
 * ✅ Responsive grid layout
 * 
 * LAYOUT GRID:
 * - Hero section: Welcome message
 * - Balance card: Full width, gradient background
 * - Stats: 4 columns (1 col mobile, 2 col tablet, 4 col desktop)
 * - Transactions: Full width card
 * 
 * DATA SOURCES (FROM REDUX):
 * - User name: state.auth.user.name
 * - Wallet balance: state.wallet.balance
 * - Recent transactions: state.transactions.recent (or fetch on mount)
 * - Stats: derived from transactions or separate endpoint
 * 
 * MOCK DATA STRUCTURE:
 * {
 *   user: { name: "Myles", phone: "0712345678" },
 *   balance: 25450,
 *   stats: { sent: 5000, received: 2M, pending: 1, failed: 0 },
 *   transactions: [
 *     { id, recipient, type: 'sent'|'received', amount, status, date }
 *   ]
 * }
 * 
 * FUNCTIONS TO BUILD:
 * - useEffect: Fetch dashboard data on component mount
 * - Navigation handlers for buttons
 * 
 * STYLING:
 * - Gradient: blue-600 to blue-800 for balance card
 * - Grid: Responsive 1->2->4 columns for stats
 * - Cards: white bg, shadow, hover effect
 * - Empty state: centered text with action link
 * 
 * NEXT WEEK TODO:
 * - Connect to actual API endpoints
 * - Real-time balance updates using WebSockets
 * - Transaction polling every 30 seconds
 * - Pull-to-refresh functionality
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom
// TODO: Import useSelector from react-redux
// TODO: Import useEffect from react

export default function UserDashboard() {
  // TODO: Set up useNavigate hook
  // TODO: Create useEffect hook for fetching dashboard data

  // TODO: Get data from Redux:
  // - const user = useSelector(state => state.auth.user)
  // - const balance = useSelector(state => state.wallet.balance)
  // - const transactions = useSelector(state => state.transactions.recent)

  // TODO: For WEEK 1 ONLY - use mock data:
  // - user: { name: "Myles", phone: "0712345678" }
  // - balance: 25450
  // - transactions: array of mock data
  // - stats: { sent: 5000, received: 2M, pending: 1, failed: 0 }

  // TODO: Create state for isLoading (boolean)

  // TODO: Build JSX Structure:
  // 1. Section 1: Welcome header
  //    - "Welcome, [name] 👋" (large heading)
  //    - "Manage your money easily..." (subtext)
  //
  // 2. Section 2: Wallet Balance Card
  //    - Gradient background (blue)
  //    - "Wallet Balance" label (light text)
  //    - Large balance display: "KSh 25,450"
  //    - Two buttons: "+ Add Funds" (white) and "Send Money" (blue)
  //    - Buttons navigate to /wallet/add-funds and /transfer/send
  //
  // 3. Section 3: Quick Stats Grid
  //    - 4 stat cards in responsive grid (1 col → 2 col → 4 col)
  //    - Each card shows: emoji icon, label, value
  //    - Cards: Sent (📤), Received (📥), Pending (⏳), Failed (❌)
  //
  // 4. Section 4: Recent Transactions Card
  //    - Header with title
  //    - If loading: show "Loading..."
  //    - If has transactions: show list
  //      - Each transaction clickable → /transactions/:id
  //      - Show: avatar emoji, name, type, amount, status, date
  //    - If no transactions: show empty state with link to send money
  //    - If has transactions: "View All Transactions →" link at bottom

  return (
    <div>
      {/* MYLES: Build the user dashboard here */}
      {/* Reference: wireframe above */}
      {/* Make it mobile-responsive first, then scale up */}
      {/* Connect to Redux data when it's ready */}
    </div>
  );
}
