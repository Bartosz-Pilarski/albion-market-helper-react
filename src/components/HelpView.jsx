import { translateLocation } from "../util/maps"
import lastUpdateService from "../services/lastUpdateService"
import { useEffect, useState } from "react"

const HelpView = () => {
  const [lastUpdate, setLastUpdate] = useState({ lastUpdate: '', epoch: 0, humanReadable: ''})
  useEffect(() => { lastUpdateService.getLastUpdate().then(data => setLastUpdate(data)) }, [])
  
  return (
    <div className="main-view help-view">
      <h1 className="help-view-header">
        Help
      </h1>
      <div className="help-view-details">
        <div className="help-view-last-update">
          <h2> Last price data update: </h2>
          <div className="help-view-dates">
            <p> {lastUpdate.lastUpdate} </p>
            <p> {lastUpdate.humanReadable} ago </p>
          </div>
        </div>
        <div className="help-view-locations">
          <h2> In-game locations are color-coded as follows: </h2>
          <ul>
            <li className={translateLocation.Bridgewatch.classname}> Bridgewatch </li>
            <li className={translateLocation.Caerleon.classname}> Caerleon </li>
            <li className={translateLocation["Fort Sterling"].classname}> Fort Sterling </li>
            <li className={translateLocation.Lymhurst.classname}> Lymhurst </li>
            <li className={translateLocation.Martlock.classname}> Martlock </li>
            <li className={translateLocation.Thetford.classname}> Thetford </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HelpView