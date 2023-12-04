import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navmenu from './components/Navmenu';
import Home from './components/Home';
import Movies from './components/Movies';
import NotFound from './components/NotFound';
import MovieDetail from './MovieDetail/MovieDetail';
import Login from './auth/login';
import Person from "./person/Person"
import MovieRecommend from './recommend/MovieRecommend';
import SeriesDetail from './SeriesDetail/SeriesDetail';
import SeriesRecommend from './recommend/SeriesRecommend';
import MovieCategory from './pages/MovieCategory';
const App = () => {
  return (
     <BrowserRouter>
        <Navmenu />
         <Routes>
             <Route path = "/" element = {<Home />} />
             <Route path = "/" element = {<Movies />} />
             <Route path = "*" element = {<NotFound />} />
             <Route path = "/movies/:id/:name" element = {<MovieDetail />} />
             <Route path = "/series/:id/:name" element = {<SeriesDetail />} />
             <Route path = "/auth-success/login-to-account" element = {<Login />} />
             <Route path="/credit/:id/:name" element = {<Person />}/>
             <Route path="/entertainment/recommendation/:id/:name" element = {<MovieRecommend />}/>
             <Route path="/tv-shows/recommendation/:id/:name" element = {<SeriesRecommend />}/>
             <Route path="/categories/:id/:name" element = {<MovieCategory />}/>
         </Routes>
     </BrowserRouter>
  )
}

export default App