import { useEffect, useState } from "react"
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

    </>
  )
}

export default App
