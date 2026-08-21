
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Wallet.css';

// ============================================
// MOCK DATA
// ============================================

// ============================================
// MAIN WALLET COMPONENT
// ============================================

const Wallet = () => {
  const navigate = useNavigate();
  const balance = useSelector((state) => state.wallet.balance)
  const transactions = useSelector((state) => state.transactions.list)
  
  // State management
  const [filterType, setFilterType] = useState('all');

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

        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">No activity</div>
            <p>No transactions found</p>
            <p className="empty-subtext">
              {filterType === 'all' 
                ? 'You haven\'t made any transactions yet' 
                : `No ${filterType} transactions to show`}
            </p>
          </div>
        ) : (
          <div className="transaction-list">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-left">
                  <span className="transaction-icon">
                    {transaction.type === 'sent' ? 'Sent' : 'Received'}
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
                  <div className={`transaction-amount ${transaction.type === 'sent' ? 'sent-amount' : 'received-amount'}`}>
                    {transaction.type === 'sent' ? '-' : '+'} {formatCurrency(transaction.amount)}
                  </div>
                  <div className={`transaction-status transaction-${transaction.type}`}>
                    {transaction.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
