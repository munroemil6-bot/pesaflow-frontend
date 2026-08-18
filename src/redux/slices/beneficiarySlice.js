import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchBeneficiaries = createAsyncThunk('beneficiaries/fetchBeneficiaries', async () => [])

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
      state.list = state.list.filter((beneficiary) => beneficiary.id !== action.payload)
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

export const { addBeneficiary, deleteBeneficiary, setBeneficiaries, setBeneficiaryError, updateBeneficiary } = beneficiarySlice.actions
export default beneficiarySlice.reducer
