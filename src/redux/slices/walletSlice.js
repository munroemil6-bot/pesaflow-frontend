import { createSlice } from '@reduxjs/toolkit'
import { getUserWallet, updateUserWallet } from '../../data/mockData'

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
    hydrateWallet(state, action) {
      return { ...state, ...getUserWallet(action.payload), error: null }
    },
    setBalance(state, action) {
      state.balance = Number(action.payload) || 0
    },
    addFunds(state, action) {
      const amount = typeof action.payload === 'object' ? action.payload.amount : action.payload
      state.balance += Number(amount) || 0
      if (action.payload?.userId) updateUserWallet(action.payload.userId, { balance: state.balance })
    },
    deductFunds(state, action) {
      const amount = typeof action.payload === 'object' ? action.payload.amount : action.payload
      state.balance = Math.max(0, state.balance - (Number(amount) || 0))
      if (action.payload?.userId) updateUserWallet(action.payload.userId, { balance: state.balance })
    },
    setWalletLoading(state, action) {
      state.isLoading = action.payload
    },
    setWalletError(state, action) {
      state.error = action.payload
    },
  },
})

export const { addFunds, deductFunds, hydrateWallet, setBalance, setWallet, setWalletError, setWalletLoading } = walletSlice.actions
export default walletSlice.reducer
