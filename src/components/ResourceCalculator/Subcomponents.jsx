import { translateLocation } from "../../util/maps"
import { handleFocus } from "../../util/util"
import { resourceReturnRates } from "../../util/maps"

/**
 * Subcomponent for BuyAndSellPanel, takes either of the bestPrices values
 * @component
 */
const BuyAndSellPlate = ({ price, isRefined }) => {
  return isRefined
    ? (
    <div className='resource-calculator-refined'>
      <p> Selling at: </p>
      <h1 className={translateLocation[price.location].classname}> {price.location} </h1>
      <h2> for {price.price} silver each </h2>
    </div>
    )
    : (
    <div className='resource-calculator-raw'>
      <p> Buying at: </p>
      <h1 className={translateLocation[price.location].classname}> {price.location} </h1>
      <h2> for {price.price} silver each </h2>
    </div>
    )
}

/**
 * Displays which location's prices the refining will be based on clearly
 * @component
 */
const BuyAndSellPanel = ({ bestPrices }) => {
  if(!bestPrices) return (<></>)
  return(
    <div className="resource-calculator-prices">
      <BuyAndSellPlate price={bestPrices.raw} isRefined={false} />
      <div className="arrow-right"></div>
      <BuyAndSellPlate price={bestPrices.refined} isRefined={true} />
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
    <div className="resource-calculator-inputs-wrapper">
      <p>Enter your desired input or output:</p>
      
      <div className="resource-calculator-inputs">
        <div className="resource-calculator-input">
          <span> Input </span>
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
        </div>

        <div className="arrow-right-small"></div>

        <div className="resource-calculator-output">
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
          <span> Output </span>
        </div>
      </div>
      
      <p className='resource-calculator-ratio'> <span className='dimmed'>Raw to refined resource ratio for this recipe is </span> <br /> <span className='highlight'> {recipe.RESOURCE[1]}:1 </span></p>
    </div>
  )
}

const TaxRatePicker = ({
  isTaxDiscounted, setIsTaxDiscounted
}) => {
  return (
    <div className="resource-calculator-taxes">
      <p>Tax:</p>
      <input 
        type="radio" 
        name="tax" id="tax-f2p" 
        checked={!isTaxDiscounted}
        onChange={() => setIsTaxDiscounted(false)}
        />
      <label htmlFor="tax-f2p">8.5%</label>
      <input 
        type="radio" 
        name="tax" id="tax-premium" 
        checked={isTaxDiscounted}
        onChange={() => setIsTaxDiscounted(true)}
        />
      <label htmlFor="tax-premium">5.5%</label>
    </div>
  )
}

/**
 * Handles picking RRR and determines if Focus is used
 * @component 
 */
const ResourceReturnRatesPicker = ({
  isFocusUsed, setisFocusUsed,
  setResourceReturnRate
}) => {

  return(
    <div className="resource-calculator-rrr">
      <p>Resource Return Rate:</p>
      <select 
        name="rrr-dropdown" id="rrr-dropdown"
        onChange={(event) => setResourceReturnRate(JSON.parse(event.target.value)) }
      >
        <option value={ JSON.stringify(resourceReturnRates.cityBonus) }  >Royal City w/ Bonus </option>
        <option value={ JSON.stringify(resourceReturnRates.city) }       >Royal City </option>
        <option value={ JSON.stringify(resourceReturnRates.islandBonus) }>Royal Island w/ Bonus </option>
        <option value={ JSON.stringify(resourceReturnRates.island) }     >Royal Island </option>
        <option value={ JSON.stringify(resourceReturnRates.hideout) }    >Hideout </option>
      </select>
      <br />
      <label htmlFor="focus-used"> Refining with focus? </label>
      <input 
        type="checkbox" 
        name="focus" id="focus-used" 
        checked={isFocusUsed}
        onChange={(event) => setisFocusUsed(event.target.checked)}
      />
      </div>
  )
}

/**
 * Step by step breakdown for the refining process.
 * TODO: handle taxes and RRR
 * @component
 */
