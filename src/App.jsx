import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import Navigation from "./components/Navigation.jsx"
import Home from "./components/Home.jsx"
import ResourceView from "./components/ResourceView.jsx"

import { initializePrices } from "./reducers/pricesReducer.js"
import { initializeRecipes } from "./reducers/refiningReducer.js"
import ResourceNavigation from "./components/ResourceNavigation.jsx"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializePrices())
    dispatch(initializeRecipes())
  }, [])

  return (
    <main>
      <Routes>
        <Route path="/" element={<> <Navigation /> <Home/> </>} />
        <Route path="/refine" element={<> <Navigation /> <ResourceNavigation /> <ResourceView /> </>} />
      </Routes>
    </main>
  )
}

export default App
