import "./movie.css"
import poster from "../../assets/backdrop.jpg"
import Img from "../../components/lazyLoaderImage/Img"
import Carrousel from "../../components/Carrousel/Carrousel"
import Genres from "../../components/Genres/Genres"
import { useFetchData } from "../../hooks/useFetchData"
import {useFetchMediaDetails} from "../../hooks/useFetchMediaDetails"
import { getImageUrl } from "../../utils/api"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { dateFormat, runtime } from "../../utils/dateFormat"
import backdrop_img from "../../assets/backdrop.jpg"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"

const Movie = () => {
  const {movieID} = useParams()
  const {data: movie,loading: movieLoading, error: movieError } = useFetchMediaDetails("movie", movieID)
  const {data: similar} = useFetchData(`movie/${movieID}/similar`)
  const {data: credits, loading, error} = useFetchData(`movie/${movieID}/credits`)
  const {cast, crew} = credits
  const {data: recommended} = useFetchData(`movie/${movieID}/recommendations`)
  const {data: videos} = useFetchData(`movie/${movieID}/videos`)
  const writers = crew?.filter(item => item.department === "Writing")
  const director = crew?.filter(item => item.job === "Director")
   
 
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
          <Img src={getImageUrl(movie?.poster_path) || poster} className="movie__poster" height="100%" width="100%" alt="poster"/>
          <span className="watch-trailer">Watch Trailer</span>
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
            {writers?.map(w => <span key={w.id}>{w.name}, </span>)}
          </div>
        </div>
        <div className="media__director">
          <p>Director: </p>
          <p>{director?.map(item => <span key={item.id}>{item.name}</span>)}</p>
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
              {movie?.production_countries.map(country => <p>{country.name}</p>)}
          </div>
        </div>
      </section>
      <section className="media__cast">
        <h1>Cast</h1>
        <section className="cast__corrousel slider">
          {cast?.map(c => (
            <div key={c.id} className="cast__card slide">
              <Img className="cast__image" src={getImageUrl(c.profile_path) ||poster} height="150px" width="150px" alt="cast-image" />
              <p className="cast__name">{c.character}</p>
              <p className="cast__original-name">{c.name}</p>
            </div>
          ))}
        </section>
      </section>
      <section className="official__videos">
        <h1>official videos</h1>
        <section className="official__carrousel slider">
          {videos?.results?.map(video => (
            <div key={video.id} className="offucial__card slide">
              <div className="official__image">
                <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} width="220px" height="120px" alt="official" />
                <span className="official__player">Play</span>       
              </div>
            <p className="official__title">{video.name}</p>
          </div>))} 
        </section>
      </section>
      {/* THE SECTION WHERE SOME IMAGES WILL BE DESPLAIED */}
      {/*<section className="media__images">
        <h1>Images</h1>
        <section className="images__carrousel slider">
          {images?.slice(0, 20)?.map(image => <Img src={getImageUrl(image.file_path) || poster} key={image.file_path} className="image slide" width="300px" height="200px" alt="movie image" />)}
        </section>
      </section>*/}
      <section className="similar">
        <Carrousel mediaType="movie" name="Similar" data={similar.results} showBtn={false} />
      </section>
      <section className="recommended">
        <Carrousel mediaType="movie" name="Recommendations" data={recommended.results} showBtn={false} />
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
