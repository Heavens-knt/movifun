import "./movie.css"
import noPoster from "../../assets/no-poster.png"
import avatar from "../../assets/avatar.png"
import Img from "../../components/lazyLoaderImage/Img"
import Carrousel from "../../components/Carrousel/Carrousel"
import { useFetchData } from "../../hooks/useFetchData"
import {useFetchMediaDetails} from "../../hooks/useFetchMediaDetails"
import { getImageUrl } from "../../utils/api"
import { useParams } from "react-router-dom"
import { dateFormat, runtime } from "../../utils/dateFormat"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import VideosOfficials from "../../components/VideosOfficals/VideosOfficials"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player/youtube"

const Movie = () => {
  const {movieID} = useParams()
  const [showPop, setShowPop] = useState(false)
  const [videoId, setVideoId] = useState(null)
  const {data: movie, error: movieError } = useFetchMediaDetails("movie", movieID)
  const {data: credits} = useFetchData(`movie/${movieID}/credits`)
  const {cast, crew} = credits
  const writers = crew?.filter(item => item.department === "Writing")
  const director = crew?.filter(item => item.job === "Director")
  const videos_endpoint = `movie/${movieID}/videos?language=fr-FR`
  const recommended_endpoint =  `movie/${movieID}/recommendations?adult=false`
  const similar_endpoint = `movie/${movieID}/similar?adult=false` 
  const {data: videos} = useFetchData(videos_endpoint)
  
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  function Skeleton() {
    return (
      <section className="media__skeleton skeleton__anim">
        <span className="skeleton-watch skeleton__anim"></span>
      </section>
    )
  }
  
  return (
    movie !== null && !movieError ?
    <section className="media" style={{backgroundImage: `url("${getImageUrl(movie?.backdrop_path)}")`}}>
      <section className="media__header">
        <div className="image__container">
          
          <div className={`video-play ${showPop ? "show-pop" : ""}`}>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`} 
                controls
            />
            <span 
                onClick={() => {
                  setShowPop(false)
                  setVideoId(null)
                }}
            >Close</span>
          </div>

          <Img 
              src={getImageUrl(movie?.poster_path) || noPoster} 
              className="movie__poster" 
              height="100%" 
              width="100%" 
              alt="poster"
              />
          <span 
              className="watch-trailer"
              onClick={() => {
                setVideoId(videos?.results.at(0).key)
                setShowPop(true)
              }}
            >Watch Trailer</span>
        </div>
        <section className="header__title">
          <h1 className="media__title">{movie?.title}</h1>
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
            <p>{dateFormat(movie?.release_date)}</p>
          </div>
          <div>
            <h1>Runtime:</h1>
            <p>{runtime(movie?.runtime)}</p>
          </div> 
        </div>
        <div className="media__writer">
          <p>Writer: </p>
          <div>
            {writers?.map((writer, index, tab) => <span key={writer.id}>{index === (tab.length - 1) ? `${writer.name}.` :  `${writer.name}, `} </span>)}
          </div>
        </div>
        <div className="media__director">
          <p>Director: </p>
          <p>{director?.map((director, index, tab) => <span key={director.id}>{index === (tab.length - 1) ? `${director.name}.` : `${director.name}, `}</span>)}</p>
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
        <VideosOfficials endpoint={videos_endpoint} />
      </section>
      {/* THE SECTION WHERE SOME IMAGES WILL BE DESPLAIED */}
      {/*<section className="media__images">
        <h1>Images</h1>
        <section className="images__carrousel slider">
          {images?.slice(0, 20)?.map(image => <Img src={getImageUrl(image.file_path) || poster} key={image.file_path} className="image slide" width="300px" height="200px" alt="movie image" />)}
        </section>
      </section>*/}
      <section className="similar">
        <Carrousel 
            mediaType="movie" 
            name="Similar" 
            showBtn={false} 
            endpoint={similar_endpoint} 
          />
      </section>
      <section className="recommended">
        <Carrousel 
            mediaType="movie"
            name="Recommendations" 
            showBtn={false} 
            endpoint={recommended_endpoint} 
          />
      </section>
    </section>
    :
    <section className="media-error-skeleton">
      <Skeleton />
      <ErrorMessage message={movieError?.message} error={movieError} />
    </section>
  )
}

export default Movie
