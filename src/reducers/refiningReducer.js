import { createSlice } from '@reduxjs/toolkit'
import refiningService from '../services/refiningService.js'

const refiningSlice = createSlice({
  name: 'refining',
  initialState: [],
  reducers: {
    setRecipes(state, action) {
      return action.payload
    }
  }
})

export const { setRecipes } = refiningSlice.actions

export const initializeRecipes = () => {
  return async (dispatch) => {
    const recipes = await refiningService.getAllRecipes()
    dispatch(setRecipes(recipes))
  }
}

export default refiningSlice.reducer