import { Link } from 'react-router-dom'
import './ResourceNavigation.scss'

const numberToNumeral = {
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII"
}

const ResourceLink = ({ tier }) => {
  return(
    <li className={`tier${tier}-background`}>
    <div className='link-wrapper'>
        <Link className={`tier${tier}`} to={`${tier}`}> Tier {numberToNumeral[tier]} </Link>
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