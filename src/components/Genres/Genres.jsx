import { useEffect, useState } from "react"
import { fetchData } from "../../utils/api"
import { filterGenres } from "../../utils/filterGenres"

const Genres = ({ids}) => {
  const [allGenres, setAllGenres] = useState([])
  useEffect(() => {
    let ignore = false
    const fetchGenres = async () => { 
      try {
        const {data, error} = await fetchData("genre/movie/list")
        if(!ignore && data) { 
          setAllGenres([...data.genres])
        } else {
          throw new Error(error.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchGenres()

    return () => {
      ignore = true
    }
  }, [ids])

  const genres = filterGenres(allGenres, ids)
  
  return (
    <>
     {genres?.map((g, i) => <span key={i}>{g}</span>)} 
    </>
  )
}

export default Genres
