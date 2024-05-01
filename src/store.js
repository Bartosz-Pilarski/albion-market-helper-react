import { configureStore } from '@reduxjs/toolkit'

import pricesReducer from './reducers/pricesReducer.js'

const store = configureStore({
  reducer: {
    prices: pricesReducer,
  }
})

export default store