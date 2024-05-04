import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import ResourcePanel from "./ResourcePanel"
import ResourceCalculator from "./ResourceCalculator/ResourceCalculator"
import { useSearchParams } from "react-router-dom"

/**
 * View replacing homepage, displays ResourcePanels and a ResourceCalculator. Based on current searchParams.
 * @component
 */
const ResourceView = () => {
  const [searchParams] = useSearchParams()
  const resourceType = searchParams.get('type')
  const tier = searchParams.get('tier')
  const prices = useSelector((state) => state.prices)

  const filterPrices = (prices, tier) => prices.find((resource) => resource.tier === tier && resource.type === resourceType.toUpperCase())
  const [relevantPrices, setRelevantPrices] = useState(filterPrices(prices, tier))

  useEffect(() => {
    //to prevent an extra rerender
    const filterPrices = (prices, tier) => prices.find((resource) => resource.tier === tier && resource.type === resourceType.toUpperCase())
    setRelevantPrices(filterPrices(prices, parseInt(tier)))
  }, [tier, prices, relevantPrices, resourceType])

  return(
    <div style={{color: 'white'}} className="main-view resource-view">

      {relevantPrices 
      ? <div className='resource-view-details-wrapper'>
        <h1> {resourceType} Refining </h1>
        <div className='resource-view-details'>
          <ResourcePanel resourceInfo={relevantPrices.raw} isRefined={false} />
          <ResourceCalculator relevantPrices={relevantPrices} allPrices={prices} />
          <ResourcePanel resourceInfo={relevantPrices.refined} isRefined={true} />
        </div>
      </div> 
      : <> Loading </>}

    </div>
  )
}

export default ResourceView