import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { withdrawFromWallet } from '../../api'

const WithdrawFunds = () => {
  const navigate = useNavigate()
  const balance = useSelector((state) => state.wallet.balance)
  const profilePhone = useSelector((state) => state.auth.user?.phone || '')
  const [amount, setAmount] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(profilePhone)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const numericAmount = Number(amount)
    if (!numericAmount || numericAmount < 10) {
      setError('Enter at least KSh 10.')
      return
    }
    if (numericAmount > Number(balance)) {
      setError('The amount is greater than your available balance.')
      return
    }
    if (!/^((\+?254|0)7\d{8}|(\+?254|0)1\d{8})$/.test(phoneNumber.replace(/[\s-]/g, ''))) {
      setError('Enter a valid Kenyan mobile number.')
      return
    }

    setIsLoading(true)
    setError('')
    try {
      await withdrawFromWallet(numericAmount, phoneNumber)
      window.alert('Withdrawal requested. The money will be sent to your phone shortly.')
      navigate('/wallet', { replace: true })
    } catch (requestError) {
      setError(requestError.message || 'Unable to request the withdrawal.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-5">
      <div className="flex items-center gap-4">
        <button type="button" className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" onClick={() => navigate('/wallet')}>
          ← Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Withdraw Funds</h1>
          <p className="text-sm text-slate-600">Send money to your mobile wallet with no withdrawal fee.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-5 rounded-xl border border-emerald-100 bg-white p-5">
        <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
          Available balance: <strong>KSh {Number(balance || 0).toLocaleString()}</strong>
        </div>
        <div className="space-y-2">
          <label htmlFor="withdraw-amount" className="block text-sm font-semibold text-slate-800">Amount</label>
          <input id="withdraw-amount" type="number" min="10" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} disabled={isLoading} placeholder="Enter amount" className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500" />
        </div>
        <div className="space-y-2">
          <label htmlFor="withdraw-phone" className="block text-sm font-semibold text-slate-800">M-PESA phone number</label>
          <input id="withdraw-phone" type="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} disabled={isLoading} placeholder="0712345678" className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500" />
        </div>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60">
          {isLoading ? 'Requesting withdrawal...' : 'Withdraw funds'}
        </button>
      </form>
    </div>
  )
}

export default WithdrawFunds
