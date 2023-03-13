import Carrousel from "../../../components/Carrousel/Carrousel"
import { useFetchData } from "../../../hooks/useFetchData"

const Trending = () => {
  const {data: trendings, loading} = useFetchData("trending/all/day")
  const name = "Trending"
  return (
    <section className="home__trending">
      <Carrousel name={name} btnName={name} data={trendings.results} showBtn={false} mediaType="trending/all/day"/>
    </section>
  )
}

export default Trending
