
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
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-left">
                  <span className="transaction-icon">
                    {transaction.type === 'sent' ? '😊' : '😞'}
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
