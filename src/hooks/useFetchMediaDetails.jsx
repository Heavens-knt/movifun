import {useEffect, useState} from "react"
import { fetchData } from "../utils/api.js"

const useFetchMediaDetails = (mediaType, id) => {
  const [data, setData] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error, setError] = useState(null) 
  
  useEffect(() => {
    let ignore = false
    const getData = async () => {
      try {
        const {data, error} = await fetchData(`${mediaType}/${id}?language=fr-FR`)               
        if(!ignore && data) {
          setData(data)
          setError(null)
          setLoading(false)
          console.log(data)
        }
        setError(error)
        setLoading(true)
        console.log(error)
      } catch (error) {
        setLoading(true)
        setError(error)
        setData(null)
      }
    }

    getData()
    
    return () => {
      ignore = true
    }
    
  }, [mediaType, id])

  return {data, error, loading}
}

export {useFetchMediaDetails}
