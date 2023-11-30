import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navmenu from './components/Navmenu';
import Home from './components/Home';
import Movies from './components/Movies';
import NotFound from './components/NotFound';
const App = () => {
  return (
     <BrowserRouter>
        <Navmenu />
         <Routes>
             <Route path = "/" element = {<Home />} />
             <Route path = "/" element = {<Movies />} />
             <Route path = "*" element = {<NotFound />} />
         </Routes>
     </BrowserRouter>
  )
}

export default App