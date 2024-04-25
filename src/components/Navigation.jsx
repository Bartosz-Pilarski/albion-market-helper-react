import { Link, useLocation } from 'react-router-dom'

import './Navigation.scss'
import { resources } from '../util/maps'

const ResourceLink = ({ resource, location }) => {
  const lowercase = resource.toLowerCase()
  return(
    <Link 
    className={`${location === `/${lowercase}` ? 'active' : ''} ${lowercase} resourceLink`} 
    to={`/${lowercase}`}
    >
      {resource.charAt(0)+lowercase.slice(1)}
    </Link>
  )
}

const Navigation = () => {
  const location = useLocation().pathname

  return(
    <nav className='main-navigation'>
      <Link 
        className={location === '/' ? 'active' : ''} 
        to={'/'}
        >
          Albion <br /> 
          Market <br /> 
          Helper
      </Link>
      <div className="separator"></div>
      {
        Object.keys(resources).map(
          (resource) => <ResourceLink key={`navigation-${resource}`} resource={resource} location={location} /> 
        )
      }
    </nav>
  )
}

export default Navigation