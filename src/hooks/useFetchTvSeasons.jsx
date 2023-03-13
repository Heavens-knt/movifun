import {useState, useEffect} from "react"
import { fetchData } from "../utils/api"


function useFetchTvSeasons(tvId, totalSeasons) {
  const [seasons, setSeasons] = useState([])
  useEffect(() => {
    let ignore = false
    const fetchSeasons = async () => {
      try {
        for (let index = 0; index < totalSeasons; index++) {
          const season = await fetchData(`tv/${tvId}/season/${index}`)
          setSeasons(prev => [prev, ...season])
        } 
      } catch (error) {
        console.log(error)
      }
    }

    fetchSeasons()

    return () => {
      ignore = true
    }
  }, [tvId])

  return seasons
}

export {useFetchTvSeasons}
