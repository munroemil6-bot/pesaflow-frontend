/**
 * ========================================================
 * TRANSACTIONS PAGE
 * ========================================================
 * 
 * Owner: NASRA (Transactions + Transfer)
 * Week 1: Day 3 (Main Application)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌──────────────────────────────────────┐
 * │  Transactions                        │
 * │                                      │
 * │  Filters: [All] [Successful] [Pend]  │
 * │                                      │
 * │  Transaction List:                   │
 * │  John Kamau                          │
 * │  Sent    -KSh 500     Successful ✓   │
 * │                                      │
 * │  Mary Wanjiku                        │
 * │  Received +KSh 1k     Successful ✓   │
 * │                                      │
 * │  Peter Ochieng                       │
 * │  Sent    -KSh 2k      Pending ⏳     │
 * └──────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Page header
 * ✅ Filter buttons: All, Successful, Pending, Failed
 * ✅ Transaction list
 * ✅ Each transaction clickable → /transactions/:id
 * ✅ Show: recipient, type, amount, status
 * ✅ Loading state
 * ✅ Empty state if no transactions
 * ✅ Pagination or infinite scroll (optional)
 * ✅ Responsive design
 * 
 * MOCK DATA:
 * Array of transactions with: id, recipient, type, amount, status, date
 * 
 * REDUX INTEGRATION:
 * - Get transactions from transactionSlice
 * - Fetch on mount
 * 
 * FILTER LOGIC:
 * - All: show all transactions
 * - Successful: status === 'successful'
 * - Pending: status === 'pending'
 * - Failed: status === 'failed'
 * 
 * NEXT WEEK TODO:
 * - Connect to transaction API
 * - Implement real-time updates
 * - Add export to CSV
 * - Add date range filtering
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom

export default function Transactions() {
  // TODO: Set up useNavigate hook
  // TODO: Create state for filterStatus ('all'|'successful'|'pending'|'failed')
  // TODO: Create state for isLoading
  // TODO: Create state for transactions (mock data for Week 1)
  // TODO: useEffect to fetch transactions on mount
  
  // TODO: Build filteredTransactions logic based on filterStatus
  
  // TODO: Build JSX:
  // 1. Page header
  // 2. Filter buttons (4 buttons in a row)
  //    - Active: blue bg, white text
  //    - Inactive: gray bg, gray text
  // 3. Transaction list
  //    - If loading: show loading message
  //    - If has transactions: show list
  //      - Each transaction is clickable → /transactions/{id}
  //      - Show: emoji icon, recipient, type, amount, status
  //      - Hover effect
  //    - If no transactions: show empty state
  
  return <div>{/* NASRA: Build transactions list here */}</div>;
}
