/**
 * ========================================================
 * REGISTER PAGE
 * ========================================================
 * 
 * Owner: MASON (Authentication + UI System)
 * Week 1: Day 2 (Authentication)
 * Status: MVP COMPLETE — ready for API integration
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
 * BACKEND HANDOFF:
 * - Connect to Flask API /register endpoint
 * - Add email verification step
 * - Add phone verification (SMS/email)
 * - Store JWT token in localStorage
 * 
 * ========================================================
 */

import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button'
import Input from '../../Components/Input'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const strength = useMemo(() => {
    const password = formData.password
    if (!password || password.length < 6) return { label: 'Weak', width: 'w-1/3', color: 'bg-red-500', hint: 'Use at least 6 characters.' }
    if (password.length < 9 || !/[A-Z]/.test(password) || !/\d/.test(password)) return { label: 'Fair', width: 'w-2/3', color: 'bg-amber-400', hint: 'Add uppercase letters and numbers for a stronger password.' }
    return { label: 'Strong', width: 'w-full', color: 'bg-emerald-500', hint: 'Great — your password is strong.' }
  }, [formData.password])

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined, ...(name === 'password' ? { confirmPassword: undefined } : {}) }))
    setMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    const phone = formData.phone.replace(/[\s-]/g, '')
    if (!formData.fullName.trim()) nextErrors.fullName = 'Enter your full name.'
    else if (!/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/.test(formData.fullName.trim())) nextErrors.fullName = 'Use letters and spaces only.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = 'Enter a valid email address.'
    if (!/^07\d{8}$/.test(phone)) nextErrors.phone = 'Use a 10-digit phone number, for example 0712 345 678.'
    if (formData.password.length < 6) nextErrors.password = 'Your password must be at least 6 characters.'
    if (!formData.confirmPassword) nextErrors.confirmPassword = 'Confirm your password.'
    else if (formData.confirmPassword !== formData.password) nextErrors.confirmPassword = 'Passwords do not match.'
    setErrors(nextErrors)
    setMessage('')
    if (Object.keys(nextErrors).length) return
    setIsLoading(true)
    // Temporary front-end MVP flow. Replace with the Flask registration endpoint when ready.
    window.setTimeout(() => {
      setIsLoading(false)
      setMessage('Your account has been created. Taking you to your dashboard…')
      window.setTimeout(() => navigate('/dashboard'), 650)
    }, 650)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-green-800 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/40 lg:grid-cols-[.9fr_1.1fr]">
          <aside className="hidden bg-gradient-to-br from-emerald-600 to-green-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <Link to="/" className="inline-flex w-fit items-center gap-2 text-xl font-bold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-emerald-600">P</span>PesaFlow</Link>
            <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">Money that moves with you</p><h1 className="mt-4 text-4xl font-bold leading-tight">A simpler way to handle every transfer.</h1><p className="mt-5 max-w-sm text-emerald-50">Build your wallet, manage beneficiaries, and stay in control of every shilling.</p></div>
            <p className="text-sm text-emerald-100">Set up in minutes. Transfer with confidence.</p>
          </aside>
          <div className="p-6 sm:p-10 lg:p-12">
            <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold text-emerald-700 lg:hidden"><span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-600 text-sm text-white">P</span>PesaFlow</Link>
            <div className="mt-8 lg:mt-0"><p className="text-sm font-semibold text-emerald-600">GET STARTED</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Create your account</h2><p className="mt-2 text-sm leading-6 text-slate-600">Join PesaFlow and start moving money with ease.</p></div>
            {message && <div role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div>}
            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <Input label="Full name" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Jane Wanjiku" autoComplete="name" error={errors.fullName} />
              <Input label="Email address" id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" autoComplete="email" error={errors.email} />
              <Input label="Phone number" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="0712 345 678" autoComplete="tel" inputMode="tel" maxLength="10" error={errors.phone} />
              <div><div className="relative"><Input label="Password" id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Create a password" autoComplete="new-password" error={errors.password} className="pr-16" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-9 text-sm font-medium text-slate-500 hover:text-emerald-600" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div><div className="mt-2" aria-live="polite"><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-all ${strength.width} ${strength.color}`} /></div><p className="mt-1 text-xs text-slate-500">Password strength: <span className="font-semibold text-slate-700">{strength.label}</span>{formData.password && ` — ${strength.hint}`}</p></div></div>
              <Input label="Confirm password" id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" autoComplete="new-password" error={errors.confirmPassword} />
              <Button type="submit" fullWidth size="lg" disabled={isLoading} className="bg-emerald-600 shadow-emerald-600/30 hover:bg-emerald-700 focus:ring-emerald-500/40">{isLoading ? 'Creating account…' : 'Create account'}</Button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-600">Already have an account? <Link to="/auth/login" className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">Log in</Link></p>
          </div>
        </section>
      </div>
    </main>
  )
}
