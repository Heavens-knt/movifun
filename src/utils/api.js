const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN
const BASE_URL = "https://api.themoviedb.org/3/"

const tmdbHeader = new Headers({
  'Authorization': 'Bearer ' + TMDB_TOKEN
})

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}/`, {headers: tmdbHeader})
    if (response.ok && response.status === 200) {
      const data = await response.json()
      return {error: null, data: data}; 
    } else {
      throw new Error("Resource not found !")
    }
    
  } catch (error) {
    return {error: error, data: null}
  }
}

const getImageUrl = (endpoint, size="w500") => `https://image.tmdb.org/t/p/${size}${endpoint}`

export {fetchData, getImageUrl, BASE_URL}
