import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { clearTokens, login, register, saveTokens } from '../../api'

const readSession = () => {
  if (typeof window === 'undefined') return null
  try {
    const session = JSON.parse(window.localStorage.getItem('pesaflow_session'))
    if (!(session?.token && session.token !== 'demo-token')) return null
    if (session.user?.is_active === false) {
      clearSession()
      clearTokens()
      return null
    }
    return session
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
    const user = response.user || response
    if (user?.is_active === false) {
      throw new Error('Your account has been deactivated. Please contact the admin on 0723274962.')
    }
    saveTokens({ access: response.access, refresh: response.refresh })
    const session = { user, token: response.access }
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
        if (action.payload.user?.is_active === false) {
          state.user = null
          state.token = null
          state.isAuthenticated = false
          state.error = 'Your account has been deactivated. Please contact the admin on 0723274962.'
          clearSession()
          clearTokens()
          return
        }
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
