import { Link } from "react-router-dom"
import "./footer.css"

const Footer = () => {
  
  return (
    <div className="footer">
      <section className="footer-about">
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.
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
