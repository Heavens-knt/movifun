import styles from "./discover.module.css"
import Slide from "../../components/Carrousel/Slide.jsx"
import { useEffect, useRef, useState } from "react"
import {fetchData, getImageUrl} from "../../utils/api"
import { useParams, useNavigate } from "react-router-dom"

const Discover = () => {
  const {mediaType, mediaKind} = useParams()
  const [medias, setMedias] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)


  const Skeleton = () => {
    return (
      <section className="slide__skeleton">
        <div className="image__skeleton skeleton__anim">
          <div className="ring__skeleton skeleton__anim"></div>
        </div>
        <p className="title__skeleton skeleton__anim"></p>
        <p className="release__skeleton skeleton__anim"></p>
      </section>
    )
  }


  useEffect(() => {
    let ignore = false
    
    const getData = async () => {
      try {
        const data = await fetchData(`${mediaType}/${mediaKind}?language=fr-FR&page=${page}`)
        if(!ignore) {
          setMedias(pre => [...pre, ...data.results])
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
  }

    getData()
    return () => {
      ignore = true
    }
  }, [page, mediaType, mediaKind])
  
  const handleClick = () => {
    setPage(prev => ++prev)
    setLoading(true)
  }
  
 
  return (
    <section className={styles.discover} style={{backgroundImage:`url("${getImageUrl()}")`}}>
      <section className={styles.header} >
        <h1 className={styles.title}>{mediaKind === "popular" ? "Popular" : "Top Rated" } {mediaType === "movie" ? "Movies" : "Tv Shows"}</h1>
      </section>
      <section className={styles.slider} >
        { medias.length !== 0 ? 
            medias?.map(media => <Slide item={media} mediaId={media.id} key={media.id}/>)
            :
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
        }
      </section>
      { medias.length !== 0 && <button onClick={handleClick} style={{paddingInline:"1.5rem", paddingBlock:"0.5rem", fontSize:"20px", color:"white", backgroundColor:"#112", borderRadius:"12px", fontWeight:"bold", border:"none"}}>{loading ? "Loading ..." : "Load More"}</button>}
    </section>
  )
}

export default Discover
