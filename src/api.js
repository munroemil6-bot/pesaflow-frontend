const configuredApiUrl = import.meta.env.VITE_API_URL
const API_BASE_URL = configuredApiUrl?.startsWith('/') ? configuredApiUrl : '/api'

const readTokens = () => {
  try {
    return JSON.parse(window.localStorage.getItem('pesaflow_tokens')) || {}
  } catch {
    return {}
  }
}

export const saveTokens = (tokens) => window.localStorage.setItem('pesaflow_tokens', JSON.stringify(tokens))
export const clearTokens = () => window.localStorage.removeItem('pesaflow_tokens')

const getErrorMessage = (payload) => {
  if (typeof payload === 'string') return payload
  if (payload?.detail) return payload.detail
  return Object.values(payload || {}).flat().join(' ') || 'The request could not be completed.'
}

const normalizeKenyanPhone = (phoneNumber) => {
  const phone = String(phoneNumber || '').replace(/[\s-]/g, '')
  if (phone.startsWith('0')) return `254${phone.slice(1)}`
  if (phone.startsWith('+254')) return phone.slice(1)
  return phone
}

export async function apiRequest(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  const access = readTokens().access
  if (access) headers.Authorization = `Bearer ${access}`
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  const text = await response.text()
  const payload = text ? JSON.parse(text) : null
  if (!response.ok) throw new Error(getErrorMessage(payload))
  return payload
}

export const login = (credentials) => apiRequest('/accounts/login/', {
  method: 'POST',
  body: JSON.stringify(credentials.emailOrPhone.includes('@')
    ? { email: credentials.emailOrPhone.trim(), password: credentials.password }
    : { phone: credentials.emailOrPhone.trim(), password: credentials.password }),
})
export const register = (details) => apiRequest('/accounts/register/', {
  method: 'POST',
  body: JSON.stringify({ full_name: details.fullName, email: details.email, phone: details.phone, password: details.password }),
})
export const getProfile = () => apiRequest('/accounts/profile/')
export const getAdminUsers = () => apiRequest('/admin-dashboard/users/?page_size=100')
export const getWallet = () => apiRequest('/wallet/')
export const getBeneficiaries = () => apiRequest('/beneficiaries/?page_size=100')
export const getTransactions = () => apiRequest('/transactions/')
export const getTransaction = (id) => apiRequest(`/transactions/${id}/`)
export const getAdminTransactions = (query = '?page_size=100') => apiRequest(`/admin-dashboard/transactions/${query}`)
export const createTransfer = (data) => apiRequest('/transactions/', { method: 'POST', body: JSON.stringify(data) })
export const initiateStkPush = (phoneNumber, amount) => apiRequest('/payments/stk-push/', {
  method: 'POST',
  body: JSON.stringify({ phone_number: normalizeKenyanPhone(phoneNumber), amount }),
})