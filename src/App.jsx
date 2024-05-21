import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"

import Navigation from "./components/Navigation.jsx"
import Home from "./components/Home.jsx"
import ResourceView from "./components/ResourceView.jsx"

import { initializePrices } from "./reducers/pricesReducer.js"
import { initializeRecipes } from "./reducers/refiningReducer.js"
import ResourceNavigation from "./components/ResourceNavigation.jsx"
import HelpView from "./components/HelpView.jsx"
import { initializeLayout } from "./reducers/mobileLayoutReducer.js"
import { useWindowDimensions } from "./util/hooks.js"

const App = () => {
  const dispatch = useDispatch()

  //Mobile visibility setting for navbars
  const [mobileOpen, setMobileOpen] = useState(false)
  const { width } = useWindowDimensions()


  useEffect(() => {
    dispatch(initializePrices())
    dispatch(initializeRecipes())
    dispatch(initializeLayout(width <= 450 ? true : false))
  }, [])

  return (
    <main>
      <Routes>
        <Route path="/" element={<> <Navigation setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} /> <Home/> </>} />
        <Route path="/refine" element={<> <Navigation setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} /> <ResourceNavigation mobileOpen={mobileOpen} /> <ResourceView /> </>} />
        <Route path="/help" element={<> <Navigation setMobileOpen={setMobileOpen} mobileOpen={mobileOpen} /> <HelpView /> </>} />
      </Routes>
    </main>
  )
}

export default App
