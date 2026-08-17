/**
 * ========================================================
 * LOGIN PAGE
 * ========================================================
 * 
 * Owner: MASON (Authentication + UI System)
 * Week 1: Day 2 (Authentication)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌─────────────────────────────────────┐
 * │         Welcome Back                │
 * │                                     │
 * │  Email / Phone                      │
 * │  [ Input field ]                    │
 * │                                     │
 * │  Password                           │
 * │  [ Input field ]                    │
 * │                                     │
 * │  [ Login Button ]                   │
 * │                                     │
 * │  Forgot password? (link)            │
 * │  Don't have account? Register       │
 * └─────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Email/Phone input field
 * ✅ Password input field
 * ✅ Login button (disabled while loading)
 * ✅ "Forgot password?" link → /auth/forgot-password
 * ✅ "Register" link → /auth/register
 * ✅ Form validation (email/phone required, password required)
 * ✅ Loading state while submitting
 * ✅ Error message display
 * ✅ Success message after login
 * ✅ Responsive design (mobile-first with Tailwind)
 * 
 * FORM VALIDATION TO IMPLEMENT:
 * - Email: valid email format OR 10-digit phone number
 * - Password: minimum 6 characters
 * - Show inline error messages below each field
 * - Disable submit button if form is invalid
 * 
 * STATE NEEDED:
 * - formData: { emailOrPhone, password }
 * - errors: object with field validation errors
 * - isLoading: boolean for loading state
 * - successMessage, errorMessage: strings for feedback
 * 
 * REDUX INTEGRATION:
 * - Import loginUser action from authSlice.js
 * - Store should track: loggedIn (boolean), user (object), role
 * - After successful login, redirect to /dashboard
 * 
 * MOCK DATA:
 * Test accounts for Week 1:
 * - Email: myles@pesaflow.com, Password: password123
 * - Email: mason@pesaflow.com, Password: password123
 * - Email: nasra@pesaflow.com, Password: password123
 * - Email: naomi@pesaflow.com, Password: password123
 * 
 * NEXT WEEK TODO:
 * - Replace mock data with actual Flask API calls
 * - Store JWT token in localStorage
 * - Set user role (admin/user)
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom
// TODO: Import Link from react-router-dom
// TODO: Import useDispatch from react-redux
// TODO: Import loginUser action from redux/slices/authSlice

export default function Login() {
  // TODO: Set up useNavigate hook
  // TODO: Set up useDispatch hook

  // TODO: Create state for formData (emailOrPhone, password)
  // TODO: Create state for errors object
  // TODO: Create state for isLoading boolean
  // TODO: Create state for successMessage string
  // TODO: Create state for errorMessage string

  // TODO: Build validateForm() function
  // - Validate email/phone is not empty
  // - Validate password is not empty
  // - Validate email format OR phone is 10 digits
  // - Validate password minimum 6 characters
  // - Return true/false

  // TODO: Build handleSubmit(e) function
  // - Prevent default form submission
  // - Call validateForm()
  // - Set isLoading to true
  // - Call Redux loginUser action with formData
  // - On success: show success message, redirect to /dashboard
  // - On error: show error message
  // - Finally: set isLoading to false

  // TODO: Build handleChange(e) function
  // - Update formData state with input value
  // - Clear error for that field when user starts typing

  // TODO: Build JSX Structure:
  // 1. Outer div: min-h-screen, centered layout, gradient background
  // 2. Inner div: max-w-md, white card, shadow, padding
  // 3. Heading: "Welcome Back" (large, bold)
  // 4. Subheading: "Login to your PesaFlow account"
  // 5. Error message container (conditional)
  // 6. Success message container (conditional)
  // 7. Form:
  //    - Email/Phone input field with label
  //    - Display emailOrPhone error if exists
  //    - Password input field with label
  //    - Display password error if exists
  //    - "Forgot password?" link
  //    - Login button (show loading spinner when isLoading)
  // 8. "Don't have account? Register" link at bottom
  
  return (
    <div>
      {/* MASON: Build the login page here */}
      {/* Reference: wireframe above */}
      {/* Use Tailwind CSS for styling */}
      {/* Use reusable components: Button, Input, Loader */}
    </div>
  );
}
