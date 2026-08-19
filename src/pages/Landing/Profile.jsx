import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, setTwoFactorEnabled, updateProfile } from '../../redux/slices/authSlice'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^07\d{8}$/

export default function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const [isEditing, setIsEditing] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [notice, setNotice] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({ fullName: '', email: '', phone: '' })

  useEffect(() => {
    setForm({ fullName: user?.fullName || '', email: user?.email || '', phone: user?.phone || '' })
  }, [user])

  if (!user) {
    return <main className="mx-auto flex min-h-[60vh] max-w-lg items-center px-4 py-10"><section className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">P</span><h1 className="mt-5 text-2xl font-bold text-slate-900">Sign in to view your profile</h1><p className="mt-2 text-sm leading-6 text-slate-600">Log in to manage your personal information and account settings.</p><Link to="/auth/login" className="mt-6 inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">Log in to PesaFlow</Link></section></main>
  }

  const fullName = user.fullName?.trim() || 'PesaFlow user'
  const initials = fullName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'P'

  const handleChange = ({ target: { name, value } }) => {
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
    setForm((current) => ({ ...current, [name]: nextValue }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setNotice('')
  }

  const handleSave = (event) => {
    event.preventDefault()
    const nextErrors = {}
    const nextName = form.fullName.trim()
    const nextEmail = form.email.trim()
    if (nextName.length < 2) nextErrors.fullName = 'Enter a name with at least 2 characters.'
    if (!emailPattern.test(nextEmail)) nextErrors.email = 'Enter a valid email address.'
    if (form.phone && !phonePattern.test(form.phone)) nextErrors.phone = 'Use a 10-digit phone number, for example 0712345678.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    dispatch(updateProfile({ fullName: nextName, email: nextEmail, phone: form.phone }))
    setIsEditing(false)
    setNotice('Your profile has been updated.')
  }

  const handleCancel = () => {
    setForm({ fullName: user.fullName || '', email: user.email || '', phone: user.phone || '' })
    setErrors({})
    setIsEditing(false)
  }

  const handleToggle2FA = () => {
    const enabled = !user.twoFactorEnabled
    dispatch(setTwoFactorEnabled(enabled))
    setNotice(`Two-factor authentication is now ${enabled ? 'on' : 'off'}.`)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/', { replace: true })
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8"><p className="text-sm font-semibold text-emerald-600">ACCOUNT</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Profile & settings</h1><p className="mt-2 text-sm text-slate-600">Manage your PesaFlow personal details and account security.</p></header>
      {notice && <div role="status" className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</div>}
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.4fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-2xl font-bold text-white shadow-lg shadow-emerald-600/20">{initials}</div><h2 className="mt-5 text-xl font-bold text-slate-900">{fullName}</h2><p className="mt-1 break-all text-sm text-slate-600">{user.email || 'Email not added'}</p><div className="mt-6 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Account type</p><p className="mt-1 text-sm font-semibold capitalize text-slate-800">{user.role || 'user'} account</p></div></section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold text-slate-900">Personal information</h2><p className="mt-1 text-sm text-slate-600">Keep your contact details current.</p></div>{!isEditing && <button type="button" onClick={() => { setIsEditing(true); setNotice('') }} className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">Edit details</button>}</div>{isEditing ? <ProfileForm form={form} errors={errors} onChange={handleChange} onCancel={handleCancel} onSubmit={handleSave} /> : <dl className="mt-6 divide-y divide-slate-100"><Detail label="Full name" value={fullName} /><Detail label="Email address" value={user.email || 'Not added'} /><Detail label="Phone number" value={user.phone || 'Not added'} /></dl>}</section>
      </div>
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-bold text-slate-900">Account security</h2><p className="mt-1 text-sm text-slate-600">Control how your account is protected.</p><div className="mt-5 divide-y divide-slate-100"><div className="flex flex-wrap items-center justify-between gap-4 py-4"><div><h3 className="font-semibold text-slate-900">Two-factor authentication</h3><p className="mt-1 text-sm text-slate-600">Add an extra verification step when signing in.</p></div><button type="button" onClick={handleToggle2FA} role="switch" aria-checked={Boolean(user.twoFactorEnabled)} aria-label="Toggle two-factor authentication" className={`relative h-7 w-12 rounded-full transition ${user.twoFactorEnabled ? 'bg-emerald-600' : 'bg-slate-300'}`}><span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${user.twoFactorEnabled ? 'left-6' : 'left-1'}`} /></button></div><div className="flex flex-wrap items-center justify-between gap-4 py-4"><div><h3 className="font-semibold text-slate-900">Password</h3><p className="mt-1 text-sm text-slate-600">Use account recovery to request a secure password reset.</p></div><Link to="/auth/forgot-password" className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">Reset password</Link></div></div></section>
      <section className="mt-6 rounded-2xl border border-red-200 bg-red-50/50 p-6"><h2 className="text-lg font-bold text-slate-900">Danger zone</h2><p className="mt-1 text-sm text-slate-600">Logging out ends the current session on this device.</p><button type="button" onClick={() => setShowLogoutDialog(true)} className="mt-5 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Log out</button></section>
      {showLogoutDialog && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"><section role="dialog" aria-modal="true" aria-labelledby="logout-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><h2 id="logout-title" className="text-xl font-bold text-slate-900">Log out of PesaFlow?</h2><p className="mt-2 text-sm leading-6 text-slate-600">You will need to sign in again to access your wallet and transfers.</p><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setShowLogoutDialog(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button><button type="button" onClick={handleLogout} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Log out</button></div></section></div>}
    </main>
  )
}

function ProfileForm({ form, errors, onChange, onCancel, onSubmit }) {
  return <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate><FormField label="Full name" name="fullName" value={form.fullName} onChange={onChange} error={errors.fullName} autoComplete="name" /><FormField label="Email address" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} autoComplete="email" /><FormField label="Phone number" name="phone" type="tel" value={form.phone} onChange={onChange} error={errors.phone} placeholder="0712345678" inputMode="numeric" maxLength="10" autoComplete="tel" /><div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onCancel} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button><button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Save changes</button></div></form>
}

function FormField({ label, name, error, ...props }) {
  return <div><label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-700">{label}</label><input id={name} name={name} className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 ${error ? 'border-red-300' : 'border-slate-200'}`} {...props} />{error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}</div>
}

function Detail({ label, value }) {
  return <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-6"><dt className="text-sm text-slate-500">{label}</dt><dd className="break-all text-sm font-medium text-slate-800">{value}</dd></div>
}
