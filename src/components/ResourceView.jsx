import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import ResourceNavigation from "./ResourceNavigation"
import ResourcePanel from "./ResourcePanel"
import ResourceCalculator from "./ResourceCalculator"
import { useSearchParams } from "react-router-dom"

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
      <ResourceNavigation />
      {relevantPrices 
      ? <>
        <h1> {resourceType} Refining </h1>
        <ResourcePanel resourceInfo={relevantPrices.raw} isRefined={false} />
        <ResourceCalculator relevantPrices={relevantPrices} allPrices={prices} />
        <ResourcePanel resourceInfo={relevantPrices.refined} isRefined={true} />
      </> 
      : <> Loading </>}

    </div>
  )
}

export default ResourceView