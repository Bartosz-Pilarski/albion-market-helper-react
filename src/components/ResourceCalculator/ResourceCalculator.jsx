import { useState, useMemo, useEffect } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { resourcesReverse } from "../../util/maps"
import { BuyAndSellPanel, NutritionCalculator, RecipeBreakdown, ResourceInputs } from "./Subcomponents"

/**
 * Component for calculating the costs, profits, inputs etc. of refining resources.
 * @component
 */
const ResourceCalculator = ({ relevantPrices }) => {
  const [searchParams] = useSearchParams()
  const recipes = useSelector((state) => state.refining)
  const allPrices = useSelector((state) => state.prices)

  const requestedTier = parseInt(searchParams.get('tier'))
  const requestedType = searchParams.get('type').toUpperCase()

  //Select only the relevant recipe from recipes store
  const recipe = useMemo(
    () => {
      const recipeIdentifier = `T${requestedTier}_${requestedType}`
      return recipes[recipeIdentifier]
    },
    [requestedTier, requestedType, recipes]
  )

  //Find lower tier item required for crafting item tier 3-8, or return [false, undefined] if not needed
  const [refiningCatalystRequired, refiningCatalyst] = useMemo(
    () => {
      let catalyst = recipe.CATALYST[0]
      if(!catalyst) return [false, undefined]

      console.log(relevantPrices)
      const refiningCatalyst = allPrices.find(
          (price) => price.tier === parseInt(catalyst.charAt(1)) && price.type === resourcesReverse[catalyst.slice(3)].TYPE
        ).refined 

      return [true, refiningCatalyst]
    },
    [recipe, allPrices, requestedTier]
  )

  /**
   * calculateBestPrice finds a combination of price and location based on the prices provided that is best suited for the purpose assumed from isRefined
   * @param {Object} prices object which must have a raw or refined (based on isRefined) property with an array of price objects. relevantPrices, which is passed into this component, can be passed as is.
   * @param {boolean} isRefined if true, finds best price to sell at (i.e. highest price). otherwise, finds best price to buy at (i.e. lowest price) 
   * @returns {Object} containing a (positive integer) price and (string) location field
   */
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


  const [nutritionCost, setNutritionCost] = useState(100)
  const [resourceInput, setResourceInput] = useState(recipe.RESOURCE[1])
  const [resourceOutput, setResourceOutput] = useState(1)

  //Update resource calculations to correctly display the required resource inputs, while keeping the desired output, every time tier is changed
  useEffect(() => {
    setResourceInput(resourceOutput*recipe.RESOURCE[1])
  }, [requestedTier])

  //safeguard
  if(bestPrices.raw.location === '' || bestPrices.refined.location === '') return ( <></> )
  
  return (
  <div className='resource-calculator'>
    <BuyAndSellPanel bestPrices={bestPrices} />

    <div className="resource-calculator-calculator">
      <NutritionCalculator nutritionCost={nutritionCost} setNutritionCost={setNutritionCost} />
      <ResourceInputs 
        resourceInput={resourceInput} setResourceInput={setResourceInput} 
        resourceOutput={resourceOutput} setResourceOutput={setResourceOutput} 
        recipe={recipe} 
      />
      <RecipeBreakdown 
        resourceInput={resourceInput} resourceOutput={resourceOutput}
        refiningCatalyst={refiningCatalyst} refiningCatalystRequired={refiningCatalystRequired}
        relevantPrices={relevantPrices} bestPrices={bestPrices}
        recipe={recipe}
        nutritionCost={nutritionCost}
      />
    </div>
  </div>
  )
}

export default ResourceCalculator