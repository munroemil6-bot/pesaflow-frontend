
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../redux/slices/transactionSlice';
import { createTransfer } from '../../api';
import './ConfirmTransfer.css';

const ConfirmTransfer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  // State management
  const [transferData, setTransferData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get transfer data from navigation state or Redux
  useEffect(() => {
    // Option 1: From navigation state (React Router)
    const state = location.state;
    if (state && state.transferData) {
      setTransferData(state.transferData);
      return;
    }

    // Option 2: From Redux (when connected)
    // const reduxData = useSelector(selectTransferData);
    // if (reduxData) setTransferData(reduxData);

    // Option 3: Fallback mock data for testing
    const mockData = {
      recipient: 'John Kamau',
      phone: '0712 345 678',
      amount: 1000,
      fee: 10,
      total: 1010,
      description: 'Payment for services',
      transactionId: 'TX-2024-001'
    };
    setTransferData(mockData);
  }, [location]);

  // Handle confirm transfer
  const handleConfirm = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await createTransfer({
        ...(transferData.beneficiaryId
          ? { recipient_id: transferData.beneficiaryId }
          : { recipient_phone: transferData.phone.replace(/\s/g, '') }),
        amount: transferData.amount,
        description: transferData.description || '',
      });

      // Success - navigate to status page
      const transaction = {
        ownerId: user.id,
        id: response.id,
        reference: response.reference,
        recipient: response.recipient_name || transferData.recipient,
        recipientPhone: transferData.phone,
        amount: Number(transferData.amount),
        fee: Number(transferData.fee || 0),
        total: Number(response.total_amount || transferData.total || transferData.amount),
        status: response.status || 'successful',
        type: 'sent',
        date: new Date().toISOString(),
      }
      dispatch(addTransaction(transaction))
      navigate('/transfer/status', {
        state: {
          transactionData: {
            ...transferData,
            status: response.status || 'success',
            transactionId: response.reference || response.id,
            timestamp: response.created_at || new Date().toISOString()
          }
        }
      });

    } catch (err) {
      // Error handling
      setError(err.message || 'Failed to process transfer. Please try again.');
      setIsLoading(false);
    }
  };

  // Handle back/cancel
  const handleBack = () => {
    navigate('/transfer/send');
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  // Format phone number
  const formatPhone = (phone) => {
    return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  };

  // Loading state
  if (!transferData) {
    return (
      <div className="confirm-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading transfer details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="confirm-container">
      {/* Page Header */}
      <div className="confirm-header">
        <h1>Confirm Transfer</h1>
        <p className="confirm-description">Review and confirm your transaction</p>
      </div>

      {/* Transfer Summary Card */}
      <div className="transfer-summary">
        <div className="summary-section">
          <div className="summary-label">Sending to</div>
          <div className="recipient-info">
            <div className="recipient-name">{transferData.recipient}</div>
            <div className="recipient-phone">
              {formatPhone(transferData.phone)}
            </div>
          </div>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-details">
          <div className="detail-row">
            <span className="detail-label">Amount</span>
            <span className="detail-value amount">
              {formatCurrency(transferData.amount)}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Transaction Fee</span>
            <span className="detail-value fee">
              {formatCurrency(transferData.fee || 10)}
            </span>
          </div>

          <div className="detail-row total">
            <span className="detail-label">Total</span>
            <span className="detail-value total-amount">
              {formatCurrency(transferData.total || transferData.amount + (transferData.fee || 10))}
            </span>
          </div>
        </div>

        {transferData.description && (
          <>
            <div className="summary-divider"></div>
            <div className="summary-section">
              <div className="summary-label">Description</div>
              <div className="description-text">
                {transferData.description}
              </div>
            </div>
          </>
        )}

        <div className="summary-divider"></div>

        <div className="summary-section">
          <div className="summary-label">Transaction ID</div>
          <div className="transaction-id">
            {transferData.transactionId || 'Pending'}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          className="cancel-btn" 
          onClick={handleBack}
          disabled={isLoading}
        >
          Cancel
        </button>
        
        <button 
          className="confirm-btn" 
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-small"></span>
              Processing...
            </>
          ) : (
            'Confirm Transfer'
          )}
        </button>
      </div>

      {/* Loading Overlay (Optional full-page overlay) */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner-large"></div>
            <h3>Processing your transfer</h3>
            <p>Please wait while we complete your transaction...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmTransfer;

