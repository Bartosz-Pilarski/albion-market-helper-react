import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import ResourcePanel from "./ResourcePanel"
import ResourceCalculator from "./ResourceCalculator/ResourceCalculator"
import { capitalizeFirstLetter } from "../util/util.js"
import spinner from "../images/spinner.gif"

/**
 * View replacing homepage, displays ResourcePanels and a ResourceCalculator. Based on current searchParams.
 * @component
 */
const ResourceView = () => {
  const [searchParams] = useSearchParams()
  const tier = parseInt(searchParams.get('tier'))
  const type = searchParams.get('type')
  const prices = useSelector((state) => state.prices)
  const isMobile = useSelector((state) => state.isMobile)

  const relevantPrices = useMemo(
    () => {
      const filteredPrices = prices.find((resource) => resource.tier === tier && resource.type === type.toUpperCase())
      return filteredPrices
    },
    [prices, tier, type]
  )

  //Mobile display
  if(isMobile) return(
    <div style={{color: 'white'}} className="main-view resource-view">

      {relevantPrices 
      ? <div className='resource-view-details-wrapper'>
        <h1 className='resource-view-header'>
          {capitalizeFirstLetter(type)} Refining
        </h1>
        <div className='resource-view-details'>
          <div className="resource-view-panels-mobile">
            <ResourcePanel resourceInfo={relevantPrices.raw} isRefined={false} />
            <ResourcePanel resourceInfo={relevantPrices.refined} isRefined={true} />
          </div>
          <ResourceCalculator key={`${tier}-${type}-calc`} relevantPrices={relevantPrices} />

        </div>
      </div> 
      : <div className='spinner-container'> <img className='spinner' src={spinner} /> </div>}

    </div>
    )

  return(
    <div style={{color: 'white'}} className="main-view resource-view">

      {relevantPrices 
      ? <div className='resource-view-details-wrapper'>
        <h1 className='resource-view-header'>
          {capitalizeFirstLetter(type)} Refining
        </h1>
        <div className='resource-view-details'>
          <ResourcePanel resourceInfo={relevantPrices.raw} isRefined={false} />
          <ResourceCalculator key={`${tier}-${type}-calc`} relevantPrices={relevantPrices} />
          <ResourcePanel resourceInfo={relevantPrices.refined} isRefined={true} />
        </div>
      </div> 
      : <div className='spinner-container'> <img className='spinner' src={spinner} /> </div>}

    </div>
  )
}

export default ResourceView