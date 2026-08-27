import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAdminTransactions, getTransactions } from '../../api'

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async (role) => {
  if (role !== 'admin') {
    const response = await getTransactions()
    return response.results || response
  }

  const transactions = []
  let nextQuery = '?page_size=100'

  while (nextQuery) {
    const response = await getAdminTransactions(nextQuery)
    transactions.push(...(response.results || response))

    if (!response.next) break
    const nextUrl = new URL(response.next, window.location.origin)
    nextQuery = `${nextUrl.search}${nextUrl.search ? '' : '?page_size=100'}`
  }

  return transactions
})

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: { list: [], recent: [], selected: null, isLoading: false, error: null },
  reducers: {
    setTransactions(state, action) {
      state.list = action.payload
      state.recent = action.payload.slice(0, 5)
    },
    addTransaction(state, action) {
      const transaction = action.payload
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
  extraReducers: (builder) => builder
    .addCase(fetchTransactions.pending, (state) => { state.isLoading = true; state.error = null })
    .addCase(fetchTransactions.fulfilled, (state, action) => { state.isLoading = false; state.list = action.payload; state.recent = action.payload.slice(0, 5) })
    .addCase(fetchTransactions.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message })
})

export const { addTransaction, setSelectedTransaction, setTransactionError, setTransactionLoading, setTransactions } = transactionSlice.actions
export default transactionSlice.reducer
