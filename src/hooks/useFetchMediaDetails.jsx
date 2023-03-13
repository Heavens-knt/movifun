import {useEffect, useState} from "react"
import { fetchData } from "../utils/api.js"

const useFetchMediaDetails = (mediaType, id) => {
  const [data, setData] = useState()
  useEffect(() => {
    let ignore = false
    const getData = async () => {
      try {
        const data = await fetchData(`${mediaType}/${id}?language=fr-FR`)               
        if(!ignore) setData(data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
    
    return () => {
      ignore = true
    }
    
  }, [mediaType, id])

  return data
}

export {useFetchMediaDetails}
