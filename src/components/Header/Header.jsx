import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import searchIcon from "../../assets/search.svg"
import './Header.css';

const Header = ({navOpen, toggleNav}) => {
  const [searchActive, setSearchActive] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
     setSearchValue(e.target.value)
  }
  const handleSeaech = (e) => {
    if(e.key === "Enter" && searchValue !== "") {
      navigate(`/search/${searchValue}`) 
      setSearchValue("")
    }   
  }
  return (
    <section className='header'>
      <section className='header-left'>
        <div className='hamburger' id={navOpen ? "active" : ""} onClick={() => toggleNav()}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link to={"/"} className="logo">MOVI<span className='bottom'>FUN</span></Link>
      </section>
      <div className='search header-right'>
        <input type="search" name="searc" onChange={handleChange} onKeyUp={handleSeaech} placeholder='search' value={searchValue}/>
      </div>
    </section>
  )
}

export default Header
