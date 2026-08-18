import { createSlice } from '@reduxjs/toolkit'

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
      state.balance += Number(action.payload) || 0
    },
    deductFunds(state, action) {
      state.balance = Math.max(0, state.balance - (Number(action.payload) || 0))
    },
    setWalletLoading(state, action) {
      state.isLoading = action.payload
    },
    setWalletError(state, action) {
      state.error = action.payload
    },
  },
})

export const { addFunds, deductFunds, setBalance, setWallet, setWalletError, setWalletLoading } = walletSlice.actions
export default walletSlice.reducer
