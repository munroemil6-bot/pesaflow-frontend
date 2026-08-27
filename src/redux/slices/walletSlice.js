import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getWallet } from '../../api'

export const fetchWallet = createAsyncThunk('wallet/fetchWallet', async () => getWallet())

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    balance: 0,
    currency: 'KES',
    accountNumber: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setWallet(state, action) {
      return { ...state, ...action.payload, error: null }
    },
    setBalance(state, action) {
      state.balance = Number(action.payload) || 0
    },
    addFunds(state, action) {
      const amount = typeof action.payload === 'object' ? action.payload.amount : action.payload
      state.balance += Number(amount) || 0
    },
    deductFunds(state, action) {
      const amount = typeof action.payload === 'object' ? action.payload.amount : action.payload
      state.balance = Math.max(0, state.balance - (Number(amount) || 0))
    },
    setWalletLoading(state, action) {
      state.isLoading = action.payload
    },
    setWalletError(state, action) {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchWallet.pending, (state) => { state.isLoading = true; state.error = null })
    .addCase(fetchWallet.fulfilled, (state, action) => { state.isLoading = false; Object.assign(state, action.payload) })
    .addCase(fetchWallet.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message })
})

export const { addFunds, deductFunds, setBalance, setWallet, setWalletError, setWalletLoading } = walletSlice.actions
export default walletSlice.reducer
