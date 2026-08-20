import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SendMoney.css';

const SendMoney = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const beneficiaries = useSelector((state) => state.beneficiaries.list);
  const walletBalance = useSelector((state) => state.wallet.balance);
  
  // State management
  const [formData, setFormData] = useState({
    beneficiaryId: '',
    recipientPhone: '',
    amount: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  // Get query params
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      beneficiaryId: params.get('beneficiary_id')
    };
  };

  // Fetch beneficiaries and handle pre-fill
  useEffect(() => {
    const fetchBeneficiaries = async () => {
      setIsFetching(true);
      try {
        // Check for beneficiary_id in query params
        const { beneficiaryId } = getQueryParams();
        if (beneficiaryId) {
          const beneficiary = beneficiaries.find(b => String(b.id) === beneficiaryId);
          if (beneficiary) {
            setFormData(prev => ({
              ...prev,
              beneficiaryId: beneficiary.id
            }));
          }
        }
        
        // Check if beneficiary was passed via location state (from Beneficiaries page)
        if (location.state?.beneficiary) {
          setFormData(prev => ({
            ...prev,
            beneficiaryId: location.state.beneficiary.id
          }));
        }
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchBeneficiaries();
  }, [beneficiaries, location.state, location.search]);

  // Get selected beneficiary object
  const getSelectedBeneficiary = () => {
    return beneficiaries.find(b => b.id === formData.beneficiaryId);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    const phone = formData.recipientPhone.replace(/\s/g, '')
    if (!formData.beneficiaryId && !phone) {
      newErrors.recipient = 'Select a beneficiary or enter a phone number';
    } else if (phone && !/^(07|01)\d{8}$/.test(phone)) {
      newErrors.recipient = 'Enter a valid Kenyan phone number';
    }

    // Amount validation
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || Number(formData.amount) < 100) {
      newErrors.amount = 'Minimum amount is KSh 100';
    } else if (Number(formData.amount) > walletBalance) {
      newErrors.amount = `Amount exceeds wallet balance of KSh ${walletBalance.toLocaleString()}`;
    }

    // Description validation (optional, max 200 chars)
    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle continue button
  const handleContinue = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const beneficiary = getSelectedBeneficiary();
      const recipientPhone = beneficiary?.phone || formData.recipientPhone.replace(/\s/g, '');
      
      // Simulate API call to save data
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to confirm transfer with data
      navigate('/transfer/confirm', {
        state: {
          transferData: {
            recipient: beneficiary?.name || 'Phone recipient',
            phone: recipientPhone,
            amount: Number(formData.amount),
            fee: calculateFee(Number(formData.amount)),
            total: Number(formData.amount) + calculateFee(Number(formData.amount)),
            description: formData.description || '',
            beneficiaryId: beneficiary?.id || null
          }
        }
      });

    } catch (error) {
      console.error('Error processing transfer:', error);
      setErrors({
        submit: 'Failed to process transfer. Please try again.'
      });
      setIsLoading(false);
    }
  };

  // Calculate transaction fee
  const calculateFee = (amount) => {
    if (amount <= 1000) return 10;
    if (amount <= 5000) return 25;
    if (amount <= 10000) return 50;
    return 75;
  };

  // Handle cancel
  const handleCancel = () => {
    navigate(-1);
  };

  // Handle beneficiary selection
  const handleBeneficiarySelect = (id) => {
    setFormData(prev => ({
      ...prev,
      beneficiaryId: id,
      recipientPhone: ''
    }));
    setShowDropdown(false);
    if (errors.beneficiary) {
      setErrors({ ...errors, beneficiary: '' });
    }
  };

  const handlePhoneChange = (value) => {
    if (value === '' || /^[\d\s]+$/.test(value)) {
      setFormData(prev => ({ ...prev, recipientPhone: value, beneficiaryId: '' }));
      if (errors.recipient) setErrors(prev => ({ ...prev, recipient: '' }));
    }
  };

  // Handle amount change
  const handleAmountChange = (value) => {
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        amount: value
      }));
      if (errors.amount) {
        setErrors({ ...errors, amount: '' });
      }
    }
  };

  // Handle description change
  const handleDescriptionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      description: value
    }));
    if (errors.description) {
      setErrors({ ...errors, description: '' });
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `KSh ${Number(amount).toLocaleString()}`;
  };

  // Format phone number
  const formatPhone = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\s/g, '');
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    return phone;
  };

  // Get beneficiary display text
  const getBeneficiaryDisplay = () => {
    const beneficiary = getSelectedBeneficiary();
    if (!beneficiary) return 'Select a beneficiary';
    return `${beneficiary.name} (${formatPhone(beneficiary.phone)})`;
  };

  // Loading state for fetching beneficiaries
  if (isFetching) {
    return (
      <div className="send-money-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading beneficiaries...</p>
        </div>
      </div>
    );
  }

  const selectedBeneficiary = getSelectedBeneficiary();

  return (
    <div className="send-money-container">
      {/* Page Header */}
      <div className="send-money-header">
        <h1>Send Money</h1>
        <p className="send-money-description">Send to a phone number or saved beneficiary</p>
      </div>

      {/* Form */}
      <form onSubmit={handleContinue} className="send-money-form">
        <div className="form-group">
          <label htmlFor="recipient-phone">Phone number <span className="optional">(Optional if choosing a beneficiary)</span></label>
          <input id="recipient-phone" type="tel" value={formData.recipientPhone} onChange={(e) => handlePhoneChange(e.target.value)} placeholder="0712345678" className={`recipient-input ${errors.recipient ? 'error' : ''}`} disabled={isLoading} />
        </div>

        <div className="recipient-divider">or choose a saved beneficiary</div>

        {/* Beneficiary Selection */}
        <div className="form-group">
          <label htmlFor="beneficiary">
            Select Beneficiary <span className="required-star">*</span>
          </label>
          <div className="beneficiary-select-wrapper">
            <div 
              className={`beneficiary-select ${errors.recipient ? 'error' : ''}`}
              onClick={() => !isLoading && setShowDropdown(!showDropdown)}
            >
              <span className="beneficiary-display">
                {getBeneficiaryDisplay()}
              </span>
              <span className="dropdown-arrow">{showDropdown ? '▲' : '▼'}</span>
            </div>
            
            {showDropdown && (
              <div className="beneficiary-dropdown">
                {beneficiaries.length === 0 ? (
                  <div className="dropdown-empty">
                    <p>No beneficiaries found</p>
                    <button 
                      type="button"
                      className="add-beneficiary-link"
                      onClick={() => navigate('/beneficiaries/add')}
                    >
                      + Add Beneficiary
                    </button>
                  </div>
                ) : (
                  beneficiaries.map((beneficiary) => (
                    <div
                      key={beneficiary.id}
                      className={`dropdown-item ${formData.beneficiaryId === beneficiary.id ? 'selected' : ''}`}
                      onClick={() => handleBeneficiarySelect(beneficiary.id)}
                    >
                      <div className="dropdown-item-info">
                        <span className="dropdown-item-name">{beneficiary.name}</span>
                        <span className="dropdown-item-phone">
                          {formatPhone(beneficiary.phone)}
                        </span>
                      </div>
                      <span className="dropdown-item-type">
                        {beneficiary.accountType === 'business' ? '🏢' : '👤'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          {errors.recipient && (
            <span className="error-message">{errors.recipient}</span>
          )}
        </div>

        {/* Selected Beneficiary Preview */}
        {selectedBeneficiary && (
          <div className="beneficiary-preview">
            <span className="preview-label">Sending to:</span>
            <span className="preview-name">{selectedBeneficiary.name}</span>
            <span className="preview-phone">{formatPhone(selectedBeneficiary.phone)}</span>
          </div>
        )}

        {/* Amount Input */}
        <div className="form-group">
          <label htmlFor="amount">
            Amount <span className="required-star">*</span>
          </label>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">KSh</span>
            <input
              id="amount"
              type="text"
              value={formData.amount}
              onChange={(e) => handleAmountChange(e.target.value)}
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
            <span>Balance: KSh {walletBalance.toLocaleString()}</span>
            {formData.amount && !errors.amount && Number(formData.amount) > 0 && (
              <span>Fee: KSh {calculateFee(Number(formData.amount))}</span>
            )}
          </div>
          <div className="quick-amounts">
            <button 
              type="button" 
              className="quick-amount-btn"
              onClick={() => handleAmountChange('100')}
              disabled={isLoading}
            >
              KSh 100
            </button>
            <button 
              type="button" 
              className="quick-amount-btn"
              onClick={() => handleAmountChange('500')}
              disabled={isLoading}
            >
              KSh 500
            </button>
            <button 
              type="button" 
              className="quick-amount-btn"
              onClick={() => handleAmountChange('1000')}
              disabled={isLoading}
            >
              KSh 1,000
            </button>
            <button 
              type="button" 
              className="quick-amount-btn"
              onClick={() => handleAmountChange('5000')}
              disabled={isLoading}
            >
              KSh 5,000
            </button>
          </div>
        </div>

        {/* Description (Optional) */}
        <div className="form-group">
          <label htmlFor="description">
            Description <span className="optional">(Optional)</span>
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Brief description of the payment..."
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            rows="3"
            disabled={isLoading}
            maxLength={200}
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
          <div className="description-hint">
            <span>{formData.description.length}/200 characters</span>
          </div>
        </div>

        {/* Amount Preview */}
        {formData.amount && !errors.amount && Number(formData.amount) >= 100 && (selectedBeneficiary || formData.recipientPhone) && (
          <div className="amount-preview">
            <div className="preview-row">
              <span>Amount:</span>
              <span>{formatCurrency(formData.amount)}</span>
            </div>
            <div className="preview-row">
              <span>Fee:</span>
              <span>{formatCurrency(calculateFee(Number(formData.amount)))}</span>
            </div>
            <div className="preview-row total">
              <span>Total:</span>
              <span>{formatCurrency(Number(formData.amount) + calculateFee(Number(formData.amount)))}</span>
            </div>
          </div>
        )}

        {/* Submit Error */}
        {errors.submit && (
          <div className="submit-error">
            <span className="error-icon">⚠️</span>
            {errors.submit}
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
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
              'Continue →'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMoney;
