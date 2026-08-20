import { createSlice } from '@reduxjs/toolkit'
import { addMockTransaction, getAllTransactions, getUserTransactions } from '../../data/mockData'

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: { list: [], recent: [], selected: null, isLoading: false, error: null },
  reducers: {
    setTransactions(state, action) {
      state.list = action.payload
      state.recent = action.payload.slice(0, 5)
    },
    hydrateTransactions(state, action) {
      state.list = action.payload === 'admin' ? getAllTransactions() : getUserTransactions(action.payload)
      state.recent = state.list.slice(0, 5)
    },
    addTransaction(state, action) {
      const transaction = addMockTransaction(action.payload)
      state.list.unshift(transaction)
      state.recent = state.list.slice(0, 5)
    },
    setSelectedTransaction(state, action) {
      state.selected = action.payload
    },
    setTransactionLoading(state, action) {
      state.isLoading = action.payload
    },
    setTransactionError(state, action) {
      state.error = action.payload
    },
  },
})

export const { addTransaction, hydrateTransactions, setSelectedTransaction, setTransactionError, setTransactionLoading, setTransactions } = transactionSlice.actions
export default transactionSlice.reducer
