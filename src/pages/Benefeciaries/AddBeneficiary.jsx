/**
 * ========================================================
 * ADD BENEFICIARY PAGE
 * ========================================================
 * 
 * Owner: NAOMI (Wallet + Beneficiaries)
 * Week 1: Day 3 (Main Application)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌────────────────────────────────────┐
 * │  Add Beneficiary                   │
 * │                                    │
 * │  Full Name                         │
 * │  [ Input field ]                   │
 * │                                    │
 * │  Phone Number                      │
 * │  [ Input field ]                   │
 * │                                    │
 * │  [ Save Beneficiary ]              │
 * │                                    │
 * │  or [ Cancel ]                     │
 * └────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Full Name input field
 * ✅ Phone Number input field (10 digits)
 * ✅ Form validation
 * ✅ Save Beneficiary button
 * ✅ Cancel button → back to beneficiaries list
 * ✅ Loading state
 * ✅ Error/Success messages
 * ✅ Responsive design
 * 
 * FORM VALIDATION:
 * - Name: min 2 chars, no special chars
 * - Phone: exactly 10 digits, starts with 0/7
 * 
 * STATE NEEDED:
 * - formData: { name, phone }
 * - errors: object
 * - isLoading: boolean
 * - successMessage, errorMessage: strings
 * 
 * ACTIONS ON SUBMIT:
 * - Validate form
 * - Call API to save beneficiary (Week 1: just show success)
 * - Show success message
 * - Redirect to /beneficiaries
 * 
 * NEXT WEEK TODO:
 * - Connect to beneficiary API
 * - Add phone verification step
 * - Handle duplicate phone numbers
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom

export default function AddBeneficiary() {
  // TODO: Set up useNavigate hook
  // TODO: Create formData state (name, phone)
  // TODO: Create UI state (errors, isLoading, messages)
  // TODO: Build validateForm() function
  // TODO: Build handleSubmit() function
  // TODO: Build handleCancel() function → navigate back
  
  // TODO: Build JSX:
  // 1. Page header
  // 2. Form with:
  //    - Name input field
  //    - Phone number input field (maxLength 10)
  //    - Error messages below each field
  // 3. Two buttons: "Save Beneficiary" (primary) and "Cancel" (secondary)
  // 4. Error/Success messages at top
  
  return <div>{/* NAOMI: Build add beneficiary form here */}</div>;
}
