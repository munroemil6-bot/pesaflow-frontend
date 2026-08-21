import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TransferStatus.css';

const TransferStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageRef = useRef(null);

  // Get transaction data from location state
  const transactionData = location.state?.transactionData || {
    id: 'TXN-2024-001',
    status: 'successful', // 'successful' | 'pending' | 'failed'
    amount: 1000,
    recipient: 'John Kamau',
    fee: 10,
    total: 1010,
    timestamp: new Date().toISOString(),
    description: 'Payment for services'
  };

  // Auto-scroll to page on mount
  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Handle download receipt
  const handleDownloadReceipt = () => {
    // In a real app, this would generate a PDF
    // For now, we'll create a simple text receipt
    
    const receipt = `
========================================
        PESAFLO RECEIPT
========================================

Transaction ID: ${transactionData.id}
Status: ${transactionData.status.toUpperCase()}
Date: ${new Date(transactionData.timestamp).toLocaleString()}

Amount: KSh ${transactionData.amount.toLocaleString()}
Fee: KSh ${transactionData.fee?.toLocaleString() || '0'}
Total: KSh ${transactionData.total?.toLocaleString() || transactionData.amount.toLocaleString()}

Recipient: ${transactionData.recipient}
${transactionData.description ? `Description: ${transactionData.description}` : ''}

========================================
Thank you for using PesaFlow!
========================================
    `;

    // Create and download the receipt
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${transactionData.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Handle send again
  const handleSendAgain = () => {
    navigate('/transfer/send');
  };

  // Get status configuration
  const getStatusConfig = (status) => {
    const configs = {
      successful: {
        icon: 'Successful',
        title: 'Successful!',
        color: '#10b981',
        bgColor: '#d1fae5',
        borderColor: '#10b981',
        textColor: '#065f46'
      },
      pending: {
        icon: 'Pending',
        title: 'Pending',
        color: '#f59e0b',
        bgColor: '#fef3c7',
        borderColor: '#f59e0b',
        textColor: '#92400e'
      },
      failed: {
        icon: 'Failed',
        title: 'Failed',
        color: '#ef4444',
        bgColor: '#fee2e2',
        borderColor: '#ef4444',
        textColor: '#991b1b'
      }
    };
    return configs[status] || configs.successful;
  };

  const statusConfig = getStatusConfig(transactionData.status);

  // Format currency
  const formatCurrency = (amount) => {
    return `KSh ${Number(amount).toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-KE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="transfer-status-container" ref={pageRef}>
      {/* Page Header */}
      <div className="status-header">
        <h1>Transfer Status</h1>
        <p className="status-description">Transaction result</p>
      </div>

      {/* Status Card */}
      <div className="status-card">
        {/* Status Icon and Title */}
        <div className="status-icon-container">
          <div 
            className="status-icon"
            style={{ 
              background: statusConfig.bgColor,
              borderColor: statusConfig.borderColor
            }}
          >
            <span className="icon-emoji">{statusConfig.icon}</span>
          </div>
          <h2 
            className="status-title"
            style={{ color: statusConfig.color }}
          >
            {statusConfig.title}
          </h2>
        </div>

        {/* Transaction Details */}
        <div className="status-details">
          <div className="detail-row">
            <span className="detail-label">Transaction ID</span>
            <span className="detail-value id">{transactionData.id}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Amount</span>
            <span className="detail-value amount">
              {formatCurrency(transactionData.amount)}
            </span>
          </div>

          {transactionData.fee && (
            <div className="detail-row">
              <span className="detail-label">Fee</span>
              <span className="detail-value fee">
                {formatCurrency(transactionData.fee)}
              </span>
            </div>
          )}

          {transactionData.total && (
            <div className="detail-row total">
              <span className="detail-label">Total</span>
              <span className="detail-value total-amount">
                {formatCurrency(transactionData.total)}
              </span>
            </div>
          )}

          <div className="detail-row">
            <span className="detail-label">Recipient</span>
            <span className="detail-value recipient">
              {transactionData.recipient}
            </span>
          </div>

          {transactionData.description && (
            <div className="detail-row">
              <span className="detail-label">Description</span>
              <span className="detail-value description">
                {transactionData.description}
              </span>
            </div>
          )}

          <div className="detail-row">
            <span className="detail-label">Date & Time</span>
            <span className="detail-value date">
              {formatDate(transactionData.timestamp)}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Status</span>
            <span 
              className={`detail-value status-badge ${transactionData.status}`}
              style={{ 
                background: statusConfig.bgColor,
                color: statusConfig.textColor,
                borderColor: statusConfig.borderColor
              }}
            >
              {transactionData.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="action-btn download-btn"
          onClick={handleDownloadReceipt}
        >
          Download Receipt
        </button>
        
        <button 
          className="action-btn dashboard-btn"
          onClick={handleBackToDashboard}
        >
          Back to Dashboard
        </button>
        
        <button 
          className="action-btn send-again-btn"
          onClick={handleSendAgain}
        >
          Send Again
        </button>
      </div>

      {/* Support Message */}
      {transactionData.status === 'failed' && (
        <div className="support-message">
          <p>
            Transaction failed. Please check your balance and try again. 
            If the problem persists, contact support.
          </p>
        </div>
      )}

      {transactionData.status === 'pending' && (
        <div className="support-message pending">
          <p>
            Your transaction is being processed. You will receive a notification 
            once it's completed.
          </p>
        </div>
      )}
    </div>
  );
};

export default TransferStatus;
