
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const TransactionItem = ({ transaction, onClick }) => {
  const { recipient, type, amount, status, date } = transaction;
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'successful': return 'Successful';
      case 'pending': return 'Pending';
      case 'failed': return 'Failed';
      default: return '';
    }
  };

  const formatAmount = (type, amount) => {
    const symbol = type === 'sent' ? '-' : '+';
    const currency = 'KSh';
    return `${symbol} ${currency} ${amount.toLocaleString()}`;
  };

  return (
    <Link
      to={`/transactions/${transaction.id}`}
      onClick={onClick}
      className="block border-b border-slate-200 px-4 py-4 transition hover:bg-slate-50 last:border-b-0"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-slate-900">{recipient}</p>
          <p className="mt-1 text-sm text-slate-500">{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className="text-right">
          <p className={`font-semibold ${type === 'sent' ? 'text-slate-900' : 'text-emerald-600'}`}>
            {formatAmount(type, amount)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {getStatusIcon(status)} {status}
          </p>
        </div>
      </div>
    </Link>
  );
};



const TransactionList = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const allTransactions = useSelector((state) => state.transactions.list)
  const filters = ['all', 'successful', 'pending', 'failed'];
  const transactions = currentFilter === 'all'
    ? allTransactions
    : allTransactions.filter((transaction) => transaction.status === currentFilter);
  
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
            <p className="mt-1 text-sm text-slate-500">Review your recent money transfers.</p>
          </div>
          <span className="text-sm text-slate-500">{transactions.length} transactions</span>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${currentFilter === filter ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'}`}
              onClick={() => setCurrentFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <section className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
          {transactions.length > 0 ? transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          )) : (
            <div className="p-10 text-center text-slate-500">No transactions found.</div>
          )}
        </section>
      </div>
    </div>
  );
};



const TransactionApp = () => {
  return <TransactionList />;
};

export default TransactionApp;
