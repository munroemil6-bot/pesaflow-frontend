/**
 * ========================================================
 * ADMIN DASHBOARD
 * ========================================================
 * 
 * Owner: NAOMI (Admin Frontend)
 * Week 1: Day 4 (Money Transfer)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌────────────────────────────────────────┐
 * │  Admin Dashboard                       │
 * │                                        │
 * │  Key Metrics (4 cards)                 │
 * │  [Total Users] [Total Transactions]    │
 * │  [Total Volume] [Revenue]              │
 * │                                        │
 * │  Recent Activity                       │
 * │  - List of last N transactions         │
 * │  - List of recent user signups         │
 * │                                        │
 * │  Quick Links                           │
 * │  [ View All Users ]                    │
 * │  [ View All Transactions ]             │
 * │  [ Analytics ]                         │
 * └────────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Display 4 key metric cards
 * ✅ Recent transactions list
 * ✅ Recent users list
 * ✅ Quick navigation links
 * ✅ Loading state
 * ✅ Responsive layout
 * ✅ Mobile-friendly design
 * 
 * METRIC CARDS:
 * - Total Users: count
 * - Total Transactions: count
 * - Total Volume: sum of all amounts
 * - Revenue: sum of all fees
 * 
 * MOCK DATA STRUCTURE:
 * {
 *   metrics: { totalUsers, totalTx, totalVolume, revenue },
 *   recentTransactions: [array of last 5-10 tx],
 *   recentUsers: [array of last 5-10 users]
 * }
 * 
 * FUNCTIONS TO BUILD:
 * - useEffect: fetch admin dashboard data on mount
 * - Determine if user is admin (from Redux auth slice)
 * 
 * NEXT WEEK TODO:
 * - Connect to admin API endpoints
 * - Implement real-time metric updates
 * - Add date range filtering
 * - Add export data functionality
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom
// TODO: Import useSelector from react-redux (to check if user is admin)

export default function AdminDashboard() {
  // TODO: Set up useNavigate hook
  // TODO: Check if user is admin from Redux
  // TODO: If not admin, redirect to /dashboard
  
  // TODO: Create state for metrics data
  // TODO: Create state for recentTransactions
  // TODO: Create state for recentUsers
  // TODO: Create state for isLoading
  
  // TODO: useEffect to fetch admin dashboard data
  
  // TODO: Build JSX:
  // 1. Admin header: "Admin Dashboard"
  // 2. 4 metric cards in grid:
  //    - Total Users
  //    - Total Transactions
  //    - Total Volume
  //    - Revenue
  // 3. Recent Transactions section:
  //    - List of last 5-10 transactions
  // 4. Recent Users section:
  //    - List of last 5-10 signups
  // 5. Quick Links:
  //    - "View All Users" → /admin/users
  //    - "View All Transactions" → /admin/transactions
  //    - "Analytics" → /admin/analytics
  
  return <div>{/* NAOMI: Build admin dashboard here */}</div>;
}
