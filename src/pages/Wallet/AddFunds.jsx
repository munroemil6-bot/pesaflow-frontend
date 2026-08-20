import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFunds } from '../../redux/slices/walletSlice';
import './Wallet.css';

const AddFunds = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  
  // State management
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};
    
    // Amount validation
    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(amount) || Number(amount) < 100) {
      newErrors.amount = 'Minimum amount is KSh 100';
    } else if (Number(amount) > 100000) {
      newErrors.amount = 'Maximum amount is KSh 100,000';
    } else if (amount.includes('.')) {
      newErrors.amount = 'Amount must be a whole number';
    }
    
    // Payment method validation
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Format currency for display
  const formatCurrency = (value) => {
    if (!value) return 'KSh 0';
    const num = Number(value);
    if (isNaN(num)) return 'KSh 0';
    return `KSh ${num.toLocaleString()}`;
  };

  // Handle amount change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setAmount(value);
      // Clear error when user types
      if (errors.amount) {
        setErrors({ ...errors, amount: '' });
      }
    }
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    // Clear error when user selects
    if (errors.paymentMethod) {
      setErrors({ ...errors, paymentMethod: '' });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Show loading state
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - navigate to next page (TBD)
      console.log('Form submitted:', { amount: Number(amount), paymentMethod });
      dispatch(addFunds({ amount: Number(amount), userId }));
      
      // For now, navigate to wallet or confirmation page
      // navigate('/wallet/confirmation'); // Uncomment when ready
      
      // For demo, just show success alert
      alert(`Successfully added KSh ${Number(amount).toLocaleString()} via ${paymentMethod}!`);
      
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrors({ 
        submit: 'Failed to process payment. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get payment method label
  const getPaymentMethodLabel = (method) => {
    const labels = {
      mpesa: 'M-PESA',
      bank: 'Bank Transfer',
      card: 'Debit Card'
    };
    return labels[method] || method;
  };

  // Get payment method icon
  const getPaymentMethodIcon = (method) => {
    const icons = {
      mpesa: '📱',
      bank: '🏦',
      card: '💳'
    };
    return icons[method] || '💰';
  };

  return (
    <div className="add-funds-container">
      {/* Page Header */}
      <div className="add-funds-header">
        <button 
          className="back-btn" 
          onClick={() => navigate('/wallet')}
        >
          ← Back
        </button>
        <h1>Add Funds</h1>
        <p className="add-funds-description">Add money to your wallet</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="add-funds-form">
        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="amount">
            Amount
            <span className="required-star">*</span>
          </label>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">KSh</span>
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className={`amount-input ${errors.amount ? 'error' : ''}`}
              disabled={isLoading}
            />
          </div>
          {errors.amount && (
            <span className="error-message">{errors.amount}</span>
          )}
          <div className="amount-hint">
            <span>Min: KSh 100</span>
            <span>Max: KSh 100,000</span>
          </div>
          <div className="quick-amounts">
            <button 
              type="button" 
              className="quick-amount-btn"
              onClick={() => handleAmountChange({ target: { value: '500' } })}
              disabled={isLoading}
            >
              KSh 500
            </button>
            <button 
              type="button" 
              className="quick-amount-btn"
              onClick={() => handleAmountChange({ target: { value: '1000' } })}
              disabled={isLoading}
            >
              KSh 1,000
            </button>
            <button 
              type="button" 
              className="quick-amount-btn"
              onClick={() => handleAmountChange({ target: { value: '5000' } })}
              disabled={isLoading}
            >
              KSh 5,000
            </button>
            <button 
              type="button" 
              className="quick-amount-btn"
              onClick={() => handleAmountChange({ target: { value: '10000' } })}
              disabled={isLoading}
            >
              KSh 10,000
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="form-group">
          <label>
            Payment Method
            <span className="required-star">*</span>
          </label>
          <div className="payment-methods">
            {['mpesa', 'bank', 'card'].map((method) => (
              <div 
                key={method}
                className={`payment-option ${paymentMethod === method ? 'selected' : ''}`}
                onClick={() => !isLoading && handlePaymentMethodChange(method)}
              >
                <div className="payment-option-content">
                  <span className="payment-icon">
                    {getPaymentMethodIcon(method)}
                  </span>
                  <span className="payment-label">
                    {getPaymentMethodLabel(method)}
                  </span>
                </div>
                <div className="payment-radio">
                  <input
                    type="radio"
                    id={`payment-${method}`}
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => handlePaymentMethodChange(method)}
                    disabled={isLoading}
                  />
                  <label htmlFor={`payment-${method}`} />
                </div>
              </div>
            ))}
          </div>
          {errors.paymentMethod && (
            <span className="error-message">{errors.paymentMethod}</span>
          )}
        </div>

        {/* Amount Preview */}
        {amount && !errors.amount && (
          <div className="amount-preview">
            <span>You're about to add:</span>
            <strong>{formatCurrency(amount)}</strong>
          </div>
        )}

        {/* Submit Error */}
        {errors.submit && (
          <div className="submit-error">
            {errors.submit}
          </div>
        )}

        {/* Continue Button */}
        <button 
          type="submit" 
          className="continue-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-small"></span>
              Processing...
            </>
          ) : (
            'Continue'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddFunds;
