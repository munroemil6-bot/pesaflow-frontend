import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TransactionDetails.css";

function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const fetchTransaction = async () => {
    setLoading(true);
    setError("");

    try {
      

      const response = await fetch(
        `http://127.0.0.1:8000/api/transactions/${id}/`
      );

      if (!response.ok) {
        throw new Error("Transaction not found");
      }

      const data = await response.json();

      setTransaction(data);
    } catch (err) {
      console.error(err);

      setError(
        "Transaction could not be found. Please check the transaction ID."
      );
    } finally {
      setLoading(false);
    }
  };

  
  const formatMoney = (amount) => {
    return `KSh ${Number(amount).toLocaleString()}`;
  };

  
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  
  const downloadReceipt = () => {
    if (!transaction) return;

    const receipt = `
PESAFLOW
TRANSACTION RECEIPT
==============================

Transaction ID:
${transaction.transaction_id || id}

Recipient:
${transaction.recipient || transaction.recipient_name || "N/A"}

Phone:
${transaction.phone || transaction.recipient_phone || "N/A"}

Amount:
${formatMoney(transaction.amount)}

Fee:
${formatMoney(transaction.fee)}

Total:
${formatMoney(
  transaction.total ||
    Number(transaction.amount) + Number(transaction.fee)
)}

Status:
${transaction.status || "Successful"}

Date:
${formatDate(transaction.date || transaction.created_at)}

==============================
Thank you for using PesaFlow.
`;

    const blob = new Blob([receipt], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `PesaFlow-Receipt-${transaction.transaction_id || id}.txt`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  
  if (loading) {
    return (
      <div className="transaction-page">
        <div className="transaction-card loading-card">
          <div className="spinner"></div>

          <h2>Loading transaction...</h2>

          <p>Please wait while we fetch the transaction details.</p>
        </div>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="transaction-page">
        <div className="transaction-card error-card">
          <div className="error-icon">!</div>

          <h2>Transaction Not Found</h2>

          <p>{error}</p>

          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <div className="transaction-page">
      <div className="transaction-card">

        <div className="transaction-header">
          <h1>Transaction Details</h1>

          <span className="success-status">
            ✓ {transaction.status || "Successful"}
          </span>
        </div>

        {/* Transaction ID */}
        <div className="transaction-id">
          <span>Transaction ID</span>

          <strong>
            {transaction.transaction_id || id}
          </strong>
        </div>

        <div className="details-section">

          {/* Recipient */}
          <div className="detail-row">
            <span>Recipient</span>

            <strong>
              {transaction.recipient ||
                transaction.recipient_name ||
                "N/A"}
            </strong>
          </div>

          {/* Phone */}
          <div className="detail-row">
            <span>Phone</span>

            <strong>
              {transaction.phone ||
                transaction.recipient_phone ||
                "N/A"}
            </strong>
          </div>

          {/* Amount */}
          <div className="detail-row">
            <span>Amount</span>

            <strong>
              {formatMoney(transaction.amount)}
            </strong>
          </div>

          {/* Fee */}
          <div className="detail-row">
            <span>Fee</span>

            <strong>
              {formatMoney(transaction.fee)}
            </strong>
          </div>

          {/* Total */}
          <div className="detail-row total-row">
            <span>Total</span>

            <strong>
              {formatMoney(
                transaction.total ||
                  Number(transaction.amount) +
                    Number(transaction.fee)
              )}
            </strong>
          </div>

          {/* Status */}
          <div className="detail-row">
            <span>Status</span>

            <strong className="status-text">
              ✓ {transaction.status || "Successful"}
            </strong>
          </div>

          {/* Date */}
          <div className="detail-row">
            <span>Date</span>

            <strong>
              {formatDate(
                transaction.date ||
                  transaction.created_at
              )}
            </strong>
          </div>

        </div>

        {/* Buttons */}
        <div className="transaction-actions">

          <button
            className="download-button"
            onClick={downloadReceipt}
          >
            ↓ Download Receipt
          </button>

          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

        </div>

      </div>
    </div>
  );
}

export default TransactionDetails;

/**
 * ========================================================
 * TRANSACTION DETAILS PAGE
 * ========================================================
 * 
 * Owner: NASRA (Transactions + Transfer)
 * Week 1: Day 3 (Main Application)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌────────────────────────────────────┐
 * │  Transaction Details               │
 * │                                    │
 * │  Transaction ID: TXN-123456        │
 * │                                    │
 * │  Recipient:      John Kamau        │
 * │  Phone:          0712 XXXX XXX     │
 * │                                    │
 * │  Amount:         KSh 1,000         │
 * │  Fee:            KSh 10            │
 * │  Total:          KSh 1,010         │
 * │                                    │
 * │  Status:         Successful ✓      │
 * │  Date:           17 August 2026    │
 * │                                    │
 * │  [ Download Receipt ]              │
 * │  [ Back ]                          │
 * └────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Get transaction ID from URL params
 * ✅ Display transaction details
 * ✅ Show: ID, recipient, phone, amount, fee, total, status, date
 * ✅ Download Receipt button
 * ✅ Back button
 * ✅ Loading state while fetching
 * ✅ Error state if transaction not found
 * ✅ Responsive design
 * 
 * ROUTE PARAMS:
 * - /transactions/:id
 * - Extract transaction ID from URL params
 * 
 * DATA STRUCTURE:
 * {
 *   id: string,
 *   recipient: string,
 *   recipientPhone: string,
 *   amount: number,
 *   fee: number,
 *   status: string,
 *   date: string,
 *   type: string
 * }
 * 
 * FUNCTIONS TO BUILD:
 * - useParams: get transaction ID from URL
 * - useEffect: fetch transaction details
 * - handleDownloadReceipt: generate PDF or download receipt
 * - handleBack: navigate back to transactions list
 * 
 * NEXT WEEK TODO:
 * - Connect to transaction details API
 * - Implement receipt PDF generation
 * - Add share receipt via email/SMS
 * - Add retry failed transaction button
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useParams from react-router-dom
// TODO: Import useNavigate from react-router-dom

 {
  // TODO: Set up useParams hook to get transaction ID from URL
  // TODO: Set up useNavigate hook
  // TODO: Create state for transaction data
  // TODO: Create state for isLoading
  // TODO: Create state for error
  // TODO: useEffect to fetch transaction details based on ID
  
  // TODO: Build handleDownloadReceipt() function
  // - For Week 1: just log or show alert
  // - Week 2: generate PDF receipt
  
  // TODO: Build handleBack() function
  // - navigate back to /transactions
  
  // TODO: Build JSX:
  // 1. Header with back button
  // 2. If loading: show loading message
  // 3. If error: show error message with retry button
  // 4. If has data: show all transaction details in organized layout
  //    - Transaction ID
  //    - Recipient info (name, phone)
  //    - Amount breakdown (amount, fee, total)
  //    - Status (with icon/badge)
  //    - Date/Time
  // 5. Action buttons:
  //    - Download Receipt button
  //    - Back button
  
  return <div>{/* NASRA: Build transaction details page here */}</div>;
}
