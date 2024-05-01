import { translateLocation } from "../util/maps"

const ResourceCalculator = ({ prices }) => {
  const calculateBestPrice = (prices, isRefined) => {
    let sortedPrices 
    if(isRefined) {
      sortedPrices = prices.refined.prices.toSorted((a, b) => b.buyPrice - a.buyPrice).filter(({ buyPrice }) => buyPrice !== 0)
      return {
        price: sortedPrices[0].buyPrice,
        location: sortedPrices[0].location
      }
    } else {
      sortedPrices = prices.raw.prices.toSorted((a, b) => a.sellPrice - b.sellPrice).filter(({ sellPrice }) => sellPrice !== 0)
      return {
        price: sortedPrices[0].sellPrice,
        location: sortedPrices[0].location
      }
    }
  }

  const bestPrices = {
    raw: calculateBestPrice(prices, false),
    refined: calculateBestPrice(prices, true)
  }

  if(bestPrices.raw.location === '' || bestPrices.refined.location === '') return ( <></> )
  return (
  <div className='resourceCalculator'>
    <div className='resourceCalculator-raw'>
      <h2> Buying from: <span className={translateLocation[bestPrices.raw.location].classname}> {bestPrices.raw.location} </span> </h2>
      <div> for {bestPrices.raw.price} silver each</div>
    </div>
    <div className='resourceCalculator-refined'>
      <h2> Selling at: <span className={translateLocation[bestPrices.refined.location].classname}> {bestPrices.refined.location} </span> </h2>
      <div> for {bestPrices.refined.price} silver each </div>
    </div>
  </div>
  )
}

export default ResourceCalculator