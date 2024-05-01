import { getImageHref } from "../util/images"
import { translateLocation } from "../util/maps"

const ResourcePanel = ({ resourceInfo }) => {
  return (
    <div className='resourcePanel' style={{border: '2px solid white', padding: '1rem', margin: '1rem', width: '15rem'}}>
      <img 
        className='resourcePanel-icon' 
        src={getImageHref(resourceInfo.name)} 
        alt="resource icon" 
      />
      <h1 className='resourcePanel-title'>
        {resourceInfo.title}
      </h1>
      <h2 className='resourcePanel-subtitle'>
        {resourceInfo.subtitle}
      </h2>
      <div className='resourcePanel-prices'>
        <div className='resourcePanel-prices-sell'>
          <p> Selling price: </p>
          <ul>
            {resourceInfo.prices.map((price) => <li key={`${price.location}-sell`} className={translateLocation[price.location].classname}> { price.sellPrice > 0 ? price.sellPrice : 'Unavailable' } </li>)}
          </ul>
        </div>
        <div className='resourcePanel-prices-buy'>
          <p> Buying price: </p>
          <ul>
            {resourceInfo.prices.map((price) => <li key={`${price.location}-buy`} className={translateLocation[price.location].classname}> {price.buyPrice > 0 ? price.buyPrice : 'Unavailable'} </li>)}
          </ul>
        </div>
      </div>
      <div className='resourcePanel-recommended'>

      </div>
    </div>
  )
}

export default ResourcePanel