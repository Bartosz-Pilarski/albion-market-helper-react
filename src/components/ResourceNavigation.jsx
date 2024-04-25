import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './ResourceNavigation.scss'
import { changeTier } from '../reducers/tierReducer'
import { numberToNumeral } from '../util/maps'

const ResourceLink = ({ tier }) => {
  const currentTier = useSelector((state) => state.tier)
  const dispatch = useDispatch()

  const handleClick = (tier) => {
    dispatch(changeTier(tier))
  }

  return(
    <li className={currentTier === tier ? `tier${tier}-background tier${tier}-active` : `tier${tier}-background`}>
    <div onClick={() => handleClick(tier)} className='link-wrapper'>
        <Link  className={`tier${tier}`}> Tier {numberToNumeral[tier]} </Link>
    </div>
  </li>
  )
}

const ResourceNavigation = () => {
  return(
    <nav className='resource-navigation'>
      <p>
        Pick your desired resource tier:
      </p>
      <ul>
        {Object.keys(numberToNumeral).map((tier) => <ResourceLink key={`tier-${tier}`} tier={ tier } />)}
      </ul>
      
    </nav>
  )
}

export default ResourceNavigation