const RecipeBreakdown = ({ 
    resourceInput, resourceOutput, 
    relevantPrices, bestPrices, 
    refiningCatalyst, refiningCatalystRequired, 
    recipe, nutritionCost,
    isFocusUsed, resourceReturnRate,
    isTaxDiscounted
  }) => {
  const resourceHumanName = relevantPrices.raw.subtitle
  const catalystHumanName = refiningCatalystRequired ? refiningCatalyst.subtitle : ''
  const taxHumanName = isTaxDiscounted ? '5.5%' : '8.5%'
  const rrrHumanName = isFocusUsed ? (resourceReturnRate.focus*100).toFixed(1)+'%' : (resourceReturnRate.normal*100).toFixed(1)+'%'

  const tax = isTaxDiscounted ? 0.055 : 0.085
  const rrr = isFocusUsed ? resourceReturnRate.focus : resourceReturnRate.normal

  const calculatedBuyPrice = refiningCatalystRequired 
    ? (resourceInput*bestPrices.raw.price) + (resourceOutput*bestPrices.catalyst.price)
    : resourceInput*bestPrices.raw.price

  const calculateFinalSellPrice = () => {
    let approxRRR = parseInt(resourceOutput)*rrr
    let total = approxRRR
    for (let pass = 0; pass < 3; pass++) {
      let returns = approxRRR*rrr
      returns = Math.floor(returns)
      approxRRR = returns
      total += returns
    }
    total = Math.floor(total)
    const approxTotalOutput = parseInt(resourceOutput)+total
    const totalSellPrice = approxTotalOutput*bestPrices.refined.price
    const totalNutritionCost = Math.floor((recipe.NUTRITION*nutritionCost)/100)*approxTotalOutput

    return [totalSellPrice, totalNutritionCost, total]
  }

  const [calculatedSellPrice, calculatedNutritionCost, approxReturns] = calculateFinalSellPrice()
  console.log(calculatedSellPrice*tax)
  console.log(calculatedSellPrice-(calculatedSellPrice*tax))
  const calculatedTax = Math.floor(calculatedSellPrice*tax)
  const calculatedProfit = calculatedSellPrice-calculatedTax-calculatedNutritionCost-calculatedBuyPrice

  if(!refiningCatalystRequired) return(
    <div className="resource-calculator-recipe">
      <div className="resource-calculator-recipe-output">
        <div className="resource-calculator-simple-resource">
        <span className="resource-calculator-recipe-header"> Resource: </span> {resourceInput}x {resourceHumanName} - {resourceInput*bestPrices.raw.price} silver <br />
        </div>
        <div className="resource-calculator-nutrition-output">
          <span className="resource-calculator-recipe-header"> Resource Return Rate: </span> {rrrHumanName} ⇀ ~{approxReturns} extra item{approxReturns !== 1 ? 's' : ''} (+{approxReturns*bestPrices.raw.price} silver)
        </div>
        <div className="resource-calculator-recipe-tax">
          <span className="resource-calculator-recipe-header"> Tax: </span> {taxHumanName} ({calculatedTax} silver)
        </div>
      </div>
      <div className="resource-calculator-profit">
       <span className={calculatedProfit > 0 ? 'profitable' : 'not-profitable'}> Profit: {calculatedSellPrice-calculatedTax} silver </span>
      </div>
    </div>
  )
  else return (
    <div className="resource-calculator-recipe">
      <div className="resource-calculator-recipe-input">
        <table>
          <thead>
            <tr>
              <th scope="col"> # </th>
              <th scope="col"> Name </th>
              <th scope="col"> Cost (Silver) </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> {resourceInput} </td>
              <td> {resourceHumanName} </td>
              <td> {resourceInput*bestPrices.raw.price} </td>
            </tr>
            <tr>
              <td> {resourceOutput} </td>
              <td> {catalystHumanName} </td>
              <td> {resourceOutput*bestPrices.catalyst.price} </td>
            </tr>
            <tr>
              <td colSpan={2} scope="row"> Nutrition cost </td>
              <td> {calculatedNutritionCost} </td>
            </tr>
            <tr>
              <th colSpan={2} scope="row"> Input total </th>
              <td> {calculatedBuyPrice+calculatedNutritionCost} </td>
            </tr>
          </tbody>
        </table>

      </div>

      <div className="resource-calculator-recipe-output">
        <div className="resource-calculator-nutrition-output">
          <span className="resource-calculator-recipe-header"> Resource Return Rate: </span> {rrrHumanName} ⇀ ~{approxReturns} extra item{approxReturns !== 1 ? 's' : ''} (+{approxReturns*bestPrices.raw.price} silver)
        </div>
        <div className="resource-calculator-recipe-tax">
          <span className="resource-calculator-recipe-header"> Tax: </span> {taxHumanName} ({calculatedTax} silver)
        </div>
      </div>
      <div className="resource-calculator-profit">
       <span className={calculatedProfit > 0 ? 'profitable' : 'not-profitable'}> Profit: {calculatedProfit} silver </span>
      </div>
    </div>
  )
}

export {
  BuyAndSellPanel,
  NutritionCalculator,
  ResourceInputs, 
  ResourceReturnRatesPicker,
  TaxRatePicker,
  RecipeBreakdown
}