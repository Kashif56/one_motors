import { createSlice } from '@reduxjs/toolkit'

// --- CONFIGURATION ---
// This is the predefined password for the dashboard.
// You can change this string to whatever secure password you prefer.
const DASHBOARD_PASSWORD = "admin" 
// ---------------------

const initialState = {
  isAuthenticated: localStorage.getItem('one_motors_auth') === 'true',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { password } = action.payload
      if (password === DASHBOARD_PASSWORD) {
        state.isAuthenticated = true
        state.error = null
        localStorage.setItem('one_motors_auth', 'true')
      } else {
        state.isAuthenticated = false
        state.error = 'Invalid password'
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('one_motors_auth')
    },
    clearError: (state) => {
        state.error = null
    }
  },
})

export const { login, logout, clearError } = authSlice.actions
export default authSlice.reducer
