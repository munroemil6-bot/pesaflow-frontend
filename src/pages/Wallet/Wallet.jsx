// Wallet.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wallet.css';

// ============================================
// MOCK DATA
// ============================================

const mockBalance = 25450;

const mockTransactions = [
  { id: '1', recipient: 'John Kamau', type: 'sent', amount: 500, status: 'successful', date: '2024-01-15T10:30:00' },
  { id: '2', recipient: 'Mary Wanjiku', type: 'received', amount: 1000, status: 'successful', date: '2024-01-14T14:20:00' },
  { id: '3', recipient: 'Peter Ochieng', type: 'sent', amount: 2000, status: 'pending', date: '2024-01-13T09:15:00' },
  { id: '4', recipient: 'Grace Akinyi', type: 'received', amount: 1500, status: 'successful', date: '2024-01-12T16:45:00' },
  { id: '5', recipient: 'James Mwangi', type: 'sent', amount: 3000, status: 'failed', date: '2024-01-11T11:00:00' },
  { id: '6', recipient: 'Sarah Njoki', type: 'received', amount: 750, status: 'successful', date: '2024-01-10T08:30:00' },
  { id: '7', recipient: 'David Otieno', type: 'sent', amount: 2500, status: 'successful', date: '2024-01-09T13:20:00' },
];

// ============================================
// MAIN WALLET COMPONENT
// ============================================

const Wallet = () => {
  const navigate = useNavigate();
  
  // State management
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchWalletData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setBalance(mockBalance);
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  // Filter transactions based on selected type
  const getFilteredTransactions = () => {
    if (filterType === 'all') return transactions;
    return transactions.filter(tx => tx.type === filterType);
  };

  const filteredTransactions = getFilteredTransactions();

  // Handle filter change
  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  // Handle add funds navigation
  const handleAddFunds = () => {
    navigate('/wallet/add-funds');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-KE', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get status icon
  const getStatusIcon = (type) => {
    return type === 'sent' ? '😊' : '😞';
  };

  // Get status class
  const getStatusClass = (type) => {
    return `transaction-${type}`;
  };

  // Get amount display
  const getAmountDisplay = (type, amount) => {
    const symbol = type === 'sent' ? '-' : '+';
    const color = type === 'sent' ? 'sent-amount' : 'received-amount';
    return { symbol, color };
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="wallet-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-container">
      {/* Page Header */}
      <div className="wallet-header">
        <h1>Wallet</h1>
        <p className="wallet-description">Manage your account balance</p>
      </div>

      {/* Balance Card */}
      <div className="balance-card">
        <div className="balance-content">
          <div className="balance-label">Available Balance</div>
          <div className="balance-amount">{formatCurrency(balance)}</div>
          <button className="add-funds-btn" onClick={handleAddFunds}>
            + Add Funds
          </button>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        
        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filterType === 'sent' ? 'active' : ''}`}
            onClick={() => handleFilterChange('sent')}
          >
            Sent
          </button>
          <button 
            className={`filter-btn ${filterType === 'received' ? 'active' : ''}`}
            onClick={() => handleFilterChange('received')}
          >
            Received
          </button>
        </div>

        {/* Transaction List */}
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No transactions found</p>
            <p className="empty-subtext">
              {filterType === 'all' 
                ? 'You haven\'t made any transactions yet' 
                : `No ${filterType} transactions to show`}
            </p>
          </div>
        ) : (
          <div className="transaction-list">
            {filteredTransactions.map((transaction) => {
              const { symbol, color } = getAmountDisplay(transaction.type, transaction.amount);
              return (
                <div 
                  key={transaction.id} 
                  className="transaction-item"
                >
                  <div className="transaction-left">
                    <span className="transaction-icon">
                      {getStatusIcon(transaction.type)}
                    </span>
                    <div className="transaction-info">
                      <div className="transaction-recipient">
                        {transaction.recipient}
                      </div>
                      <div className="transaction-date">
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                  </div>
                  <div className="transaction-right">
                    <div className={`transaction-amount ${color}`}>
                      {symbol} {formatCurrency(transaction.amount)}
                    </div>
                    <div className={`transaction-status ${getStatusClass(transaction.type)}`}>
                      {transaction.type}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;


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

 {
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
