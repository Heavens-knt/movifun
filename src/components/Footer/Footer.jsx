import { Link } from "react-router-dom"
import "./footer.css"

const Footer = () => {
  
  return (
    <div className="footer">
      <section className="footer-about">
        Notre site dédié aux films et séries TV est votre destination idéale pour découvrir les dernières sorties, les acteurs, les réalisateurs, les critiques et bien plus encore. Nous nous appuyons sur la base de données de Themoviedb pour vous offrir des informations précises et complètes. Parcourez notre site pour découvrir les programmes les plus intéressants.
      </section>
      <section className="footer-socials">
        <Link to={"#"}><img src="/asserts/socials/facebook.svg" alt="facebook-icon" /></Link> 
        <Link to={"#"}><img src="/asserts/socials/github.svg" alt="github-icon" /></Link> 
        <Link to={"#"}><img src="/asserts/socials/twitter.svg" alt="twitter-icon" /></Link> 
        <Link to={"#"}><img src="/asserts/socials/tiktok.svg" alt="tiktok-icon" /></Link> 
        <Link to={"#"}><img src="/asserts/socials/youtube.svg" alt="youtube-icon" /></Link>
        <Link to={"#"}><img src="/asserts/socials/linkedin.svg" alt="linkedin" /></Link>
      </section>

      <section className="footer-copyright">
        Created by <span className="footer-creator">Knt Bukenya Celeste</span> &copy; 2023 All right reserved
      </section>
    </div>
  )
}

export default Footer
