/**
 * ========================================================
 * LOGIN PAGE
 * ========================================================
 * 
 * Owner: MASON (Authentication + UI System)
 * Week 1: Day 2 (Authentication)
 * Status: MVP COMPLETE — ready for API integration
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
 * BACKEND HANDOFF:
 * - Replace mock data with actual Flask API calls
 * - Store JWT token in localStorage
 * - Set user role (admin/user)
 * 
 * ========================================================
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button'
import Input from '../../Components/Input'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const identifier = formData.emailOrPhone.trim()
    const phone = identifier.replace(/[\s-]/g, '')
    const nextErrors = {}
    if (!identifier) nextErrors.emailOrPhone = 'Enter your email address or phone number.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) && !/^07\d{8}$/.test(phone)) nextErrors.emailOrPhone = 'Enter a valid email address or 10-digit phone number.'
    if (!formData.password) nextErrors.password = 'Enter your password.'
    else if (formData.password.length < 6) nextErrors.password = 'Your password must be at least 6 characters.'
    setErrors(nextErrors)
    setMessage('')
    if (Object.keys(nextErrors).length) return
    setIsLoading(true)
    // Temporary front-end MVP flow. Replace with the Flask login endpoint when ready.
    window.setTimeout(() => {
      setIsLoading(false)
      setMessage('Login successful. Taking you to your dashboard…')
      window.setTimeout(() => navigate('/dashboard'), 650)
    }, 550)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/40 lg:grid-cols-[.9fr_1.1fr]">
          <aside className="hidden bg-gradient-to-br from-blue-600 to-cyan-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <Link to="/" className="inline-flex w-fit items-center gap-2 text-xl font-bold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-blue-600">P</span>PesaFlow</Link>
            <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Your money, in motion</p><h1 className="mt-4 text-4xl font-bold leading-tight">Send, receive, and manage money with confidence.</h1><p className="mt-5 max-w-sm text-blue-50">Simple transfers, clear activity, and security designed around you.</p></div>
            <p className="text-sm text-blue-100">Secure, transparent, and built for everyday transfers.</p>
          </aside>
          <div className="p-6 sm:p-10 lg:p-12">
            <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold text-blue-700 lg:hidden"><span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-sm text-white">P</span>PesaFlow</Link>
            <div className="mt-8 lg:mt-0"><p className="text-sm font-semibold text-blue-600">WELCOME BACK</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Log in to PesaFlow</h2><p className="mt-2 text-sm leading-6 text-slate-600">Enter your details to access your wallet and transfers.</p></div>
            {message && <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div>}
            <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
              <Input label="Email address or phone number" id="emailOrPhone" name="emailOrPhone" value={formData.emailOrPhone} onChange={handleChange} placeholder="you@example.com or 0712 345 678" autoComplete="username" error={errors.emailOrPhone} />
              <div><div className="mb-2 flex items-center justify-between gap-3"><label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label><Link to="/auth/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">Forgot password?</Link></div><div className="relative"><Input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Enter your password" autoComplete="current-password" error={errors.password} className="pr-16" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-2.5 text-sm font-medium text-slate-500 hover:text-blue-600" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div></div>
              <Button type="submit" fullWidth size="lg" disabled={isLoading}>{isLoading ? 'Logging in…' : 'Log in'}</Button>
            </form>
            <p className="mt-7 text-center text-sm text-slate-600">New to PesaFlow? <Link to="/auth/register" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </div>
    </main>
  )
}
