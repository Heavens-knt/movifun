import "./cast.css"
import avatar from "../../assets/avatar.png"
import { getImageUrl } from "../../utils/api"
import Img from "../lazyLoaderImage/Img"


const Cast = ({cast}) => {
  
  return (
    <div key={cast.id} className="cast__card slide">
      <Img className="cast__image" src={getImageUrl(cast.profile_path) || avatar} height="150px" width="150px" alt="cast-image" />
      <p className="cast__name">{cast.character}</p>
      <p className="cast__original-name">{cast.name}</p>
    </div>
  )
}

export default Cast
