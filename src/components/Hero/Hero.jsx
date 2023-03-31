import "./hero.css"
import Genres from "../Genres/Genres"
import { getImageUrl } from "../../utils/api.js"
import poster from "../../assets/backdrop.jpg"
import {dateFormat} from "../../utils/dateFormat"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Hero = ({hero}) => {
    const [overview, setOverview] = useState("")
    let [counter, setCounter] = useState(-1)
    const [isActive, setIsActive] = useState(false)
    console.log(hero.overview, hero.overview.length, hero.release_date)
    const isMovie = Object.getOwnPropertyDescriptor(hero, "release_date")


    const gptWriting = (text, setCounter, setOverview) => {
           
      const timer = setInterval(() => {
        setOverview(prev => `${prev}${text.at(counter)}`)
        setCounter(counter += 1)
        
        if (counter == text.length) {
          clearInterval(timer)
        }
      }, 20)
    }
     
    useEffect(() => {
      setTimeout(() => {
        setIsActive(true)
        gptWriting(hero?.overview, setCounter, setOverview)
      }, 1000)
    }, [])

    return (
    <section className="hero" style={{backgroundImage: `url(${ getImageUrl(hero?.backdrop_path, "original") || poster})`}}>
      <div className="hero__center">
        <h1 className={`hero__title ${isActive? "hero__active" : ""}`}>{hero?.title}</h1>
        <div className={`hero__genre ${isActive ? "hero__active" : ""}`}>
          {<Genres ids={hero?.genre_ids} />}
        </div>
        <p className={`hero__overview ${isActive ? "hero__active" : ""}`}>{overview}</p>
        <div className={`hero__release ${isActive ? "hero__active" : ""}`}>
          Sortie: <span>{dateFormat(hero?.release_date)}</span>
        </div>
        <Link to={isMovie !== undefined ? `/movie/${hero.id}` : `/tv/${hero.id}`} className="hero__link">Plus d'info</Link>
      </div>  
    </section>
  )
}

export default Hero
