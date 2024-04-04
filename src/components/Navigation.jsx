import './Navigation.scss'

import { Link } from 'react-router-dom'

const Navigation = () => {
  return(
    <nav>
      <Link to={'/'}>Albion <br /> Market <br /> Helper</Link>
      <div className="separator"></div>
      <Link to={'/metal'}>Metal</Link>
      <Link to={'/wood'}>Wood</Link>
      <Link to={'/fiber'}>Fiber</Link>
      <Link to={'/stone'}>Stone</Link>
      <Link to={'/hide'}>Hide</Link>
    </nav>
  )
}

export default Navigation