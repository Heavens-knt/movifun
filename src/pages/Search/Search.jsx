import styles from "../Discover/discover.module.css"
import Slide from "../../components/Carrousel/Slide.jsx"
import { useEffect, useState } from "react"
import {fetchData, getImageUrl} from "../../utils/api"
import { useParams } from "react-router-dom"

const Search = () => {
  const {query} = useParams()
  const [medias, setMedias] = useState([])
  const [searchPage, setSearchPage] = useState(1)
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
  
  const handleSearch = async (query, page) => {
    try {
      setLoading(true)
      const data = await fetchData(`/search/multi?query=${query}&language=fr-FR&adult=false&page=${page}`)
      setMedias(prev =>  [...prev ,...data.results]) 
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleSearch(query, searchPage)
  }, [query, searchPage])
 
  return (
    <section className={styles.discover} style={{backgroundImage:`url("${getImageUrl()}")`}}>
      {/* <section className={styles.header} > */}
      {/*   <h1 className={styles.title}>{mediaKind === "popular" ? "Popular" : "Top Rated" } {mediaType === "movie" ? "Movies" : "Tv Shows"}</h1> */}
      {/*   <form className={styles.discover__search}> */}
      {/*     <input placeholder={mediaType === "movie" ? "Movies" : "Series"} type="search" ref={searchRef} name="search" autoComplete="off" /> */}
      {/*     <button onClick={() => handleSearch(searchRef.current.value, "1")} type="button">Search</button> */}
      {/*   </form> */}
      {/* </section> */}
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
      { medias.length !== 0 && <button onClick={() => setSearchPage(prev => ++prev)} style={{paddingInline:"1.5rem", paddingBlock:"0.5rem", fontSize:"20px", color:"white", backgroundColor:"#112", borderRadius:"12px", fontWeight:"bold", border:"none"}}>{loading ? "Loading ..." : "Load More"}</button>}
    </section>
  )
}

export default Search
