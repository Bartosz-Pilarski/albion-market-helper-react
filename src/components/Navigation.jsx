import { useSelector } from 'react-redux'
import './Navigation.scss'

import { Link, useLocation } from 'react-router-dom'

const ResourceLink = ({ resource, location, currentTier }) => {
  return(
    <Link 
    className={`${location === '/'+resource ? 'active' : ''} ${resource} resourceLink`} 
    to={`/${resource}/${currentTier}`}
    >
      {resource.charAt(0).toUpperCase()+resource.slice(1)}
    </Link>
  )
}

const Navigation = () => {
  const location = useLocation().pathname
  const currentTier = useSelector((state) => state.tier)

  const resources = ['metal', 'wood', 'fiber', 'stone', 'hide']

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
        resources.map(
          (resource) => <ResourceLink key={`navigation-${resource}`} resource={resource} location={location} currentTier={currentTier} /> 
        )
      }
    </nav>
  )
}

export default Navigation