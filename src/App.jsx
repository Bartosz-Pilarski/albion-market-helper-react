import { useEffect, useState } from "react"

import Navigation from "./components/Navigation.jsx"

import pricesService from "./services/pricesService.js"

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
    <>
      <Navigation></Navigation>
    </>
  )
}

export default App
