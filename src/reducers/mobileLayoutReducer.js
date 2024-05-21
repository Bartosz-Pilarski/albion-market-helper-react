import { createSlice } from '@reduxjs/toolkit'

const mobileLayoutSlice = createSlice({
  name: 'isMobile',
  initialState: false,
  reducers: {
    setLayout(state, action) {
      return action.payload
    }
  }
})

export const { setLayout } = mobileLayoutSlice.actions

export const initializeLayout = (isMobile) => {
  return async (dispatch) => {
    dispatch(setLayout(isMobile))
  }
}

export default mobileLayoutSlice.reducer