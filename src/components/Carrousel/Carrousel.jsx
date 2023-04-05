import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useFetchData } from "../../hooks/useFetchData"
import "./carrousel.css"
import Slide from "./Slide"

const Carrousel = ({ name, btnName, showBtn, mediaType, mediaKind, endpoint}) => { 
  
  const reference = useRef()

  const {data , error} = useFetchData(endpoint)

  useEffect(() => {
    reference.current.scrollTo(0,0)
  }, [])

  const Skeleton = () => {
    return (
      <section className="slide__skeleton">
        <div className="image__skeleton skeleton__anim">
          <div className="ring__skeleton"></div>
        </div>
        <p className="title__skeleton skeleton__anim"></p>
        <p className="release__skeleton skeleton__anim"></p>
      </section>
    )
  }

  return (
    <section ref={reference} className="carrousel">
      <h1 className="carrousel__title">{name}</h1>
      <div className="carrousel__slider">
        {data && !error ?  
          data?.results?.map(item => <Slide key={item.id} mediaType={mediaType} mediaId={item.id} item={item}/>) 
          : 
          <>
            <Skeleton />    
            <Skeleton />    
            <Skeleton />    
            <Skeleton />    
            <Skeleton />    
          </>
        }
      </div>
      {showBtn ? <Link to={`/discover/${mediaType}/${mediaKind}`} className="carrousel__link">Plus de {btnName}</Link> : ""}
    </section>
  )
}

export default Carrousel
