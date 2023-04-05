import Img from "../../components/lazyLoaderImage/Img"
import { useFetchData } from "../../hooks/useFetchData";
import ReactPlayer from "react-player/youtube";
import { useState } from "react";

const VideosOfficials = ({ endpoint }) => {
  
  const [showPop, setShowPop] = useState(false)
  const {data: videos, error} = useFetchData(endpoint)
  const [videoId, setVideoId] = useState(null)

  
  return (
    <section className="official__carrousel slider">
      {videos?.results?.map(video => ( 
        <div key={video.id} className="official__card slide">
          <div className={`video-play ${showPop ? "show-pop" : ""}`}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls />
            <span 
              onClick={() => {
                setVideoId(null)
                setShowPop(false)
              }}
            >Close</span>
          </div>
          <div className="official__image">
            <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} width="220px" height="120px" alt="official" />
            <span 
              className="official__player" 
              onClick={() => {
                  setShowPop(true)
                  setVideoId(video.key)
                }
              }
            >Play</span>       
          </div>
          <p className="official__title">{video.name}</p>
        </div>
      ))} 
    </section>
  )
}

export default VideosOfficials
