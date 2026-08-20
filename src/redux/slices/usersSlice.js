import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers, updateUserStatus } from '../../data/mockData'

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: getAllUsers(), isLoading: false, error: null },
  reducers: {
    refreshUsers(state) {
      state.list = getAllUsers()
    },
    setUserStatus(state, action) {
      const { userId, status } = action.payload
      updateUserStatus(userId, status)
      state.list = getAllUsers()
    },
  },
})

export const { refreshUsers, setUserStatus } = usersSlice.actions
export default usersSlice.reducer
