import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const readSession = () => {
  if (typeof window === 'undefined') return null
  try {
    return JSON.parse(window.localStorage.getItem('pesaflow_session'))
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

const createUser = ({
  fullName,
  email,
  phone,
  emailOrPhone,
  role = 'user',
}) => ({
  id: role === 'admin' ? 'demo-admin' : 'demo-user',

  fullName:
    fullName ||
    (role === 'admin' ? 'PesaFlow Admin' : 'PesaFlow User'),

  email:
    email ||
    (emailOrPhone?.includes('@') ? emailOrPhone : ''),

  phone:
    phone ||
    (!emailOrPhone?.includes('@') ? emailOrPhone : ''),

  role,

  twoFactorEnabled: false,
})

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    const isAdmin = credentials.emailOrPhone === 'nasra@pesaflow.com'

    const user = createUser({
      ...credentials,
      role: isAdmin ? 'admin' : 'user',
    })

    const session = {
      user,
      token: 'demo-token',
    }

    saveSession(session)

    return session
  }
)

export const registerUser = createAsyncThunk('auth/registerUser', async (details) => {
  const user = createUser(details)
  const session = { user, token: 'demo-token' }
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
