import { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import Navigation from "./components/Navigation.jsx"

import pricesService from "./services/pricesService.js"
import Home from "./components/Home.jsx"
import ResourceView from "./components/ResourceView.jsx"

const App = () => {
  const [prices, setPrices] = useState(null)
  console.log(prices)

  useEffect(() => {
    const fetchPrices = async () => {
      const request = await pricesService.getPricesByTypeAndTier('ORE', 3)
      setPrices(request)
    }
    fetchPrices()
  }, [])

  return (
    <main>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/metal" element={<ResourceView resourceType='Metal' />} />
        <Route path="/wood"  element={<ResourceView resourceType='Wood'  />} />
        <Route path="/fiber" element={<ResourceView resourceType='Fiber' />} />
        <Route path="/stone" element={<ResourceView resourceType='Stone' />} />
        <Route path="/hide"  element={<ResourceView resourceType='Hide'  />} />

        {/* Default redirect to homepage in case of unknown url*/}
        <Route path="*" element={<Navigate to={"/"} replace={true} />} />
      </Routes>
    </main>
  )
}

export default App
