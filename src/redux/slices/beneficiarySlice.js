import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBeneficiaries } from '../../api'

export const fetchBeneficiaries = createAsyncThunk('beneficiaries/fetchBeneficiaries', async () => {
  const response = await getBeneficiaries()
  return response.results || response
})

const beneficiarySlice = createSlice({
  name: 'beneficiaries',
  initialState: { list: [], isLoading: false, error: null },
  reducers: {
    addBeneficiary(state, action) {
      state.list.push(action.payload)
    },
    updateBeneficiary(state, action) {
      const index = state.list.findIndex((beneficiary) => beneficiary.id === action.payload.id)
      if (index !== -1) state.list[index] = { ...state.list[index], ...action.payload }
    },
    deleteBeneficiary(state, action) {
      const { id } = typeof action.payload === 'object' ? action.payload : { id: action.payload }
      state.list = state.list.filter((beneficiary) => beneficiary.id !== id)
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

export const { addBeneficiary, deleteBeneficiary, setBeneficiaryError, updateBeneficiary } = beneficiarySlice.actions
export default beneficiarySlice.reducer
