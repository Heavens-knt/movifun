import "../movieDetails/movie.css"
import { useState } from "react"
import noPoster from "../../assets/no-poster.png"
import avatar from "../../assets/avatar.png"
import Img from "../../components/lazyLoaderImage/Img"
import Carrousel from "../../components/Carrousel/Carrousel"
import { useFetchData } from "../../hooks/useFetchData"
import {useFetchMediaDetails} from "../../hooks/useFetchMediaDetails"
import { getImageUrl } from "../../utils/api"
import { Link, useParams } from "react-router-dom"
import { dateFormat } from "../../utils/dateFormat"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import VideosOfficials from "../../components/VideosOfficals/VideosOfficials"
import ReactPlayer from "react-player/youtube"

const TvShow = () => {

  const {mediaId} = useParams()
  const [showPop, setShowPop] = useState(false)
  const [videoId, setVideoId] = useState(null)
  const {data: movie, error: movieError} = useFetchMediaDetails("tv", mediaId)
  const {data: casts} = useFetchData(`tv/${mediaId}/credits`)
  const { crew, cast } = casts
  const writers = crew?.filter(item => item.department === "Writing" || item.known_for_department === "Writing")
  const directors = crew?.filter(item => item.job === "Director")
  const {data: videos} = useFetchData(`tv/${mediaId}/videos?language=fr-FR`)
 
  function Skeleton() {
    return (
      <section className="media__skeleton skeleton__anim">
        <span className="skeleton-watch skeleton__anim"></span>
      </section>
    )
  }
  
  return (

    (movie !== null && !movieError ?
    <section className="media" style={{backgroundImage: `url("${getImageUrl(movie?.backdrop_path)}")`}}>
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
          <Img src={getImageUrl(movie?.poster_path) || noPoster} className="movie__poster" height="100%" width="100%" alt="poser"/>
          <span 
              className="watch-trailer" 
              onClick={() => {
                setShowPop(true)
                setVideoId(videos?.results.at(0).key)
              }}
            >Watch Trailer</span>
        </div>
        <section className="header__title">
          <h1 className="media__title">{movie?.title || movie?.name}</h1>
          <div className="media__genre">
            {movie?.genres.slice(0, 3).map(g => <span key={g.id}> {g.name} </span>)}
          </div>
        </section>
      </section>
      <section className="media__details">
        <h2>Overview</h2>
        <p className="media__overview"> {movie?.overview}</p>
        <div className="media__status">
          <div>
            <h1>Status:</h1>
            <p>{movie?.status}</p>
          </div>
          <div>
            <h1>Release Date:</h1>
            <p>{dateFormat(movie?.first_air_date)}</p>
          </div>
        </div>
        <div className="media__writer">
          <p>Writer: </p>
          <div>
            {writers?.map((writer, index, tab) => <span key={writer.id}>{index === (tab.length - 1)  ? `${writer.name}.` : `${writer.name}, `}</span>)}
          </div>
        </div>
        <div className="media__director">
          <p>Director: </p>
          <p>{directors?.map((director, index, tab) => <span key={director.id}>{index === (tab.length - 1) ? `${director.name}.` : `${director.name}, `}</span>)}</p>
        </div>
        <div className="media__companies">
          <h1>Production Companies</h1>
          <div className="companies slider">
            {movie?.production_companies?.map(companie => (
              <div key={companie.id} className="company slide">
                <div className="company__logo">  
                  <img src={getImageUrl(companie.logo_path)} alt="companie" />
                </div>
                <p>{companie.name}</p>
                <p>Country: <strong>{companie.origin_country}</strong></p>
              </div>
            ))}
          </div>
        </div>
        <div className="media__countries">
          <h1>Production Countries</h1>
          <div className="countries">
              {movie?.production_countries.map(country => <p key={country.name}>{country.name}</p>)}
          </div>
        </div>
        <div className="seasons__total">
          <section className="left">
            <p>Total Seasons</p>
            <span>{movie?.number_of_seasons}</span>
          </section>
          <section className="right">
            <p>Total Episodes</p>
            <span>{movie?.number_of_episodes}</span>
          </section>
        </div>
      </section>
      <section className="tv__seasons">
        <h1 className="seasons__title">All Seasons</h1>
        <section className="seasons__carrousel slider">
          {movie?.seasons.map(season => (
            season.season_number > 0 &&
            <Link to={`/tv/${mediaId}/season/${season.season_number}`} key={season.id} className="season__slide slide">
              <Img className="season__image" src={ getImageUrl(season.poster_path) || noPoster} width="180px" height="250px" alt="season Image" />
              <div className="season__title">
                <button className="season__btn">{season.name}</button>
              </div>
            </Link>
          ))}
        </section>
      </section>
      <section className="media__cast">
        <h1>Cast</h1>
        <section className="cast__corrousel slider">
          {cast?.map(c => (
            <div key={c.id} className="cast__card slide">
              <Img className="cast__image" src={getImageUrl(c.profile_path) || avatar} height="150px" width="150px" alt="cast-image" />
              <p className="cast__name">{c.character}</p>
              <p className="cast__original-name">{c.name}</p>
            </div>
          ))}
        </section>
      </section>
      <section className="official__videos">
        <h1>official videos</h1>
         {/*  Official Videos */}
        <VideosOfficials endpoint={`tv/${mediaId}/videos?language=fr-FR`} />
      </section>
      <section className="similar">
        
        <Carrousel 
            mediaType="tv" 
            name="Similar" 
            showBtn={false} 
            endpoint={`tv/${mediaId}/similar?language=fr-FR&adult=false`} 
        />

      </section>
      <section className="recommended">
        
        <Carrousel 
            mediaType="tv" 
            name="Recommendations" 
            showBtn={false} 
            endpoint={`tv/${mediaId}/recommendations?language=fr-FR&adult=false`}
        />

      </section>
    </section>
    :
    <section className="media-error-skeleton">
      <Skeleton />

      <ErrorMessage 
        message={movieError?.message} 
        error={movieError} 
      />
    </section>
    )
  )
}

export default TvShow
