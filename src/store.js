import { configureStore } from '@reduxjs/toolkit'

import tierReducer from './reducers/tierReducer.js'

const store = configureStore({
  reducer: {
    tier: tierReducer
  }
})

export default store