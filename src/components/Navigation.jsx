import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import './Navigation.scss'
import { resources } from '../util/maps'

const ResourceLink = ({ resource, searchParams, navigate }) => {
  const lowercase = resource.toLowerCase()
  const tier = searchParams.get('tier') || 4
  return(
    <a 
    className={`${searchParams.get('type') === lowercase ? 'active' : ''} ${lowercase} resourceLink`} 
    onClick={() => {
      navigate({
        pathname: '/refine',
        search: `?type=${lowercase}&tier=${tier}`
      })
    }}
    >
      {resource.charAt(0)+lowercase.slice(1)}
    </a>
  )
}

const Navigation = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
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
          (resource) => <ResourceLink key={`navigation-${resource}`} resource={resource} searchParams={searchParams} navigate={navigate} /> 
        )
      }
    </nav>
  )
}

export default Navigation