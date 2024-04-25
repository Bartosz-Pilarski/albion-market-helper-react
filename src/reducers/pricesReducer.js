import { createSlice } from '@reduxjs/toolkit'
import pricesService from '../services/pricesService'

const pricesSlice = createSlice({
  name: 'prices',
  initialState: [],
  reducers: {
    setPrices(state, action) {
      return action.payload
    }
  }
})

export const { setPrices } = pricesSlice.actions

export const initializePrices = () => {
  return async (dispatch) => {
    const prices = await pricesService.getAllPrices()
    dispatch(setPrices(prices))
  }
}

export default pricesSlice.reducer