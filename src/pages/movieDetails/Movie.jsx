import "./movie.css"
import poster from "../../assets/backdrop.jpg"
import Img from "../../components/lazyLoaderImage/Img"
import Carrousel from "../../components/Carrousel/Carrousel"
import Genres from "../../components/Genres/Genres"
import { useFetchData } from "../../hooks/useFetchData"
import {useFetchMediaDetails} from "../../hooks/useFetchMediaDetails"
import { getImageUrl } from "../../utils/api"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { dateFormat, runtime } from "../../utils/dateFormat"

const Movie = () => {
  const {movieID} = useParams()
  const [images, setImages] = useState()
  const movie = useFetchMediaDetails("movie", movieID)
  const {data: similar} = useFetchData(`movie/${movieID}/similar`)
  const {data, loading} = useFetchData(`movie/${movieID}/credits`)
  const {cast, crew} = data
  const {data: recommended} = useFetchData(`movie/${movieID}/recommendations`)
  const {data: videos} = useFetchData(`movie/${movieID}/videos`)
  const writers = crew?.filter(item => item.department === "Writing")
  const director = crew?.filter(item => item.job === "Director")
   

  useEffect(() => {
    let ignore = false 
    
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/images?api_key=2c1ed4bf51dc85df5af0cb15a8ee3bc5`)
        const data = await response.json()
        const {posters} = data
        if(!ignore) setImages(posters)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()

    return () => {
      ignore = true
    }
  }, [movieID])
   

  function Skeleton() {
    return (
      <section className="media__skeleton skeleton__anim">
        <span className="skeleton-watch skeleton__anim"></span>
      </section>
    )
  }
  return (
    <section className="media" style={{backgroundImage: `url("${getImageUrl(movie?.backdrop_path)}")`}}>
      {movie !== undefined ?
      <>
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
      <section className="media__images">
        <h1>Images</h1>
        <section className="images__carrousel slider">
          {images?.slice(0, 20)?.map(image => <Img src={getImageUrl(image.file_path) || poster} key={image.file_path} className="image slide" width="300px" height="200px" alt="movie image" />)}
        </section>
      </section>
      <section className="similar">
        <Carrousel mediaType="movie" name="Similar" data={similar.results} showBtn={false} />
      </section>
      <section className="recommended">
        <Carrousel mediaType="movie" name="Recommendations" data={recommended.results} showBtn={false} />
      </section>
      </> :

      <Skeleton />
    }
    </section>
  )
}

export default Movie
