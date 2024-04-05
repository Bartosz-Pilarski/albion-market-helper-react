import { Link, useLocation } from "react-router-dom"

const ResourceLink = ({ resource }) => {
  const location = useLocation().pathname
  return(
    <Link 
    className={`${location === '/'+resource ? 'active' : ''} ${resource} resourceLink`} 
    to={`/${resource}`}
    >
      {resource.charAt(0).toUpperCase()+resource.slice(1)}
    </Link>
  )
}

export default ResourceLink