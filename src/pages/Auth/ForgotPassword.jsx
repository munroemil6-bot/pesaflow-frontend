/**
 * ========================================================
 * FORGOT PASSWORD PAGE
 * ========================================================
 * 
 * Owner: MASON (Authentication + UI System)
 * Week 1: Day 2 (Authentication)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌─────────────────────────────────────┐
 * │       Forgot Password?              │
 * │                                     │
 * │  Enter your email or phone to       │
 * │  receive a password reset link      │
 * │                                     │
 * │  Email or Phone                     │
 * │  [ Input field ]                    │
 * │                                     │
 * │  [ Send Reset Link ]                │
 * │                                     │
 * │  Back to Login                      │
 * └─────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Email or Phone input field
 * ✅ Send Reset Link button
 * ✅ Form validation
 * ✅ Loading state
 * ✅ Success message (reset link sent)
 * ✅ Error message display
 * ✅ "Back to Login" link
 * ✅ Responsive design
 * 
 * FORM VALIDATION:
 * - Email or Phone required
 * - Valid email format OR 10-digit phone
 * - Show errors if invalid
 * 
 * FLOW STEPS:
 * 1. User enters email or phone
 * 2. Click "Send Reset Link" button
 * 3. Show loading state
 * 4. Backend sends reset link via email/SMS
 * 5. Show success message on screen
 * 6. User receives email/SMS with reset link
 * 
 * STATE NEEDED:
 * - emailOrPhone (string)
 * - errors (string)
 * - isLoading (boolean)
 * - successMessage (string)
 * - errorMessage (string)
 * 
 * NEXT WEEK TODO:
 * - Implement email/SMS sending via Flask API
 * - Create reset token validation
 * - Create new password form with token
 * - Update password in database
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom
// TODO: Import Link from react-router-dom

export default function ForgotPassword() {
  // TODO: Set up useNavigate hook

  // TODO: Create state for emailOrPhone (string)
  // TODO: Create state for errors (string)
  // TODO: Create state for isLoading (boolean)
  // TODO: Create state for successMessage (string)
  // TODO: Create state for errorMessage (string)

  // TODO: Build validateForm() function
  // - Check emailOrPhone is not empty
  // - Check valid email format OR 10-digit phone
  // - Return true/false

  // TODO: Build handleSubmit(e) function
  // - Prevent default
  // - Validate form
  // - Set isLoading = true
  // - Call API to send reset link (TODO: implement API call)
  // - On success: show success message
  // - On error: show error message
  // - Finally: set isLoading = false

  // TODO: Build JSX Structure:
  // 1. Outer div: min-h-screen centered with gradient
  // 2. Inner card: white, shadow, max-w-md
  // 3. Heading: "Forgot Password?"
  // 4. Instructions text
  // 5. Error message container (conditional)
  // 6. Success message container (conditional)
  // 7. Form with:
  //    - Email/Phone input + error display
  //    - Send Reset Link button (show loading state)
  // 8. "Back to Login" link at bottom

  return (
    <div>
      {/* MASON: Build forgot password page here */}
      {/* Reference: wireframe above */}
      {/* Keep it simple - just email/phone input and submit */}
    </div>
  );
}
