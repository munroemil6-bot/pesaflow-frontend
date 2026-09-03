
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearPendingPayment, fetchWallet } from '../../redux/slices/walletSlice';

const Wallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.wallet.balance)
  const pendingPayment = useSelector((state) => state.wallet.pendingPayment)
  const transactions = useSelector((state) => state.transactions.list)
  
  // State management
  const [filterType, setFilterType] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  useEffect(() => {
    if (!pendingPayment) return undefined;

    const poll = async () => {
      const result = await dispatch(fetchWallet());
      if (fetchWallet.fulfilled.match(result)) {
        const updatedBalance = Number(result.payload?.balance) || 0;
        if (updatedBalance > Number(pendingPayment.initialBalance || 0)) {
          dispatch(clearPendingPayment());
        }
      }
    };

    const timeoutId = window.setTimeout(poll, 3000);
    const intervalId = window.setInterval(poll, 10000);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [dispatch, pendingPayment]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchWallet());
    setRefreshing(false);
  };

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
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Wallet</h1>
          <p className="text-sm text-slate-600">Manage your account balance</p>
        </div>
        <button type="button" className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-65 sm:mt-0" onClick={handleRefresh} disabled={refreshing}>
          {refreshing ? 'Refreshing...' : 'Refresh balance'}
        </button>
      </div>

      {pendingPayment && (
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-800" role="status">
          M-PESA payment requested. Check your phone and enter your PIN. Your balance will update after payment is confirmed.
        </div>
      )}

      {/* Balance Card */}
      <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 text-white shadow-lg shadow-emerald-900/10 max-sm:flex-col max-sm:items-start">
        <div className="flex flex-col gap-1">
          <div className="text-sm opacity-95">Available Balance</div>
          <div className="text-3xl font-extrabold">{formatCurrency(balance)}</div>
          <button className="mt-2 w-fit rounded-xl border border-white/15 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95" onClick={handleAddFunds}>
            + Add Funds
          </button>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-5">
        <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
        
        {/* Filter Buttons */}
        <div className="my-3 flex gap-2">
          <button 
            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${filterType === 'all' ? 'border-emerald-900 bg-emerald-900 text-white' : 'border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button 
            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${filterType === 'sent' ? 'border-emerald-900 bg-emerald-900 text-white' : 'border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
            onClick={() => handleFilterChange('sent')}
          >
            Sent
          </button>
          <button 
            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${filterType === 'received' ? 'border-emerald-900 bg-emerald-900 text-white' : 'border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
            onClick={() => handleFilterChange('received')}
          >
            Received
          </button>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="rounded-xl border border-emerald-100 bg-white p-8 text-center">
            <div className="font-bold text-slate-800">No activity</div>
            <p className="mt-1 text-sm text-slate-700">No transactions found</p>
            <p className="mt-1 text-sm text-slate-500">
              {filterType === 'all' 
                ? 'You haven\'t made any transactions yet' 
                : `No ${filterType} transactions to show`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between rounded-xl border border-emerald-100 bg-white p-3 max-sm:items-start">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-800">
                    {transaction.type === 'sent' ? 'Sent' : 'Received'}
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <div className="truncate font-bold text-slate-900">
                      {transaction.recipient}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-extrabold ${transaction.type === 'sent' ? 'text-red-600' : 'text-emerald-800'}`}>
                    {transaction.type === 'sent' ? '-' : '+'} {formatCurrency(transaction.amount)}
                  </div>
                  <div className="text-xs capitalize text-gray-500">
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
