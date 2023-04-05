import Carrousel from "../../../components/Carrousel/Carrousel"

const Trending = () => {
  const endpoint = "trending/all/day?language=fr-FR"
  const name = "Trending"
  return (
    <section className="home__trending">
      <Carrousel name={name} btnName={name} showBtn={false} mediaType="trending/all/day" endpoint={endpoint}/>
    </section>
  )
}

export default Trending
