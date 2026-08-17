/**
 * ========================================================
 * CONFIRM TRANSFER PAGE
 * ========================================================
 * 
 * Owner: NASRA (Transactions + Transfer)
 * Week 1: Day 4 (Money Transfer)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌──────────────────────────────────┐
 * │  Confirm Transfer                │
 * │                                  │
 * │  Sending to:                     │
 * │  John Kamau                      │
 * │  0712 XXXX XXX                   │
 * │                                  │
 * │  Amount:          KSh 1,000      │
 * │  Transaction Fee: KSh 10         │
 * │  Total:           KSh 1,010      │
 * │                                  │
 * │  [ Confirm Transfer ]            │
 * │  [ Back / Cancel ]               │
 * └──────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Display transfer summary
 * ✅ Show: recipient, phone, amount, fee, total
 * ✅ Confirm button
 * ✅ Back/Cancel button
 * ✅ Loading state while processing
 * ✅ Error state if fails
 * ✅ Responsive design
 * 
 * DATA SOURCE:
 * - Get from Redux transfer slice (saved from SendMoney page)
 * - Retrieve: beneficiary ID/info, amount, description
 * 
 * FUNCTIONS TO BUILD:
 * - handleConfirm(): process transfer
 *   - Set isLoading = true
 *   - Call API to process transfer (Week 1: mock success)
 *   - On success: navigate to /transfer/status
 *   - On error: show error message
 * 
 * - handleBack(): navigate back to /transfer/send
 * 
 * FLOW:
 * 1. User arrives from SendMoney with transfer data in Redux
 * 2. Review page shows summary
 * 3. User clicks Confirm
 * 4. Show loading state (spinner)
 * 5. Process transfer (API call)
 * 6. Navigate to TransferStatus page
 * 
 * NEXT WEEK TODO:
 * - Connect to actual transfer API
 * - Add OTP verification step
 * - Add PIN verification
 * - Real-time status updates
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom
// TODO: Import useSelector from react-redux

export default function ConfirmTransfer() {
  // TODO: Set up useNavigate hook
  // TODO: Get transfer data from Redux (useSelector from transfer slice)
  
  // TODO: Create state for isLoading
  // TODO: Create state for error message
  
  // TODO: Build handleConfirm() function
  // - Set isLoading = true
  // - Call API to process transfer (mock for Week 1)
  // - On success:
  //   - Store transaction ID in Redux
  //   - Navigate to /transfer/status
  // - On error:
  //   - Show error message
  //   - Set isLoading = false
  
  // TODO: Build handleBack() function
  // - Navigate back to /transfer/send
  
  // TODO: Build JSX:
  // 1. Header: "Confirm Transfer"
  // 2. Transfer summary card showing:
  //    - "Sending to:" label
  //    - Recipient name and phone
  //    - Amount breakdown (amount, fee, total)
  // 3. If error: show error message
  // 4. Two buttons:
  //    - "Confirm Transfer" (primary, show spinner if loading)
  //    - "Back" (secondary, disabled if loading)
  
  return <div>{/* NASRA: Build confirm transfer page here */}</div>;
}
