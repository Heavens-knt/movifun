import { Link } from "react-router-dom"
import "./carrousel.css"
import Slide from "./Slide"

const Carrousel = ({ name, data , btnName, showBtn, mediaType, mediaKind}) => { 
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
    <section className="carrousel">
      <h1 className="carrousel__title">{name}</h1>
      <div className="carrousel__slider">
        {data ?  
          data?.map(item => <Slide key={item.id} mediaType={mediaType} mediaId={item.id} item={item}/>) 
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
      {showBtn ? <Link to={`/discover/${mediaType}/${mediaKind}`} className="carrousel__link">All {btnName}</Link> : ""}
    </section>
  )
}

export default Carrousel
