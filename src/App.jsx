import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navmenu from './components/Navmenu';
import Home from './components/Home';
import Movies from './components/Movies';
import NotFound from './components/NotFound';
import MovieDetail from './MovieDetail/MovieDetail';
const App = () => {
  return (
     <BrowserRouter>
        <Navmenu />
         <Routes>
             <Route path = "/" element = {<Home />} />
             <Route path = "/" element = {<Movies />} />
             <Route path = "*" element = {<NotFound />} />
             <Route path = "/movies/:id/:name" element = {<MovieDetail />} />
         </Routes>
     </BrowserRouter>
  )
}

export default App