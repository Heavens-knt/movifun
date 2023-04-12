import styles from "./discover.module.css"
import Slide from "../../components/Carrousel/Slide.jsx"
import { useEffect, useState } from "react"
import {fetchData, getImageUrl} from "../../utils/api"
import { useParams } from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import Loading from "../../components/Loading/Loading"

const Discover = () => {
  const {mediaType, mediaKind} = useParams()
  const [medias, setMedias] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
    
    const getData = async (page) => {
      try {
        setLoading(true)
        const {data, error} = await fetchData(`${mediaType}/${mediaKind}?page=${page}&language=fr-FR`)
        if(!ignore && data) {
          console.log(data)
          setLoading(false)
          setMedias(pre => [...pre, ...data.results])
        } else{
          setError(error)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setError(error)
      }
  }

    getData(page)
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
        <h1 className={styles.title}> {mediaType === "movie" ? "Films" : "Séries"} {mediaKind === "popular" ? "Populaires" : mediaType === "movie" ? "mieux notés" : "mieux notées" }</h1>

      </section>
        { medias.length !== 0 && !error ? 
            
            <section className={styles.slider}>
               {medias?.map(media => <Slide item={media} mediaId={media.id} key={media.id}/>)}
            </section>
            :
            <section className={styles.skeleton} >
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <ErrorMessage message={error?.message} error={error}/>
            </section>
        }
      { medias.length !== 0 && loading ? <Loading /> : <button onClick={handleClick} style={{paddingInline:"1.5rem", paddingBlock:"0.5rem", fontSize:"20px", color:"white", backgroundColor:"#112", borderRadius:"12px", fontWeight:"bold", border:"none"}}>Load More</button>}
    </section>
  )
}

export default Discover
