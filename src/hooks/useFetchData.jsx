import {useState, useEffect} from "react"
import {fetchData} from "../utils/api.js"

const useFetchData = (endpoint, page=1) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    const getData = async (endpoint) => {
      try {
        const data = await fetchData(endpoint)
        if(!ignore) setData(data)
        setLoading(false)
      } catch (error) {
        setLoading(true)
      }
    } 

    getData(endpoint)

    return () => {
      ignore = true
    }

  }, [endpoint, page])
  
  return {data, loading};
}

export {useFetchData}
