import React, { useState, useEffect} from "react";
import "./css/movie.css";
import Popular from "../Item/Popular";
import Recommend from "../Item/Recommend";
import Upcoming from "../Item/Upcoming";
import TopRated from "../Item/TopRated";
import TodayShow from "../Item/TodayShow";
import Categories from "../Item/Categories";
import Poster from "../Item/Poster";
import Footer from "../Item/Footer";

const Movies = () => {
  return (
    <div
      className="main"
    >
      <Popular />
      <Recommend />
      <Upcoming />
      <TopRated />
      <TodayShow />
      <Categories />
      <Poster />
      <Footer />
    </div>
  );
};

export default Movies;
