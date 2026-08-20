import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserBeneficiaries, updateUserBeneficiaries } from '../../data/mockData'

export const fetchBeneficiaries = createAsyncThunk('beneficiaries/fetchBeneficiaries', async () => [])

const beneficiarySlice = createSlice({
  name: 'beneficiaries',
  initialState: { list: [], isLoading: false, error: null },
  reducers: {
    addBeneficiary(state, action) {
      state.list.push(action.payload)
      if (action.payload.userId) updateUserBeneficiaries(action.payload.userId, state.list)
    },
    updateBeneficiary(state, action) {
      const index = state.list.findIndex((beneficiary) => beneficiary.id === action.payload.id)
      if (index !== -1) state.list[index] = { ...state.list[index], ...action.payload }
      if (action.payload.userId) updateUserBeneficiaries(action.payload.userId, state.list)
    },
    deleteBeneficiary(state, action) {
      const { id, userId } = typeof action.payload === 'object' ? action.payload : { id: action.payload }
      state.list = state.list.filter((beneficiary) => beneficiary.id !== id)
      if (userId) updateUserBeneficiaries(userId, state.list)
    },
    hydrateBeneficiaries(state, action) {
      state.list = getUserBeneficiaries(action.payload)
    },
    setBeneficiaries(state, action) {
      state.list = action.payload
    },
    setBeneficiaryError(state, action) {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeneficiaries.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(fetchBeneficiaries.fulfilled, (state, action) => { state.isLoading = false; state.list = action.payload })
      .addCase(fetchBeneficiaries.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message || 'Unable to load beneficiaries.' })
  },
})

export const { addBeneficiary, deleteBeneficiary, hydrateBeneficiaries, setBeneficiaries, setBeneficiaryError, updateBeneficiary } = beneficiarySlice.actions
export default beneficiarySlice.reducer
