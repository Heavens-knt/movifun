import Img from "../lazyLoaderImage/Img"
import CircleRating from "../circleRating/CircleRating"
import { getImageUrl } from "../../utils/api"
import { Link } from 'react-router-dom'
import { dateFormat } from "../../utils/dateFormat"

const Slide = ({item, mediaType, mediaId}) => {
  const isMovie = Object.getOwnPropertyDescriptor(item, "release_date")

  const poster_url = getImageUrl(item?.poster_path) 
  const title = item?.title || item?.name
  const release_date = dateFormat(item?.release_date) || dateFormat(item?.first_air_date)
  return (
    <Link to={`/${isMovie !== undefined ? "movie" : "tv"}/${mediaId}`} className="carrousel__slide" >
      <div className="slide__image">
        <Img src={poster_url} height="220px" alt="poster-image" className="slide__image" />
        <CircleRating rating={ item?.vote_average === undefined ? "0.0" : item?.vote_average.toFixed(1)} />
      </div>
        <p className="slide__title">{title.length >= 14 ? `${title.slice(0, 14)}...` : title}</p>
        <p className="slide__release">{release_date}</p>
    </Link>
  )
}

export default Slide
