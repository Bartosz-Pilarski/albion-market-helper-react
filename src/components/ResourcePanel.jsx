import { getImageHref } from "../util/images"
import { translateLocation } from "../util/maps"
import './ResourcePanel.scss'

/**
 * Panel displaying basic resource info, an icon and the relevant prices
 * @component
 */
const resourcePanel = ({ resourceInfo }) => {
  return (
    <div className='resource-panel'>
      <img 
        className='resource-panel-icon' 
        src={getImageHref(resourceInfo.name)} 
        alt="resource icon" 
      />
      <div className='resource-panel-titles'>
        <h1 className='resource-panel-title'>
          {resourceInfo.title}
        </h1>

        <div className='separator'></div>
        
        <h2 className='resource-panel-subtitle'>
          {resourceInfo.subtitle}
        </h2>
      </div>
      <div className='resource-panel-prices'>
        <div className='resource-panel-prices-sell'>
          <p> Selling price: </p>
          <ul>
            {resourceInfo.prices.map((price) => <li key={`${price.location}-sell`} className={translateLocation[price.location].classname}> { price.sellPrice > 0 ? price.sellPrice : 'Unavailable' } </li>)}
          </ul>
        </div>
        <div className='resource-panel-prices-buy'>
          <p> Buying price: </p>
          <ul>
            {resourceInfo.prices.map((price) => <li key={`${price.location}-buy`} className={translateLocation[price.location].classname}> {price.buyPrice > 0 ? price.buyPrice : 'Unavailable'} </li>)}
          </ul>
        </div>
      </div>
      <div className='resource-panel-recommended'>

      </div>
    </div>
  )
}

export default resourcePanel