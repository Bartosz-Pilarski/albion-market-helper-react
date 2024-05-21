import { configureStore } from '@reduxjs/toolkit'

import pricesReducer from './reducers/pricesReducer.js'
import refiningReducer from './reducers/refiningReducer.js'
import mobileLayoutReducer from './reducers/mobileLayoutReducer.js'

const store = configureStore({
  reducer: {
    prices: pricesReducer,
    refining: refiningReducer,
    isMobile: mobileLayoutReducer
  }
})

export default store