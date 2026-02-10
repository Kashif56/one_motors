import { configureStore } from '@reduxjs/toolkit'
import carsReducer from './slices/carsSlice'
import authReducer from './slices/authSlice'
import filterReducer from './slices/filterSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    auth: authReducer,
    filter: filterReducer,
    ui: uiReducer,
  },
})
