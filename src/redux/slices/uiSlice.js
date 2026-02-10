import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalOpen: false,
    modalType: null,
    modalData: null,
    alert: {
      show: false,
      message: '',
      type: 'info', // 'success', 'error', 'info', 'warning'
    },
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true
      state.modalType = action.payload.type
      state.modalData = action.payload.data || null
    },
    closeModal: (state) => {
      state.isModalOpen = false
      state.modalType = null
      state.modalData = null
    },
    showAlert: (state, action) => {
      state.alert = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      }
    },
    hideAlert: (state) => {
      state.alert.show = false
    },
  },
})

export const { openModal, closeModal, showAlert, hideAlert } = uiSlice.actions
export default uiSlice.reducer
