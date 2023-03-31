import {useState, useEffect} from "react"
import {fetchData} from "../utils/api.js"

const useFetchData = (endpoint, page=1) => {
  const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN
  const BASE_URL = "https://api.themoviedb.org/3/"

  const tmdbHeader = new Headers({
    'Authorization': 'Bearer ' + TMDB_TOKEN
  })

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    const getData = async (endpoint) => {
      try {
        //const data = await fetchData(endpoint)
        const response = await fetch(`${BASE_URL}${endpoint}`, {headers: tmdbHeader})
        const data = await response.json()

        if(!ignore) {
          setData(data)
          setLoading(false)
          setError(null)
        }
      } catch (error) {
        setData([])
        setLoading(true)
        setError(error)
      }
    } 

    getData(endpoint)

    return () => {
      ignore = true
    }

  }, [endpoint, page])
  
  return {data, loading, error};
}

export {useFetchData}
