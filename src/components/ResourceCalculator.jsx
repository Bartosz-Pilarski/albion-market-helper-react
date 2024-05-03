import { useState, useMemo } from "react"
import { translateLocation } from "../util/maps"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { resourcesReverse } from "../util/maps"

const ResourceCalculator = ({ relevantPrices, allPrices }) => {
  const [searchParams] = useSearchParams()
  const recipes = useSelector((state) => state.refining)

  const [nutritionCost, setNutritionCost] = useState(100)

  const requestedTier = parseInt(searchParams.get('tier'))
  const requestedType = searchParams.get('type').toUpperCase()

  const recipe = useMemo(
    () => {
      const recipeIdentifier = `T${requestedTier}_${requestedType}`
      return recipes[recipeIdentifier]
    },
    [requestedTier, requestedType, recipes]
  )

  //Lower tier item required for crafting item tier 3-8
  const [refiningCatalystRequired, refiningCatalyst] = useMemo(
    () => {
      const refiningCatalystRequired = requestedTier > 2 ? recipe.INGREDIENT_2[0] : false
      if(!refiningCatalystRequired) return [false, undefined]

      const refiningCatalyst = allPrices.find(
          (price) => price.tier === parseInt(refiningCatalystRequired.charAt(1)) && price.type === resourcesReverse[refiningCatalystRequired.slice(3)].TYPE
        ).refined 

      return [true, refiningCatalyst]
    },
    [recipe, allPrices, requestedTier]
  )

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

  const bestPrices = useMemo(
    () => {
      if(refiningCatalystRequired) {
        return {
          raw: calculateBestPrice(relevantPrices, false),
          refined: calculateBestPrice(relevantPrices, true),
          catalyst: calculateBestPrice({ raw: { prices: refiningCatalyst.prices }}, false)
        }
      }
      return {
        raw: calculateBestPrice(relevantPrices, false),
        refined: calculateBestPrice(relevantPrices, true),
        catalyst: false
      }
    },
    [relevantPrices, refiningCatalystRequired, refiningCatalyst]
  )

  console.log(refiningCatalystRequired)
  if(bestPrices.raw.location === '' || bestPrices.refined.location === '') return ( <></> )
  return (
  <div className='resourceCalculator'>
    <div className="resourceCalculator-prices">
      <div className='resourceCalculator-raw'>
        <h2> Buying from: <span className={translateLocation[bestPrices.raw.location].classname}> {bestPrices.raw.location} </span> </h2>
        <div> for {bestPrices.raw.price} silver each</div>
      </div>
      <div className='resourceCalculator-refined'>
        <h2> Selling at: <span className={translateLocation[bestPrices.refined.location].classname}> {bestPrices.refined.location} </span> </h2>
        <div> for {bestPrices.refined.price} silver each </div>
      </div>
    </div>

    <div className="resourceCalculator-calculator">
      <div className="resourceCalculator-nutrition">
        <span> Usage fee per 100 nutrition consumed: </span>
        <input 
          type="text"
          value={nutritionCost}
          onChange={(event) => {
            let userInput = parseInt(event.target.value)
            if(userInput >= 0 && userInput < 1000) setNutritionCost(userInput)
            else setNutritionCost(0)
          }}
        />
        <span> silver </span>
        <div className="resourceCalculator-slider">
          <span> 0 </span>
          <input 
            type='range'
            min={0}
            max={1000}
            value={nutritionCost}
            onChange={(event) => {
              setNutritionCost(event.target.value)
            }}
          />
          <span> 1000 </span>
        </div>
      </div>
    </div>

    <div className="resourceCalculator-recipe">
      Resource: {recipe.INGREDIENT_1[1]}x {relevantPrices.raw.subtitle} - {recipe.INGREDIENT_1[1]*bestPrices.raw.price} silver <br />
      Catalyst: {refiningCatalystRequired && `${recipe.INGREDIENT_2[1]}x ${refiningCatalyst.subtitle} - ${recipe.INGREDIENT_2[1]*bestPrices.catalyst.price} silver`} <br />
      Nutrition cost: {Math.floor((recipe.NUTRITION/100)*nutritionCost)} <br />
      Tax: 8.5% <br />
      Profit: {
      refiningCatalystRequired
        ? bestPrices.refined.price-((recipe.INGREDIENT_1[1]*bestPrices.raw.price)+recipe.INGREDIENT_2[1]*bestPrices.catalyst.price)-Math.floor((recipe.NUTRITION/100)*nutritionCost)
        : bestPrices.refined.price-(recipe.INGREDIENT_1[1]*bestPrices.raw.price)-Math.floor((recipe.NUTRITION/100)*nutritionCost)
      }
    </div>
  </div>
  )
}

export default ResourceCalculator