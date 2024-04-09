import { createSlice } from '@reduxjs/toolkit'

const tierSlice = createSlice({
  name: 'tier',
  initialState: 4,
  reducers: {
    changeTier(state, action) {
      return action.payload
    }
  }
})

export const { changeTier } = tierSlice.actions
export default tierSlice.reducer