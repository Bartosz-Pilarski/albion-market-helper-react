import { configureStore } from '@reduxjs/toolkit'

import pricesReducer from './reducers/pricesReducer.js'
import refiningReducer from './reducers/refiningReducer.js'

const store = configureStore({
  reducer: {
    prices: pricesReducer,
    refining: refiningReducer
  }
})

export default store