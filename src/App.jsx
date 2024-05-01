import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import Navigation from "./components/Navigation.jsx"
import Home from "./components/Home.jsx"
import ResourceView from "./components/ResourceView.jsx"

import { initializePrices } from "./reducers/pricesReducer.js"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializePrices())
  }, [])

  return (
    <main>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/refine" element={<ResourceView />} />
      </Routes>
    </main>
  )
}

export default App
