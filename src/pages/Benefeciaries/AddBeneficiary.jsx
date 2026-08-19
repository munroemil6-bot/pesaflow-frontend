import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBeneficiary.css';

const STORAGE_KEY = 'pesaflow-beneficiaries';

const AddBeneficiary = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bankName: '',
    accountNumber: '',
    accountType: 'individual',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Beneficiary name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(07|01)\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid Kenyan phone number (e.g., 0712345678)';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (formData.accountType === 'business' && !formData.bankName.trim()) {
      newErrors.bankName = 'Bank name is required for business accounts';
    }

    if (formData.accountType === 'business' && !formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required for business accounts';
    } else if (formData.accountType === 'business' && formData.accountNumber.trim().length < 8) {
      newErrors.accountNumber = 'Account number must be at least 8 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccess(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newBeneficiary = {
        id: Date.now(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        bank: formData.bankName.trim() || 'M-Pesa',
        accountType: formData.accountType,
        notes: formData.notes.trim(),
      };

      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const updated = Array.isArray(existing) ? [...existing, newBeneficiary] : [newBeneficiary];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      setSuccess(true);

      setTimeout(() => {
        navigate('/beneficiaries');
      }, 600);
    } catch (err) {
      setErrors({
        submit: err.message || 'Failed to add beneficiary. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/beneficiaries');
  };

  const formatPhoneDisplay = (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\s/g, '');
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    return phone;
  };

  return (
    <div className="add-beneficiary-container">
      <div className="beneficiary-header">
        <button type="button" className="back-btn" onClick={handleCancel}>
          ← Back
        </button>
        <h1>Add Beneficiary</h1>
        <p className="beneficiary-description">Add a new recipient for transfers</p>
      </div>

      {success && (
        <div className="success-message">
          <span className="success-icon">✅</span>
          Beneficiary added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="beneficiary-form">
        <div className="form-group">
          <label htmlFor="name">
            Full Name <span className="required-star">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter beneficiary's full name"
            className={`form-input ${errors.name ? 'error' : ''}`}
            disabled={isLoading}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone Number <span className="required-star">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0712345678"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            disabled={isLoading}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
          <span className="field-hint">Enter a valid Kenyan phone number</span>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email Address <span className="optional">(Optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="beneficiary@email.com"
            className={`form-input ${errors.email ? 'error' : ''}`}
            disabled={isLoading}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>
            Account Type <span className="required-star">*</span>
          </label>

          <div className="account-type-options">
            <div
              className={`account-type-option ${formData.accountType === 'individual' ? 'selected' : ''}`}
              onClick={() => !isLoading && setFormData((prev) => ({ ...prev, accountType: 'individual' }))}
            >
              <input
                type="radio"
                id="individual"
                name="accountType"
                value="individual"
                checked={formData.accountType === 'individual'}
                onChange={() => setFormData((prev) => ({ ...prev, accountType: 'individual' }))}
                disabled={isLoading}
              />
              <label htmlFor="individual">👤 Individual</label>
            </div>

            <div
              className={`account-type-option ${formData.accountType === 'business' ? 'selected' : ''}`}
              onClick={() => !isLoading && setFormData((prev) => ({ ...prev, accountType: 'business' }))}
            >
              <input
                type="radio"
                id="business"
                name="accountType"
                value="business"
                checked={formData.accountType === 'business'}
                onChange={() => setFormData((prev) => ({ ...prev, accountType: 'business' }))}
                disabled={isLoading}
              />
              <label htmlFor="business">🏢 Business</label>
            </div>
          </div>
        </div>

        {formData.accountType === 'business' && (
          <>
            <div className="form-group">
              <label htmlFor="bankName">
                Bank Name <span className="required-star">*</span>
              </label>
              <input
                id="bankName"
                name="bankName"
                type="text"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="e.g., Equity Bank"
                className={`form-input ${errors.bankName ? 'error' : ''}`}
                disabled={isLoading}
              />
              {errors.bankName && <span className="error-message">{errors.bankName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="accountNumber">
                Account Number <span className="required-star">*</span>
              </label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                className={`form-input ${errors.accountNumber ? 'error' : ''}`}
                disabled={isLoading}
              />
              {errors.accountNumber && <span className="error-message">{errors.accountNumber}</span>}
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="notes">
            Notes <span className="optional">(Optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any notes about this beneficiary"
            className="form-textarea"
            rows="3"
            disabled={isLoading}
          />
        </div>

        {formData.name && formData.phone && (
          <div className="beneficiary-preview">
            <h4>Preview</h4>
            <div className="preview-item">
              <span className="preview-label">Name:</span>
              <span>{formData.name}</span>
            </div>
            <div className="preview-item">
              <span className="preview-label">Phone:</span>
              <span>{formatPhoneDisplay(formData.phone)}</span>
            </div>
            {formData.email && (
              <div className="preview-item">
                <span className="preview-label">Email:</span>
                <span>{formData.email}</span>
              </div>
            )}
            <div className="preview-item">
              <span className="preview-label">Type:</span>
              <span>{formData.accountType === 'business' ? '🏢 Business' : '👤 Individual'}</span>
            </div>
            {formData.accountType === 'business' && formData.bankName && (
              <div className="preview-item">
                <span className="preview-label">Bank:</span>
                <span>{formData.bankName}</span>
              </div>
            )}
          </div>
        )}

        {errors.submit && (
          <div className="submit-error">
            <span className="error-icon">⚠️</span>
            {errors.submit}
          </div>
        )}

        <div className="action-buttons">
          <button type="button" className="cancel-btn" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </button>
          <button type="submit" className="add-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-small"></span>
                Adding...
              </>
            ) : (
              '+ Add Beneficiary'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBeneficiary;