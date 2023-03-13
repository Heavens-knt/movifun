import "./Episode.css"
import Img from "../lazyLoaderImage/Img"
import { getImageUrl } from "../../utils/api"
import { dateFormat, runtime } from "../../utils/dateFormat"
import { useState } from "react"

const Episonde = ({episode, seasonNumber}) => {
  
  const [showDetails, setShowDetails] = useState(false)
  let limitChart = 250;
  const overview = episode.overview

  const handleDetails = () => {
    setShowDetails(!showDetails)
  }
  
  return (
    <a key={episode.id} href="#" className="season_slide episode__slide slide">
      <Img className="episode__image" src={ getImageUrl(episode.still_path) || poster} width="100%" height="180px" alt="episode Image" />
      <div className="episode__body">
        <p className="episode__name">{episode.name}</p>
        <div className="episode__status">
          <p className="episode__number"><span>Season </span> { seasonNumber }  <span>Episode</span> {episode.episode_number}</p>
          <p className="episode__released"><span>Release: </span> {dateFormat(episode.air_date)}</p>
          <p className="episode__runtime"><span>Runtime: </span> {runtime(episode.runtime)}inutes</p>
        </div>
        <div className="episode__overview">
          {overview.length > limitChart && !showDetails ? `${overview.slice(0, limitChart)}...` : overview}
          {overview.length > limitChart ? <button onClick={handleDetails} className="episode__detail__btn">{!showDetails ? "More" : "Less"} Details</button>: ""}
        </div>
      </div>
    </a>

  )
}

export default Episonde
