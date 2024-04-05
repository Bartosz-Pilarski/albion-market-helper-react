import './Navigation.scss'

import { Link, useLocation } from 'react-router-dom'
import ResourceLink from './ResourceLink'

const Navigation = () => {
  const location = useLocation().pathname
  console.log(location)

  return(
    <nav>
      <Link 
        className={location === '/' ? 'active' : ''} 
        to={'/'}
        >
          Albion <br /> 
          Market <br /> 
          Helper
      </Link>
      <div className="separator"></div>
      <ResourceLink resource='metal' />

      <ResourceLink resource='wood' />
      
      <ResourceLink resource='fiber' />

      <ResourceLink resource='stone' />

      <ResourceLink resource='hide' />
    </nav>
  )
}

export default Navigation