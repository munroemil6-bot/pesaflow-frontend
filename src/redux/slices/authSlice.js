import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { clearTokens, login, register, saveTokens } from '../../api'

const readSession = () => {
  if (typeof window === 'undefined') return null
  try {
    const session = JSON.parse(window.localStorage.getItem('pesaflow_session'))
    return session?.token && session.token !== 'demo-token' ? session : null
  } catch {
    return null
  }
}

const saveSession = (session) => {
  if (typeof window !== 'undefined') window.localStorage.setItem('pesaflow_session', JSON.stringify(session))
}

const clearSession = () => {
  if (typeof window !== 'undefined') window.localStorage.removeItem('pesaflow_session')
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    const response = await login(credentials)
    saveTokens({ access: response.access, refresh: response.refresh })
    const session = { user: response.user, token: response.access }
    saveSession(session)
    return session
  }
)

export const registerUser = createAsyncThunk('auth/registerUser', async (details) => {
  await register(details)
  const response = await login({ emailOrPhone: details.email, password: details.password })
  saveTokens({ access: response.access, refresh: response.refresh })
  const session = { user: response.user, token: response.access }
  saveSession(session)
  return session
})

const savedSession = readSession()

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedSession?.user ?? null,
    token: savedSession?.token ?? null,
    isAuthenticated: Boolean(savedSession?.token),
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      clearSession()
      clearTokens()
    },
    updateProfile(state, action) {
      if (!state.user) return
      state.user = { ...state.user, ...action.payload }
      saveSession({ user: state.user, token: state.token })
    },
    setTwoFactorEnabled(state, action) {
      if (!state.user) return
      state.user.twoFactorEnabled = action.payload
      saveSession({ user: state.user, token: state.token })
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'), (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Something went wrong. Please try again.'
      })
  },
})

export const { clearAuthError, logout, setTwoFactorEnabled, updateProfile } = authSlice.actions
export default authSlice.reducer
