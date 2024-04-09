import './Navigation.scss'

import { Link, useLocation } from 'react-router-dom'

const ResourceLink = ({ resource, location }) => {
  return(
    <Link 
    className={`${location === '/'+resource ? 'active' : ''} ${resource} resourceLink`} 
    to={`/${resource}`}
    >
      {resource.charAt(0).toUpperCase()+resource.slice(1)}
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
      <ResourceLink resource='metal' location={location} />

      <ResourceLink resource='wood'  location={location} />
      
      <ResourceLink resource='fiber' location={location} />

      <ResourceLink resource='stone' location={location} />

      <ResourceLink resource='hide'  location={location} />
    </nav>
  )
}

export default Navigation