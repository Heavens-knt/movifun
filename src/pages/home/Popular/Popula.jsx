import Carrousel from "../../../components/Carrousel/Carrousel"
import { useFetchData } from "../../../hooks/useFetchData"

const Popula = ({tab}) => {
  const {data: movies, loading: moviesLoad} = useFetchData(`movie/${tab}?language=fr-FR`)
  const {data: series, loading: seriesLoad} = useFetchData(`tv/${tab}?language=fr-FR`)
  const movieName = tab === "popular" ? "Films populaires" : "films mieux notés"
  const tvName = tab === "popular" ? "Séries populaires" : "Séries mieux notées"
  return (
    <>
      <Carrousel mediaType="movie" mediaKind={tab} name={movieName}  btnName="Films" data={movies.results} showBtn={true}/>
      <Carrousel mediaType="tv" mediaKind={tab} name={tvName} btnName="Séries" data={series.results} showBtn={true}/>
    </>
  )
}

export default Popula
