import { useNavigate, useSearchParams } from 'react-router-dom'

import './ResourceNavigation.scss'
import { numberToNumeral } from '../util/maps'

/**
 * Subcomponent for ResourceNavigation, a single link for picking the tier to display
 * @component
 */
const ResourceLink = ({ type, tier, currentTier, navigate }) => {
  const handleClick = (tier) => {
    navigate({
      pathname: `/refine`,
      search: `?type=${type}&tier=${tier}`
    })
  }

  return(
    //Check to apply a fancy class for marking selection
    <li className={currentTier === tier ? `tier${tier}-background tier${tier}-active` : `tier${tier}-background`}>
    <div onClick={() => handleClick(tier)} className='link-wrapper'>
        <a className={`tier${tier}`}> Tier {numberToNumeral[tier]} </a>
    </div>
  </li>
  )
}

/**
 * Navigation component for picking the resource tier to refine
 * @component
 */
const ResourceNavigation = () => {
  //for ResourceLink components, so they share one instead of all defining a separate one
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const resourceType = searchParams.get('type')
  const currentTier = searchParams.get('tier')
  
  return(
    <nav className='resource-navigation'>
      <p className='dimmed'>
        Pick your desired resource tier:
      </p>
      <div className="separator"></div>
      <div>
        <ul>
          {Object.keys(numberToNumeral).map((tier) => <ResourceLink key={`tier-${tier}`} type={resourceType} tier={tier} currentTier={currentTier} navigate={navigate} />)}
        </ul>
      </div>
    </nav>
  )
}

export default ResourceNavigation