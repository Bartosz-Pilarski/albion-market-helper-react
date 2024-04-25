import { configureStore } from '@reduxjs/toolkit'

import tierReducer from './reducers/tierReducer.js'
import pricesReducer from './reducers/pricesReducer.js'

const store = configureStore({
  reducer: {
    prices: pricesReducer,
    tier: tierReducer
  }
})

export default store