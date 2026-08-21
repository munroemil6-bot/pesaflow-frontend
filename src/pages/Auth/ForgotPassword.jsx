/**
 * ========================================================
 * FORGOT PASSWORD PAGE
 * ========================================================
 * 
 * Owner: MASON (Authentication + UI System)
 * Week 1: Day 2 (Authentication)
 * Status: MVP COMPLETE — ready for API integration
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
 * - Email or Phone input field
 * - Send Reset Link button
 * - Form validation
 * - Loading state
 * - Success message (reset link sent)
 * - Error message display
 * - "Back to Login" link
 * - Responsive design
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
 * BACKEND HANDOFF:
 * - Implement email/SMS sending via Flask API
 * - Create reset token validation
 * - Create new password form with token
 * - Update password in database
 * 
 * ========================================================
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../Components/Button'
import Input from '../../Components/Input'

export default function ForgotPassword() {
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const identifier = emailOrPhone.trim()
    const phone = identifier.replace(/[\s-]/g, '')
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
    const isPhone = /^07\d{8}$/.test(phone)

    setSuccessMessage('')
    if (!identifier) {
      setError('Enter your email address or phone number.')
      return
    }
    if (!isEmail && !isPhone) {
      setError('Enter a valid email address or 10-digit phone number.')
      return
    }

    setError('')
    setIsLoading(true)
    // Temporary front-end MVP flow. Replace with the Flask reset-password endpoint when ready.
    window.setTimeout(() => {
      setIsLoading(false)
      setSuccessMessage(`If an account exists for ${identifier}, reset instructions have been sent.`)
    }, 650)
  }

  const handleChange = ({ target: { value } }) => {
    setEmailOrPhone(value)
    setError('')
    setSuccessMessage('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-green-800 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/40 lg:grid-cols-[.9fr_1.1fr]">
          <aside className="hidden bg-gradient-to-br from-emerald-600 to-green-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <Link to="/" className="inline-flex w-fit items-center gap-2 text-xl font-bold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-emerald-600">P</span>PesaFlow</Link>
            <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">Account recovery</p><h1 className="mt-4 text-4xl font-bold leading-tight">Getting back to your money should be simple.</h1><p className="mt-5 max-w-sm text-emerald-50">We’ll help you securely reset your password and return to PesaFlow.</p></div>
            <p className="text-sm text-emerald-100">Your account security is our priority.</p>
          </aside>
          <div className="p-6 sm:p-10 lg:p-12">
            <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold text-emerald-700 lg:hidden"><span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-600 text-sm text-white">P</span>PesaFlow</Link>
            <div className="mt-8 lg:mt-0"><p className="text-sm font-semibold text-emerald-600">PASSWORD RECOVERY</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Forgot your password?</h2><p className="mt-2 text-sm leading-6 text-slate-600">Enter the email address or phone number linked to your account. We’ll send reset instructions if it exists.</p></div>
            {successMessage && <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800">{successMessage}</div>}
            <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
              <Input label="Email address or phone number" id="emailOrPhone" name="emailOrPhone" value={emailOrPhone} onChange={handleChange} placeholder="Enter your email address or phone number" autoComplete="username" error={error} />
              <Button type="submit" fullWidth size="lg" disabled={isLoading} className="bg-emerald-600 shadow-emerald-600/30 hover:bg-emerald-700 focus:ring-emerald-500/40">{isLoading ? 'Sending instructions…' : 'Send reset instructions'}</Button>
            </form>
            <p className="mt-7 text-center text-sm text-slate-600"><Link to="/auth/login" className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">← Back to login</Link></p>
          </div>
        </section>
      </div>
    </main>
  )
}
