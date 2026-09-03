import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initiateStkPush } from '../../api';
import { setPendingPayment } from '../../redux/slices/walletSlice';

const AddFunds = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phone = useSelector((state) => state.auth.user?.phone);
  const currentBalance = useSelector((state) => state.wallet.balance);
  
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
    } else if (isNaN(amount) || Number(amount) < 10) {
      newErrors.amount = 'Minimum amount is KSh 10';
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

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (paymentMethod !== 'mpesa') {
        throw new Error('Only M-PESA funding is connected to the backend.');
      }
      if (!phone) {
        throw new Error('Add a phone number to your profile before requesting an M-PESA payment.');
      }

      const response = await initiateStkPush(phone, amount);

      dispatch(setPendingPayment({
        paymentId: response.payment_id,
        checkoutRequestId: response.checkout_request_id,
        amount: Number(amount),
        initialBalance: Number(currentBalance) || 0,
      }));

      alert(response.customer_message || 'Check your phone and enter your M-PESA PIN.');
      navigate('/wallet', { replace: true });
    } catch (error) {
      console.error('Error processing payment:', error);
      const statusMessages = {
        400: 'Enter a valid phone number and amount.',
        401: 'You are not authenticated. Please log in again.',
        502: 'M-PESA is temporarily unavailable. Please try again later.',
      };
      setErrors({
        submit: statusMessages[error.status] || error.message || 'Failed to process payment. Please try again.'
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
      mpesa: 'M-PESA',
      bank: 'Bank',
      card: 'Card'
    };
    return icons[method] || 'Payment';
  };

  return (
    <div className="mx-auto max-w-3xl p-5">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <button 
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          onClick={() => navigate('/wallet')}
        >
          ← Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Funds</h1>
          <p className="text-sm text-slate-600">Add money to your wallet</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-4 rounded-xl border border-emerald-100 bg-white p-4">
        {/* Amount Input */}
        <div className="space-y-2">
          <label htmlFor="amount">
            Amount
            <span className="required-star">*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-emerald-50 px-2.5 py-2 font-bold text-emerald-800">KSh</span>
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className={`w-40 rounded-lg border px-3 py-2 outline-none ${errors.amount ? 'border-red-500' : 'border-emerald-100'}`}
              disabled={isLoading}
            />
          </div>
          {errors.amount && (
            <span className="text-sm text-red-600">{errors.amount}</span>
          )}
          <div className="flex justify-between text-xs text-slate-500">
            <span>Min: KSh 10</span>
            <span>Max: KSh 100,000</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              type="button" 
              className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-2 text-sm hover:bg-slate-200"
              onClick={() => handleAmountChange({ target: { value: '500' } })}
              disabled={isLoading}
            >
              KSh 500
            </button>
            <button 
              type="button" 
              className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-2 text-sm hover:bg-slate-200"
              onClick={() => handleAmountChange({ target: { value: '1000' } })}
              disabled={isLoading}
            >
              KSh 1,000
            </button>
            <button 
              type="button" 
              className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-2 text-sm hover:bg-slate-200"
              onClick={() => handleAmountChange({ target: { value: '5000' } })}
              disabled={isLoading}
            >
              KSh 5,000
            </button>
            <button 
              type="button" 
              className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-2 text-sm hover:bg-slate-200"
              onClick={() => handleAmountChange({ target: { value: '10000' } })}
              disabled={isLoading}
            >
              KSh 10,000
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-6 space-y-2">
          <label>
            Payment Method
            <span className="required-star">*</span>
          </label>
          <div className="flex gap-2 max-md:flex-col">
            {['mpesa', 'bank', 'card'].map((method) => (
              <div 
                key={method}
                className={`flex flex-1 cursor-pointer items-center justify-between rounded-lg border p-2.5 ${paymentMethod === method ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-500/10' : 'border-emerald-50 bg-emerald-50/40'}`}
                onClick={() => !isLoading && handlePaymentMethodChange(method)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getPaymentMethodIcon(method)}
                  </span>
                  <span className="font-bold">
                    {getPaymentMethodLabel(method)}
                  </span>
                </div>
                <div>
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
            <span className="text-sm text-red-600">{errors.paymentMethod}</span>
          )}
        </div>

        {/* Amount Preview */}
        {amount && !errors.amount && (
          <div className="mt-4 flex items-center justify-between rounded-lg bg-emerald-50 p-3 text-emerald-800">
            <span>You're about to add:</span>
            <strong>{formatCurrency(amount)}</strong>
          </div>
        )}

        {/* Submit Error */}
        {errors.submit && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {errors.submit}
          </div>
        )}

        {/* Continue Button */}
        <button 
          type="submit" 
          className="mt-4 w-full rounded-xl border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 font-extrabold text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
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
