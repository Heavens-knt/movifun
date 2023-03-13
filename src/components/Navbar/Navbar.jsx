import { Link } from "react-router-dom"
import "./navbar.css"

const Navbar = ({navOpen, setNavOpen}) => {

  return (
    <section className={`navbar ${navOpen ? "navbar__active" : ""}`}>
      <ul>
        <li><Link to={`/discover/movie/popular`} onClick={() => setNavOpen(false)}>MOVIES</Link></li>
        <li><Link to={`discover/tv/popular`} onClick={() => setNavOpen(false)}>TVSHOW</Link></li>
      </ul>
      
    </section>
  )
}

export default Navbar
