const configuredApiUrl = import.meta.env.VITE_API_URL
const API_BASE_URL = configuredApiUrl || (import.meta.env.DEV ? '/api' : 'https://pesaflow-backend-wdbv.onrender.com/api')

const readTokens = () => {
  try {
    return JSON.parse(window.localStorage.getItem('pesaflow_tokens')) || {}
  } catch {
    return {}
  }
}

export const saveTokens = (tokens) => window.localStorage.setItem('pesaflow_tokens', JSON.stringify(tokens))
export const clearTokens = () => {
  window.localStorage.removeItem('pesaflow_tokens')
  window.localStorage.removeItem('access')
  window.localStorage.removeItem('refresh')
}

const getErrorMessage = (payload) => {
  if (typeof payload === 'string') return payload
  if (payload?.detail) return payload.detail
  return Object.values(payload || {}).flat().join(' ') || 'The request could not be completed.'
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const normalizeKenyanPhone = (phoneNumber) => {
  const phone = String(phoneNumber || '').replace(/[\s-]/g, '')
  if (phone.startsWith('0')) return `254${phone.slice(1)}`
  if (phone.startsWith('+254')) return phone.slice(1)
  return phone
}

export async function apiRequest(path, options = {}) {
  return requestWithToken(path, options, readTokens().access, true)
}

async function requestWithToken(path, options, access, canRefresh) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  if (access) headers.Authorization = `Bearer ${access}`
  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  const text = await response.text()
  let payload = null
  try {
    payload = text ? JSON.parse(text) : null
  } catch {
    payload = text
  }

  if (response.status === 401 && canRefresh && !path.endsWith('/accounts/refresh/')) {
    const refresh = readTokens().refresh
    if (refresh) {
      const refreshResponse = await fetch(`${API_BASE_URL}/accounts/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      })
      const refreshText = await refreshResponse.text()
      let refreshPayload = null
      try {
        refreshPayload = refreshText ? JSON.parse(refreshText) : null
      } catch {
        refreshPayload = null
      }
      if (refreshResponse.ok && refreshPayload?.access) {
        saveTokens({ access: refreshPayload.access, refresh })
        return requestWithToken(path, options, refreshPayload.access, false)
      }
    }
  }

  if (!response.ok) throw new ApiError(getErrorMessage(payload), response.status)
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
export const updateUserStatus = (userId, isActive) => apiRequest(`/admin-dashboard/users/${userId}/`, {
  method: 'PATCH',
  body: JSON.stringify({ is_active: isActive }),
})
export const getWallet = () => apiRequest('/wallet/balance/')
export const addFundsToWallet = (amount, description = 'Wallet funding') => apiRequest('/wallet/add-funds/', {
  method: 'POST',
  body: JSON.stringify({ amount, description }),
})
export const withdrawFromWallet = (amount, phoneNumber) => apiRequest('/wallet/withdraw/', {
  method: 'POST',
  body: JSON.stringify({ amount: String(amount), phone_number: normalizeKenyanPhone(phoneNumber) }),
})
export const getBeneficiaries = () => apiRequest('/beneficiaries/?page_size=100')
export const getTransactions = () => apiRequest('/transactions/')
export const getTransaction = (id) => apiRequest(`/transactions/${id}/`)
export const getAdminTransactions = (query = '?page_size=100') => apiRequest(`/admin-dashboard/transactions/${query}`)
export const createTransfer = (data) => apiRequest('/transactions/', { method: 'POST', body: JSON.stringify(data) })
export const initiateStkPush = (phoneNumber, amount) => apiRequest('/payments/stk-push/', {
  method: 'POST',
  body: JSON.stringify({ phone_number: normalizeKenyanPhone(phoneNumber), amount: String(amount) }),
})