/**
 * ========================================================
 * REGISTER PAGE
 * ========================================================
 * 
 * Owner: MASON (Authentication + UI System)
 * Week 1: Day 2 (Authentication)
 * Status: COMMENTS ONLY - CODE PENDING
 * 
 * WIREFRAME:
 * ┌─────────────────────────────────────┐
 * │       Create Account                │
 * │                                     │
 * │  Full Name                          │
 * │  [ Input field ]                    │
 * │                                     │
 * │  Email                              │
 * │  [ Input field ]                    │
 * │                                     │
 * │  Phone Number                       │
 * │  [ Input field ]                    │
 * │                                     │
 * │  Password                           │
 * │  [ Input field ]                    │
 * │  [Strength indicator bar]           │
 * │                                     │
 * │  Confirm Password                   │
 * │  [ Input field ]                    │
 * │                                     │
 * │  [ Create Account ]                 │
 * │                                     │
 * │  Already have account? Login        │
 * └─────────────────────────────────────┘
 * 
 * REQUIREMENTS TO BUILD:
 * ✅ Full Name input
 * ✅ Email input
 * ✅ Phone Number input (10 digits format)
 * ✅ Password input (show strength indicator)
 * ✅ Confirm Password input (must match password)
 * ✅ Register button (disabled while loading)
 * ✅ "Login" link (for existing users)
 * ✅ Form validation for ALL fields
 * ✅ Loading state
 * ✅ Error/Success messages
 * ✅ Responsive design
 * 
 * FORM VALIDATION RULES:
 * - Full Name: min 2 chars, no special characters
 * - Email: valid email format (user@domain.com)
 * - Phone: exactly 10 digits, starts with 0 or 7
 * - Password: min 6 chars, show strength (weak/fair/strong)
 * - Confirm Password: must exactly match password field
 * - Show inline errors below each field
 * - Disable submit if any field invalid
 * 
 * PASSWORD STRENGTH INDICATOR:
 * - Weak (red bar): < 6 characters
 * - Fair (yellow bar): 6-8 characters
 * - Strong (green bar): 8+ characters
 * 
 * STATE NEEDED:
 * - formData: { fullName, email, phone, password, confirmPassword }
 * - errors: object for validation errors
 * - isLoading: boolean
 * - successMessage, errorMessage: strings
 * - passwordStrength: 'weak' | 'fair' | 'strong'
 * 
 * REDUX INTEGRATION:
 * - Import registerUser action from authSlice.js
 * - On success: auto-login user and redirect to /dashboard
 * - Store user data in Redux auth slice
 * 
 * MOCK DATA:
 * Can accept any values for Week 1 registration
 * 
 * NEXT WEEK TODO:
 * - Connect to Flask API /register endpoint
 * - Add email verification step
 * - Add phone verification (SMS/email)
 * - Store JWT token in localStorage
 * 
 * ========================================================
 */

import React from 'react';
// TODO: Import useNavigate from react-router-dom
// TODO: Import Link from react-router-dom
// TODO: Import useDispatch from react-redux
// TODO: Import registerUser action from redux/slices/authSlice

export default function Register() {
  // TODO: Set up useNavigate hook
  // TODO: Set up useDispatch hook

  // TODO: Create state for formData
  // - fullName (string)
  // - email (string)
  // - phone (string)
  // - password (string)
  // - confirmPassword (string)

  // TODO: Create state for errors (object)
  // TODO: Create state for isLoading (boolean)
  // TODO: Create state for successMessage (string)
  // TODO: Create state for errorMessage (string)
  // TODO: Create state for passwordStrength ('weak'|'fair'|'strong')

  // TODO: Build checkPasswordStrength(password) function
  // - < 6 chars: return 'weak'
  // - 6-8 chars: return 'fair'
  // - 8+ chars: return 'strong'

  // TODO: Build validateForm() function
  // - Validate fullName: min 2 characters
  // - Validate email: proper email format
  // - Validate phone: exactly 10 digits
  // - Validate password: min 6 characters
  // - Validate confirmPassword: matches password field
  // - Return true if all valid, false otherwise

  // TODO: Build handleSubmit(e) function
  // - Prevent default
  // - Validate form
  // - Set isLoading = true
  // - Call Redux registerUser action
  // - On success: show message, redirect to /dashboard
  // - On error: show error message
  // - Finally: set isLoading = false

  // TODO: Build handleChange(e) function
  // - Update formData state
  // - If password field: update passwordStrength
  // - Clear error for changed field

  // TODO: Build JSX Structure:
  // 1. Outer div: min-h-screen, centered, gradient bg
  // 2. Inner card: white, shadow, max-w-md
  // 3. Heading: "Create Account"
  // 4. Subheading: "Join PesaFlow today"
  // 5. Error message container (conditional)
  // 6. Success message container (conditional)
  // 7. Form with fields in order:
  //    - Full Name input + error display
  //    - Email input + error display
  //    - Phone Number input (maxLength 10) + error display
  //    - Password input + password strength bar + error display
  //    - Confirm Password input + error display
  //    - Register button with loading state
  // 8. "Already have account? Login" link at bottom

  return (
    <div>
      {/* MASON: Build the register page here */}
      {/* Reference: wireframe above */}
      {/* Implement all validation rules */}
      {/* Show password strength indicator */}
    </div>
  );
}
