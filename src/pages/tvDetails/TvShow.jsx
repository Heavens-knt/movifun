import "../movieDetails/movie.css"
import poster from "../../assets/backdrop.jpg"
import Img from "../../components/lazyLoaderImage/Img"
import Carrousel from "../../components/Carrousel/Carrousel"
import { useFetchData } from "../../hooks/useFetchData"
import {useFetchMediaDetails} from "../../hooks/useFetchMediaDetails"
import { getImageUrl } from "../../utils/api"
import { Link, useParams } from "react-router-dom"
import { dateFormat, runtime } from "../../utils/dateFormat"

const TvShow = () => {

  const {mediaId} = useParams()
  const movie = useFetchMediaDetails("tv", mediaId)
  const {data: similar} = useFetchData(`tv/${mediaId}/similar?language=fr-FR`)
  const {data: casts} = useFetchData(`tv/${mediaId}/credits?language=fr-FR`)
  const {data: recommended} = useFetchData(`tv/${mediaId}/recommendations?language=fr-FR`)
  const {data: videos} = useFetchData(`tv/${mediaId}/videos?language=fr-FR`)
  const { crew, cast } = casts
  const writers = crew?.filter(item => item.department === "Writing" || item.known_for_department === "Writing")
  const director = crew?.filter(item => item.job === "Director")
  
  return (
    <section className="media" style={{backgroundImage: `url("${getImageUrl(movie?.backdrop_path)}")`}}>
      <section className="media__header">
        <div className="image__container"> 
          <Img src={getImageUrl(movie?.poster_path) || poster} className="movie__poster" height="100%" width="100%" alt="poser"/>
          <span className="watch-trailer">Watch Trailer</span>
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
            {writers?.map(w => <span key={w.id}>{w.name}, </span>)}
          </div>
        </div>
        <div className="media__director">
          <p>Director: </p>
          <p>{director?.map(item => <span key={item.id}>{item.name}</span>)}</p>
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
            <Link to={`/tv/${mediaId}/season/${season.season_number}`} key={season.id} className="season_slide slide">
              <Img className="season__image" src={ getImageUrl(season.poster_path) || poster} width="180px" height="250px" alt="season Image" />
              <div className="season__title">
                <p>{season.name}</p>
                <button className="season__btn">More Info</button>
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
      {/*<section className="media__images">
        <h1>Images</h1>
        <section className="images__carrousel slider">
          {images?.posters.slice(0, 20)?.map(image => <Img src={getImageUrl(image.file_path) || poster} key={image.file_path} className="image slide" width="300px" height="200px" alt="movie image" />)}
        </section>
      </section>*/}
      <section className="similar">
        <Carrousel mediaType="tv" name="Similar" data={similar.results} showBtn={false} />
      </section>
      <section className="recommended">
        <Carrousel mediaType="tv" name="Recommendations" data={recommended.results} showBtn={false} />
      </section>
    </section>
  )
}

export default TvShow
