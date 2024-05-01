import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import './ResourceNavigation.scss'
import { numberToNumeral } from '../util/maps'

const ResourceLink = ({ type, tier, currentTier, navigate }) => {
  const handleClick = (tier) => {
    navigate({
      pathname: `/refine`,
      search: `?type=${type}&tier=${tier}`
    })
  }

  return(
    <li className={currentTier === tier ? `tier${tier}-background tier${tier}-active` : `tier${tier}-background`}>
    <div onClick={() => handleClick(tier)} className='link-wrapper'>
        <Link className={`tier${tier}`}> Tier {numberToNumeral[tier]} </Link>
    </div>
  </li>
  )
}

const ResourceNavigation = () => {
  const [searchParams] = useSearchParams()
  const resourceType = searchParams.get('type')
  const currentTier = searchParams.get('tier')
  const navigate = useNavigate()
  return(
    <nav className='resource-navigation'>
      <p>
        Pick your desired resource tier:
      </p>
      <ul>
        {Object.keys(numberToNumeral).map((tier) => <ResourceLink key={`tier-${tier}`} type={resourceType} tier={tier} currentTier={currentTier} navigate={navigate} />)}
      </ul>
      
    </nav>
  )
}

export default ResourceNavigation