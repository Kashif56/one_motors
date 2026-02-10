import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../services/supabase'

export const fetchCars = createAsyncThunk(
  'cars/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addCar = createAsyncThunk(
  'cars/add',
  async (carData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from('cars').insert([carData]).select()
      if (error) throw error
      return data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateCar = createAsyncThunk(
  'cars/update',
  async ({ id, carData }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .update(carData)
        .eq('id', id)
        .select()
      if (error) throw error
      return data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteCar = createAsyncThunk(
  'cars/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from('cars').delete().eq('id', id)
      if (error) throw error
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.items.findIndex((car) => car.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.items = state.items.filter((car) => car.id !== action.payload)
      })
  },
})

export default carsSlice.reducer
