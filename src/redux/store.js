import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import walletReducer from './slices/walletSlice'
import beneficiaryReducer from './slices/beneficiarySlice'
import transactionReducer from './slices/transactionSlice'
import usersReducer from './slices/usersSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    beneficiaries: beneficiaryReducer,
    transactions: transactionReducer,
    users: usersReducer,
  },
})

export default store
