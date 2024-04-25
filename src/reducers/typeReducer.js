import { createSlice } from '@reduxjs/toolkit'

const typeSlice = createSlice({
  name: 'tier',
  initialState: '',
  reducers: {
    changeTier(state, action) {
      return action.payload
    }
  }
})

export const { changeTier } = typeSlice.actions
export default typeSlice.reducer