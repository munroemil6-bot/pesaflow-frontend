
import React, { useEffect } from 'react';
import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';


const mockTransactions = [
  { id: '1', recipient: 'John Kamau', type: 'sent', amount: 500, status: 'successful', date: '2024-01-15T10:30:00' },
  { id: '2', recipient: 'Mary Wanjiku', type: 'received', amount: 1000, status: 'successful', date: '2024-01-14T14:20:00' },
  { id: '3', recipient: 'Peter Ochieng', type: 'sent', amount: 2000, status: 'pending', date: '2024-01-13T09:15:00' },
  { id: '4', recipient: 'Grace Akinyi', type: 'sent', amount: 1500, status: 'failed', date: '2024-01-12T16:45:00' },
  { id: '5', recipient: 'James Mwangi', type: 'received', amount: 3000, status: 'successful', date: '2024-01-11T11:00:00' },
  { id: '6', recipient: 'Sarah Njoki', type: 'sent', amount: 750, status: 'pending', date: '2024-01-10T08:30:00' },
  { id: '7', recipient: 'David Otieno', type: 'received', amount: 2500, status: 'failed', date: '2024-01-09T13:20:00' },
];


export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTransactions);
      }, 800);
    });
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    status: 'idle', 
    error: null,
    filter: 'all', 
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = transactionSlice.actions;

// Selectors
const selectAllTransactions = (state) => state.transactions.items;
const selectFilter = (state) => state.transactions.filter;
const selectStatus = (state) => state.transactions.status;

const selectFilteredTransactions = (state) => {
  const transactions = selectAllTransactions(state);
  const filter = selectFilter(state);
  
  if (filter === 'all') return transactions;
  return transactions.filter(t => t.status === filter);
};


const store = configureStore({
  reducer: {
    transactions: transactionSlice.reducer,
  },
});



const TransactionItem = ({ transaction, onClick }) => {
  const { recipient, type, amount, status, date } = transaction;
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'successful': return '✓';
      case 'pending': return '⏳';
      case 'failed': return '✗';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  const formatAmount = (type, amount) => {
    const symbol = type === 'sent' ? '-' : '+';
    const currency = 'KSh';
    return `${symbol} ${currency} ${amount.toLocaleString()}`;
  };

  return (
    <div className="transaction-item" onClick={onClick}>
      <div className="transaction-info">
        <div className="transaction-recipient">
          <span className="recipient-name">{recipient}</span>
          <span className="transaction-date">{new Date(date).toLocaleDateString()}</span>
        </div>
        <div className="transaction-details">
          <span className={`transaction-amount ${type}`}>
            {formatAmount(type, amount)}
          </span>
          <span className={`transaction-status ${getStatusClass(status)}`}>
            {getStatusIcon(status)} {status}
          </span>
        </div>
      </div>
    </div>
  );
};



const TransactionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transactions = useSelector(selectFilteredTransactions);
  const currentFilter = useSelector(selectFilter);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  const handleFilterClick = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleTransactionClick = (id) => {
    navigate(`/transactions/${id}`);
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="transaction-list">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  // Filter buttons
  const filters = ['all', 'successful', 'pending', 'failed'];
  
  return (
    <div className="transaction-list">
      <div className="header">
        <h1>Transactions</h1>
        <span className="transaction-count">{transactions.length} transactions</span>
      </div>

      <div className="filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {status === 'succeeded' && transactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No transactions found</p>
          <p className="empty-subtext">Try changing your filter</p>
        </div>
      ) : (
        <div className="transaction-items">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onClick={() => handleTransactionClick(transaction.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};



const TransactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const transactions = useSelector(selectAllTransactions);
  const transaction = transactions.find(t => t.id === id);

  if (!transaction) {
    return (
      <div className="detail-container">
        <div className="detail-card">
          <p className="not-found">Transaction not found</p>
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to list
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>
      
      <div className="detail-card">
        <h2>Transaction Details</h2>
        <div className="detail-item">
          <span className="label">Recipient:</span>
          <span className="value">{transaction.recipient}</span>
        </div>
        <div className="detail-item">
          <span className="label">Type:</span>
          <span className={`value type-${transaction.type}`}>
            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
          </span>
        </div>
        <div className="detail-item">
          <span className="label">Amount:</span>
          <span className={`value amount-${transaction.type}`}>
            {transaction.type === 'sent' ? '-' : '+'} KSh {transaction.amount.toLocaleString()}
          </span>
        </div>
        <div className="detail-item">
          <span className="label">Status:</span>
          <span className={`value status-${transaction.status}`}>
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </span>
        </div>
        <div className="detail-item">
          <span className="label">Date:</span>
          <span className="value">{new Date(transaction.date).toLocaleString()}</span>
        </div>
        <div className="detail-item">
          <span className="label">Transaction ID:</span>
          <span className="value id">{transaction.id}</span>
        </div>
      </div>
    </div>
  );
};



const TransactionApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<TransactionList />} />
          <Route path="/transactions/:id" element={<TransactionDetail />} />
        </Routes>
      </Router>
    </Provider>
  );
};
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default TransactionApp;

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

{
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
