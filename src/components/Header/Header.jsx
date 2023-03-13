import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({navOpen, toggleNav}) => {
  return (
    <section className='header'>
      <Link to={"/"} className="logo">MOVIFUN</Link>
      <div className='hamburger' id={navOpen ? "active" : ""} onClick={() => toggleNav()}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  )
}

export default Header
