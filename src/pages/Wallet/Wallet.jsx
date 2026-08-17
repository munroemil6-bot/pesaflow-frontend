/**
 * ========================================================
 * WALLET PAGE
 * ========================================================
 * 
 * Owner: NAOMI (Wallet + Beneficiaries)
 * Week 1: Day 3 (Main Application)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌────────────────────────────────────────┐
 * │  Wallet                                │
 * │  Manage your account balance           │
 * │                                        │
 * │  ┌────────────────────────────────────┐
 * │  │  Available Balance                 │
 * │  │  KSh 25,450                       │
 * │  │  [ + Add Funds ]                   │
 * │  └────────────────────────────────────┘
 * │                                        │
 * │  Recent Activity                       │
 * │  [All] [Sent] [Received] (filter btns)│
 * │                                        │
 * │  Transaction List:                     │
 * │  📤 John Kamau | Sent | -KSh 500  | ✓ │
 * │  📥 Mary... | Received | +KSh 1k  | ✓ │
 * │  ⏳ Peter... | Sent | -KSh 2k  | ⏳ │
 * └────────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Page header: "Wallet" + description
 * ✅ Balance card (green gradient background)
 * ✅ "+ Add Funds" button → /wallet/add-funds
 * ✅ Recent Activity section
 * ✅ Filter buttons: All, Sent, Received
 * ✅ Transaction list below
 * ✅ Filter functionality (updates displayed transactions)
 * ✅ Loading state
 * ✅ Empty state if no transactions
 * ✅ Responsive layout
 * 
 * DATA STRUCTURE:
 * - balance: number (KSh amount)
 * - transactions: array of transaction objects
 *   - Each tx: { id, recipient, type: 'sent'|'received', amount, status, date }
 * 
 * STATE NEEDED:
 * - filterType: 'all' | 'sent' | 'received'
 * - isLoading: boolean
 * - Use useState to manage filter
 * - Filter transactions based on selected type
 * 
 * STYLING:
 * - Balance card: green gradient (green-500 to green-700)
 * - Filter buttons: blue when active, gray when inactive
 * - Transaction list: hover effect on rows
 * - Icons: emoji (📤 for sent, 📥 for received)
 * 
 * FUNCTIONS TO BUILD:
 * - handleFilterChange(type): update filterType state
 * - filteredTransactions: filter array based on filterType
 * - useEffect: fetch wallet data on mount
 * 
 * MOCK DATA STRUCTURE:
 * const balance = 25450
 * const allTransactions = [
 *   { id, recipient, type, amount, status, date },
 *   { id, recipient, type, amount, status, date }
 * ]
 * 
 * NEXT WEEK TODO:
 * - Connect to actual wallet API (/api/wallet/balance)
 * - Implement real-time balance updates
 * - Add date range filtering
 * - Add search by recipient
 * - Implement pagination for large lists
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom
// TODO: Import useState from react
// TODO: Import useEffect from react

export default function Wallet() {
  // TODO: Set up useNavigate hook
  
  // TODO: Create state for filterType: 'all' | 'sent' | 'received'
  // TODO: Create state for isLoading: boolean
  
  // TODO: For WEEK 1 - use MOCK DATA:
  // - const balance = 25450
  // - const allTransactions = [array of mock transactions]
  
  // TODO: Build filteredTransactions logic:
  // - If filterType === 'all': return allTransactions
  // - Else: return allTransactions.filter(tx => tx.type === filterType)
  
  // TODO: useEffect hook to fetch wallet data on mount
  // - Set isLoading to true
  // - Call API (TODO: replace with real API when ready)
  // - Set isLoading to false
  
  // TODO: Build handleFilterChange(type) function
  // - Update filterType state
  
  // TODO: Build JSX Structure:
  // 1. Header section
  //    - "Wallet" heading
  //    - "Manage your account balance" subtext
  //
  // 2. Balance Card (full width)
  //    - Gradient background: green-500 to green-700
  //    - "Available Balance" label
  //    - Large balance display
  //    - "+ Add Funds" button (navigate to /wallet/add-funds)
  //
  // 3. Recent Activity section
  //    - Section heading
  //    - Filter buttons in a row: [All] [Sent] [Received]
  //    - Active button: blue background, white text
  //    - Inactive button: gray background, gray text
  //
  // 4. Transaction List
  //    - If isLoading: show "Loading..."
  //    - If has filtered transactions: show list
  //      - Each row: emoji icon | name | type | amount | status
  //      - Hover effect: bg-gray-50
  //    - If no transactions: show "No transactions" message
  
  return (
    <div>
      {/* NAOMI: Build the wallet page here */}
      {/* Reference: wireframe above */}
      {/* Keep responsive design mobile-first */}
      {/* Connect to Redux wallet data when ready */}
    </div>
  );
}
