import Carrousel from "../../../components/Carrousel/Carrousel"
import { useFetchData } from "../../../hooks/useFetchData"

const Popula = ({tab}) => {
  const {data: movies, loading: moviesLoad} = useFetchData(`movie/${tab}?language=fr-FR`)
  const {data: series, loading: seriesLoad} = useFetchData(`tv/${tab}?language=fr-FR`)
  const movieName = tab === "popular" ? "Popular Movies" : "Top Rated Movies"
  const tvName = tab === "popular" ? "Polular Tv Shows" : "Top Rated Tv Shows"
  return (
    <>
      <Carrousel mediaType="movie" mediaKind={tab} name={movieName}  btnName="Movies" data={movies.results} showBtn={true}/>
      <Carrousel mediaType="tv" mediaKind={tab} name={tvName} btnName="Tv Shows" data={series.results} showBtn={true}/>
    </>
  )
}

export default Popula
