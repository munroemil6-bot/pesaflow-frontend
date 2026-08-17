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

export default function TransactionDetails() {
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
