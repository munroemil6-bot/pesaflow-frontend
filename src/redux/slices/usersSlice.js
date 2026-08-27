import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAdminUsers } from '../../api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getAdminUsers()
  return (response.results || []).map((user) => ({
    ...user,
    fullName: user.full_name,
    createdAt: user.created_at,
    balance: user.wallet_balance || 0,
    transactionCount: user.transaction_count || 0,
    status: user.is_active === false ? 'Inactive' : 'Active',
  }))
})

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], isLoading: false, error: null },
  reducers: {
    refreshUsers(state, action) { state.list = action.payload || [] },
  },
  extraReducers: (builder) => builder
    .addCase(fetchUsers.pending, (state) => { state.isLoading = true; state.error = null })
    .addCase(fetchUsers.fulfilled, (state, action) => { state.isLoading = false; state.list = action.payload })
    .addCase(fetchUsers.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message })
})

export const { refreshUsers } = usersSlice.actions
export default usersSlice.reducer
