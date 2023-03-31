import React, { useState } from 'react'
import {BrowserRouter ,Route, Routes } from 'react-router-dom'
import './App.css'
import Backdrop from './components/Backdrop/Backdrop'
import Discover from "./pages/Discover/Discover"
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/home/Home'
import Movie from './pages/movieDetails/Movie'
import Season from './pages/seasonDetails/Season'
import TvShow from './pages/tvDetails/TvShow'
import Search from './pages/Search/Search'
import NotFound from "./components/NotFound/NotFound"

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const toggleNav = () => setNavOpen(prev => !prev)
  return (
    <BrowserRouter>
      <Header 
        navOpen={navOpen} 
        toggleNav={toggleNav} 
      />
      <Navbar 
        navOpen={navOpen} 
        setNavOpen={setNavOpen} 
      />
      <Backdrop 
        navOpen={navOpen} 
        setNavOpen={setNavOpen} 
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:movieID' element={<Movie />} />
        <Route path='/tv/:mediaId' element={<TvShow />} />
        <Route path='/tv/:mediaId/season/:season_number' element={<Season />} />
        <Route path='/discover/:mediaType/:mediaKind' element={<Discover />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
