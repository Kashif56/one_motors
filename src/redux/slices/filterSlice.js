import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchQuery: '',
  priceRange: [0, 200000],
  fuelType: 'All',
  transmission: 'All',
  bodyType: 'All',
  sortBy: 'newest', // 'price-low', 'price-high', 'newest'
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload
    },
    setFuelType: (state, action) => {
      state.fuelType = action.payload
    },
    setTransmission: (state, action) => {
      state.transmission = action.payload
    },
    setBodyType: (state, action) => {
      state.bodyType = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    resetFilters: () => initialState,
  },
})

export const {
  setSearchQuery,
  setPriceRange,
  setFuelType,
  setTransmission,
  setBodyType,
  setSortBy,
  resetFilters,
} = filterSlice.actions

export default filterSlice.reducer
