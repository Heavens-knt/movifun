import Carrousel from "../../../components/Carrousel/Carrousel"

const Popula = ({tab}) => {
  const movie_endpoint = `movie/${tab}?language=fr-FR` 
  const serie_endpoint = `tv/${tab}?language=fr-FR`
  const movieName = tab === "popular" ? "Films populaires" : "films mieux notés"
  const tvName = tab === "popular" ? "Séries populaires" : "Séries mieux notées"
  return (
    <>
      <Carrousel mediaType="movie" mediaKind={tab} name={movieName}  btnName="Films" showBtn={true} endpoint={movie_endpoint}/>
      <Carrousel mediaType="tv" mediaKind={tab} name={tvName} btnName="Séries" showBtn={true} endpoint={serie_endpoint}/>
    </>
  )
}

export default Popula
