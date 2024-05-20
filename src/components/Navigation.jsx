import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import './Navigation.scss'
import { resources } from '../util/maps'
import { capitalizeFirstLetter } from '../util/util'

/**
 * Navigation component for picking a resource type or going back to the homepage
 * @component
 */
const ResourceLink = ({ resource, searchParams, navigate }) => {
  const lowercase = resource.toLowerCase()
  const tier = searchParams.get('tier') || 4
  return(
    <a
    //Check to apply a fancy class for marking selection
    className={`${searchParams.get('type') === lowercase ? 'active' : ''} ${lowercase} resourceLink`} 
    onClick={() => {
      navigate({
        pathname: '/refine',
        search: `?type=${lowercase}&tier=${tier}`
      })
    }}
    >
      {/*Construct a resource name with only the first letter being capitalized*/}
      {capitalizeFirstLetter(resource)}
    </a>
  )
}

const Navigation = ({ mobileOpen, setMobileOpen}) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation().pathname

  const toggleOpen = () => setMobileOpen(!mobileOpen)

  return(
    <>
    <button className='burger mobile-only' onClick={() => toggleOpen()}>
      <i className="fa fa-bars"></i>
    </button>
    
    <nav className={mobileOpen ? 'main-navigation' : 'main-navigation mobile-hidden'}>
    <button className='burger-closer mobile-only' onClick={() => toggleOpen()}>
      <i className="fa fa-bars"></i>
    </button>
      <Link 
        //If at home page
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
      <Link
        className={location === '/help' ? 'mini active' : 'mini'} 
        to={'/help'}
      >
      ?
      </Link>
    </nav>
    </>
   
  )
}

export default Navigation