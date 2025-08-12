import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false, // Set to false since we don't have persistence
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log('Login success:', action.payload)
      state.isAuthenticated = true
      state.user = action.payload
      state.isLoading = false
    },
    logout(state) {
      console.log('Logout called')
      state.isAuthenticated = false
      state.user = null
      state.isLoading = false
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const { loginSuccess, logout, setLoading } = authSlice.actions
export default authSlice.reducer 