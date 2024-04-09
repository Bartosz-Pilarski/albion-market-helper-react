import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"

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
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/metal/*" element={<ResourceView resourceType='Metal' />} />
        <Route path="/wood/*"  element={<ResourceView resourceType='Wood'  />} />
        <Route path="/fiber/*" element={<ResourceView resourceType='Fiber' />} />
        <Route path="/stone/*" element={<ResourceView resourceType='Stone' />} />
        <Route path="/hide/*"  element={<ResourceView resourceType='Hide'  />} />


      </Routes>
    </main>
  )
}

export default App
