import React, { useState, useEffect, useRef } from "react";
import Movies from "./Movies";
import "./css/home.css";
import left from "../assets/arrow-left.svg";
import right from "../assets/arrow-right.svg";
import { Link } from "react-router-dom";
import { Button, Carousel } from "flowbite-react";

const Home = () => {
  const api =
    "https://api.themoviedb.org/3/movie/upcoming?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US&page=1";
  const imageBanner = "https://image.tmdb.org/t/p/original/";
  const [banner, setBanner] = useState([]);
  const [current, setCurrent] = useState(0);
  // Use formattedName instead of the original name
const resultNames = banner.map((item) => item.original_title);
const formattedNames = resultNames.map((name) => name.replaceAll('%20', '-').split(" ").join("-"));
  //Home Banner အတွက် API Setup လုပ်ခြင်း
  useEffect(() => {
    const homeBanner = async (url) => {
      try {
        const fetchAPI = await fetch(url);
        const resData = await fetchAPI.json();
        const results = resData.results.slice(0, 5);

        setBanner(results);
      } catch (err) {
        console.error(err.message);
      }
    };
    homeBanner(api);
  }, []);

 
  return (
    <>
      <div
        className="h-screen sm:h-64 xl:h-screen 2xl:h-96 home_banner "
     
      >
        <Carousel slideInterval={5000}>
          {banner.map((movies, index) => (
            <section key={index}>
              <img
                className="home_flyer w-full"
                src={imageBanner + movies.poster_path}
                alt={movies.original_title}
              />
              <div className="home_banner_content">
                <p className="release">{movies.release_date.slice(0, 4)}</p>
                <h1>{movies.original_title}</h1>
                <div className="overview">
                  <p>{movies.overview}</p>
                </div>
                <div key = {index} className="list">
                  <Link
                    className="watch_now"
                    to={`/movies/${movies.id}/${formattedNames[index]}`}
                  >
                    Watch Now
                  </Link>
                  <Link className="add_list">Add to List</Link>
                </div>
              </div>
            </section>
          ))}
        </Carousel>
      </div>
      <Movies />
    </>
  );
};

export default Home;
