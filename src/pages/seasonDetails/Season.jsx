import "../movieDetails/movie.css"
import noPoster from "../../assets/no-poster.png"
import Img from "../../components/lazyLoaderImage/Img"
import { useFetchData } from "../../hooks/useFetchData"
import { getImageUrl } from "../../utils/api"
import { useParams } from "react-router-dom"
import { dateFormat } from "../../utils/dateFormat"
import Episonde from "../../components/EpisodeCard/Episonde"
import Cast from "../../components/Cast/Cast"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import VideosOfficials from "../../components/VideosOfficals/VideosOfficials"
import { useState } from "react"
import ReactPlayer from "react-player"

const Season = () => {
  const {mediaId, season_number} = useParams()
  const [videoId, setVideoId] = useState(null)
  const [showPop, setShowPop] = useState(false)
  const {data: season, loading, error} = useFetchData(`tv/${mediaId}/season/${season_number}?language=fr-FR`)
  const {data: casts} = useFetchData(`tv/${mediaId}/season/${season_number}/credits?language=fr-FR`)
  const {cast, crew} = casts
  const writers = crew?.filter(item => item.department === "Writing")
  const director = crew?.filter(item => item.job === "Director")
  const videos_endpoint = `tv/${mediaId}/season/${season_number}/videos?language=fr-FR` 
  const {data: videos } = useFetchData(videos_endpoint)
 
  function Skeleton() {
    return (
      <section className="media__skeleton skeleton__anim">
        <span className="skeleton-watch skeleton__anim"></span>
      </section>
    )
  }

  return (
    season.length !== 0 && !error && !loading ?
    <section className="media" style={{backgroundImage: `url("${getImageUrl(season?.poster_path)}")`}}>
      <section className="media__header">
        <div className="image__container"> 
          <div className={`video-play ${showPop ? "show-pop" : ""}`}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls />
            <span 
                onClick={() => {
                  setVideoId(null)
                  setShowPop(false)
                }}
              >Close</span>
          </div>
          <Img src={getImageUrl(season?.poster_path) || noPoster} className="movie__poster" height="100%" width="100%" alt="poser"/>
          <span 
              className="watch-trailer"
              onClick={() => {
                setShowPop(true)
                setVideoId(videos?.results.at(0).key)
              }}
            >Watch Trailer</span>
        </div>
        <section className="header__title">
          <h1 className="media__title">{season?.name}</h1>
          
        </section>
      </section>
      <section className="media__details">
        <h2>Overview</h2>
        <p className="media__overview"> {season?.overview}</p>
        <div className="media__status">
          <div>
            <h1>Release Date:</h1>
            <p>{dateFormat(season?.air_date)}</p>
          </div>
        </div>
        <div className="media__writer">
          <p>Writer: </p>
          <div>
            {writers?.map((writer, index, tab) => <span key={writer.id}>{index === (tab.length - 1) ? `${writer.name}.` : `${writer.name}, `}</span>)}
          </div>
        </div>
        <div className="media__director">
          <p>Director: </p>
          <p>{director?.map((director, index, tab) => <span key={director.id}>{index === (tab.length - 1) ? `${director.name}.` : `${director.name}`}</span>)}</p>
        </div>
        <div className="seasons__total episode__total">
          <section className="right">
            <p>Total Episodes</p>
            <span>{season?.episodes?.length}</span>
          </section>
        </div>
      </section>

      <section className="tv__seasons">
        <h1 className="seasons__title">All Episodes</h1>
        <section className="seasons__carrousel episodes__carrousel slider">
          {season?.episodes?.map(episode => <Episonde episode={episode} seasonNumber={season?.season_number} key={episode.id}/>)}
        </section>
      </section>

      <section className="media__cast">
        <h1>Cast</h1>
        <section className="cast__corrousel slider">
          {cast?.map(c =>  <Cast cast={c} key={c.id} />)}
        </section>
      </section>
      <section className="official__videos">
        <h1>official videos</h1>
        {/*  Official Videos */}
        <VideosOfficials endpoint={videos_endpoint} />
      </section>
    </section>
    :
    <section className="media-error-skeleton">
      <Skeleton />
      <ErrorMessage message={error?.message} error={error} />
    </section>
  )
}

export default Season
