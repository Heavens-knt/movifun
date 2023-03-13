import { useState, useEffect } from "react"
import Footer from "../../components/Footer/Footer"
import Hero from "../../components/Hero/Hero"
import { useFetchData } from "../../hooks/useFetchData"
import "./home.css"
import Popula from "./Popular/Popula"
import Trending from "./Trending/Trending"

const Home = () => {
  const [tab, setTab] = useState("popular")
  
  const {data: hero, loading } = useFetchData("trending/all/day?language=fr-FR")
  const Skeleton = () => {
    const [firstParaWidth, setFirstParaWidth] = useState(80)
    const [secParaWidth, setSecParaWidth] = useState(50)
    const [thirdParaWidth, setThirdParaWidth] = useState(90)
    useEffect(() => {
      setInterval(() => {
        setFirstParaWidth(Math.floor(Math.random() * 30) + 60)
      }, 2000)
      
      setInterval(() => {
        setSecParaWidth(Math.floor(Math.random() * 30) + 25)
      }, 2000)
      
      setInterval(() => {
        setThirdParaWidth(Math.floor(Math.random() * 20) + 70)
      }, 2000)

    }, [])

    return (
      <div className="hero__skeleton">
        <div className="skeleton__center">
        <h1 className="head skeleton__anim"> </h1>
        <div className="genre">
          <div className="skeleton__anim"></div>
          <div className="skeleton__anim"></div>
          <div className="skeleton__anim"></div>
        </div>
        <div className="overview">
          <p className="skeleton__anim"></p>
          <p className="skeleton__anim"></p>
          <p className="skeleton__anim"></p>
          <p className="skeleton__anim"></p>
          <p style={{width: `${firstParaWidth}vw`}} className="skeleton__anim"></p>
          <p style={{width: `${thirdParaWidth}vw`}} className="skeleton__anim"></p>
          <p style={{width: `${secParaWidth}vw`}} className="skeleton__anim"></p>
        </div>
        <p className="release skeleton__anim"></p>
        <button className="link skeleton__anim"></button>
          
        </div>
      </div>
    )
  }


  return (
    <section className="Home">
      {!loading ? 
        <>
          <Hero hero={hero?.results?.at(0)} />
          <Trending/>
          <section className="home__media">
            <div className="home__media__top">
              <button onClick={() => setTab("popular")} className={`btn ${tab === "popular" ? "active__tab" : ""}`} >Popular</button>
              <button onClick={() => setTab("top_rated")}className={`btn ${tab === "top_rated" ? "active__tab" : ""}`}>Top Rated</button>
            </div>
            <Popula tab={tab}/>
            <Footer />
          </section>
       </> : <Skeleton />
      }
    </section>
  )
}

export default Home
