import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"

import Navigation from "./components/Navigation.jsx"

import pricesService from "./services/pricesService.js"
import Home from "./components/Home.jsx"

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
        <Route path="/" element={<Home/>}/>
      </Routes>
    </main>
  )
}

export default App
