import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import ResourcePanel from "./ResourcePanel"
import ResourceCalculator from "./ResourceCalculator/ResourceCalculator"
import { capitalizeFirstLetter } from "../util/util"

/**
 * View replacing homepage, displays ResourcePanels and a ResourceCalculator. Based on current searchParams.
 * @component
 */
const ResourceView = () => {
  const [searchParams] = useSearchParams()
  const tier = parseInt(searchParams.get('tier'))
  const type = searchParams.get('type')
  const prices = useSelector((state) => state.prices)

  const relevantPrices = useMemo(
    () => {
      const filteredPrices = prices.find((resource) => resource.tier === tier && resource.type === type.toUpperCase())
      return filteredPrices
    },
    [prices, tier, type]
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
      : <> Loading </>}

    </div>
  )
}

export default ResourceView