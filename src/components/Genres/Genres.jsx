import { useEffect, useState } from "react"
import { filterGenres } from "../../utils/filterGenres"

const Genres = ({ids}) => {
  const [allGenres, setAllGenres] = useState([])
  //const {data: allGenres, loading} = useFetchData("genre/movie/list", "genre")
  useEffect(() => {
    let ignore = false
    const fetchGenres = async () => {
      
      try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=2c1ed4bf51dc85df5af0cb15a8ee3bc5&language=fr-FR")
        const data = await response.json()
        if(!ignore) setAllGenres([...data.genres])
      } catch (error) {
        console.log(error)
      }
    }

    fetchGenres()

    return () => {
      ignore = true
    }
  }, [])

  const genres = filterGenres(allGenres, ids)
  
  return (
    <>
     {genres?.map((g, i) => <span key={i}>{g}</span>)} 
    </>
  )
}

export default Genres
