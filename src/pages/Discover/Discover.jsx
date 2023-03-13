import styles from "./discover.module.css"
import Slide from "../../components/Carrousel/Slide.jsx"
import { useEffect, useRef, useState } from "react"
import {fetchData, getImageUrl} from "../../utils/api"
import { useParams } from "react-router-dom"

const Discover = () => {
  const {mediaType, mediaKind} = useParams()
  const [medias, setMedias] = useState([])
  const [page, setPage] = useState(1)
  const [backdrop, setBackdrop] = useState("")
  const [search, setSearch] = useState(false)
  const [searchPage, setSearchPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef()


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
      const data = await fetchData(`${mediaType}/${mediaKind}?language=fr-FR&page=${page}`)
      if(!ignore) {
        setBackdrop(data.results.at(0).backdrop_path)
        setMedias(pre => [...pre, ...data.results])
      }
      setLoading(false)
    }

    getData()
    return () => {
      ignore = true
    }
  }, [page, mediaType, mediaKind])
  
  const handleSearch = async (query, page) => {
    setMedias([])
    const data = await fetchData(`/search/${mediaType}?query=${query}&language=fr-FR&adult=false&page=${page}`)
    if (data.results !== []) {
      setMedias(prev =>  [...prev ,...data.results])
      setSearch(true)
      setLoading(false)
      console.log(medias)
    }
  }

  const handleClick = () => {
    if (search) {
      setSearchPage(prev => ++prev)
      handleSearch(searchRef.current.value, searchPage)
      setLoading(true)
    } else {
      setPage(prev => ++prev)
      setLoading(true)
    }
  }
  
 
  return (
    <section className={styles.discover} style={{backgroundImage:`url("${getImageUrl(backdrop)}")`}}>
      <section className={styles.header} >
        <h1 className={styles.title}>{mediaKind === "popular" ? "Popular" : "Top Rated" } {mediaType === "movie" ? "Movies" : "Tv Shows"}</h1>
        <form className={styles.discover__search}>
          <input placeholder={mediaType === "movie" ? "Movies" : "Series"} type="search" ref={searchRef} name="search" autoComplete="off" />
          <button onClick={() => handleSearch(searchRef.current.value, "1")} type="button">Search</button>
        </form>
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
