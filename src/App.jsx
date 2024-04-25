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
        <Route path="/metal/*" element={<ResourceView key='view-metal' resourceType='Metal' />} />
        <Route path="/wood/*"  element={<ResourceView key='view-wood' resourceType='Wood'  />} />
        <Route path="/fiber/*" element={<ResourceView key='view-fiber' resourceType='Fiber' />} />
        <Route path="/stone/*" element={<ResourceView key='view-stone' resourceType='Stone' />} />
        <Route path="/hide/*"  element={<ResourceView key='view-hide' resourceType='Hide'  />} />


      </Routes>
    </main>
  )
}

export default App
