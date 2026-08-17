/**
 * ========================================================
 * SEND MONEY PAGE
 * ========================================================
 * 
 * Owner: NASRA (Transactions + Transfer)
 * Week 1: Day 4 (Money Transfer)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌───────────────────────────────────────┐
 * │  Send Money                           │
 * │                                       │
 * │  Select Beneficiary                   │
 * │  [ Dropdown / List ]                  │
 * │                                       │
 * │  Amount                               │
 * │  KSh [ 1,000 ]                        │
 * │                                       │
 * │  Description (optional)               │
 * │  [ Brief description... ]             │
 * │                                       │
 * │  [ Continue ]                         │
 * │  [ Cancel ]                           │
 * └───────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Select Beneficiary dropdown or list
 * ✅ Amount input field (numeric)
 * ✅ Optional description field
 * ✅ Form validation
 * ✅ Continue button → /transfer/confirm
 * ✅ Cancel button → back to previous page
 * ✅ Loading state
 * ✅ Error messages
 * ✅ Responsive design
 * ✅ Pre-fill beneficiary if passed via query param
 * 
 * QUERY PARAMS:
 * - ?beneficiary_id=X (if coming from beneficiaries page)
 * - Pre-select that beneficiary
 * 
 * FORM VALIDATION:
 * - Beneficiary: must select one
 * - Amount: required, min 100 KSh, max wallet balance
 * - Description: optional (max 200 chars)
 * 
 * DATA FLOW:
 * 1. Get beneficiaries from Redux/API
 * 2. User selects beneficiary and enters amount
 * 3. On continue: store form data in Redux
 // 4. Navigate to /transfer/confirm to show review screen
 * 
 * STATE NEEDED:
 * - formData: { beneficiaryId, amount, description }
 * - errors: object
 * - isLoading: boolean
 * - beneficiaries: array
 * 
 * NEXT WEEK TODO:
 * - Connect to beneficiary list API
 * - Add amount suggestions (presets)
 * - Add recipient info preview
 * - Validate amount against wallet balance
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom
// TODO: Import useSearchParams from react-router-dom

export default function SendMoney() {
  // TODO: Set up useNavigate hook
  // TODO: Set up useSearchParams to get beneficiary_id if provided
  
  // TODO: Create formData state: { beneficiaryId, amount, description }
  // TODO: Create UI state: { errors, isLoading, beneficiaries }
  // TODO: useEffect to fetch beneficiaries list
  // TODO: useEffect to pre-fill beneficiary if query param exists
  
  // TODO: Build validateForm() function
  // - Validate beneficiaryId is selected
  // - Validate amount is provided and valid
  // - Validate amount <= wallet balance
  
  // TODO: Build handleSubmit() function
  // - Validate form
  // - Store form data in Redux (transfer slice)
  // - Navigate to /transfer/confirm
  
  // TODO: Build handleCancel() function
  // - Navigate back to previous page
  
  // TODO: Build JSX:
  // 1. Page header: "Send Money"
  // 2. Form with fields:
  //    - Beneficiary selector (dropdown or list)
  //    - Amount input field
  //    - Description textarea (optional)
  //    - Error messages below each field
  // 3. Two buttons: "Continue" (primary) and "Cancel" (secondary)
  
  return <div>{/* NASRA: Build send money form here */}</div>;
}
