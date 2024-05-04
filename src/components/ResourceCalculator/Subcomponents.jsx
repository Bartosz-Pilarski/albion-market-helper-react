import { translateLocation } from "../../util/maps"
import { handleFocus } from "../../util/util"

/**
 * Displays which location's prices the refining will be based on clearly
 * @component
 */
const BuyAndSellPanel = ({ bestPrices }) => {
  return(
    <div className="resource-calculator-prices">
      <div className='resource-calculator-raw'>
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

/**
 * Handles inputting the usage fee per nutrition
 * @component
 */
const NutritionCalculator = ({ nutritionCost, setNutritionCost }) => {
  return(
    <div className="resource-calculator-nutrition">
      <span> Usage fee per 100 nutrition consumed: </span>
      <input 
        type='number'
        value={nutritionCost}
        onFocus={(event) => handleFocus(event)}
        onChange={(event) => {
          let userInput = parseInt(event.target.value)
          if(userInput >= 0 && userInput <= 1000) setNutritionCost(userInput)
          else setNutritionCost(0)
        }}
      />
      <span> silver </span>
      <div className="resource-calculator-slider">
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
  )
}

/**
 * Handles inputting the desired input/output of resources
 * @component
 */
const ResourceInputs = ({ resourceInput, setResourceInput, resourceOutput, setResourceOutput, recipe }) => {
  return(
    <div className="resource-calculator-inputs">
      <span>Resource input: </span>
      <input
        type='number'
        value={resourceInput}
        onFocus={(event) => handleFocus(event)}
        onChange={(event) => {
          const newValue = parseInt(event.target.value)
          if(isNaN(newValue)) return
          setResourceInput(event.target.value)
          //Calculate resource output based on the ratio of raw to refined resource in the recipe
          setResourceOutput(Math.floor(event.target.value/recipe.RESOURCE[1]))
        }}
      />
      <span>Resource output: </span>
      <input
        type='number'
        value={resourceOutput}
        onFocus={(event) => handleFocus(event)}
        onChange={(event) => {
          const newValue = parseInt(event.target.value)
          if(isNaN(newValue)) return
          setResourceOutput(event.target.value)
          //Calculate resource input based on the ratio of raw to refined resource in the recipe
          setResourceInput(event.target.value*recipe.RESOURCE[1])
        }}
      />
    </div>
  )
}

/**
 * Step by step breakdown for the refining process.
 * TODO: handle taxes and RRR
 * @component
 */
const RecipeBreakdown = ({ resourceInput, resourceOutput, relevantPrices, bestPrices, refiningCatalyst, refiningCatalystRequired, recipe, nutritionCost }) => {
  const resourceHumanName = relevantPrices.raw.subtitle
  const catalystHumanName = refiningCatalystRequired ? refiningCatalyst.subtitle : ''

  const calculatedNutritionCost = Math.floor((recipe.NUTRITION*nutritionCost)/100)*resourceOutput

  if(!refiningCatalystRequired) return(
    <div className="resource-calculator-recipe">
      Resource: {resourceInput}x {resourceHumanName} - {resourceInput*bestPrices.raw.price} silver <br />
      Tax: 8.5% <br />
      Resource Return Rate: 15% <br />
      Profit: {resourceOutput*bestPrices.refined.price-(resourceInput*bestPrices.raw.price)}
    </div>
  )
  else return (
    <div className="resource-calculator-recipe">
      Resource: {resourceInput}x {resourceHumanName} - {resourceInput*bestPrices.raw.price} silver <br />
      Catalyst: {resourceOutput}x {catalystHumanName} - {resourceOutput*bestPrices.catalyst.price} silver <br />
      Nutrition cost: {calculatedNutritionCost} <br />
      Tax: 8.5% <br />
      Resource Return Rate: 15% <br />
      Profit: {resourceOutput*bestPrices.refined.price-((resourceInput*bestPrices.raw.price)+resourceOutput*bestPrices.catalyst.price)-(Math.floor((recipe.NUTRITION/100)*nutritionCost)*resourceOutput)}
    </div>
  )
}

export {
  BuyAndSellPanel,
  NutritionCalculator,
  ResourceInputs, 
  RecipeBreakdown
}