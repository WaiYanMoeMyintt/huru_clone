import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { motion, useScroll } from "framer-motion";
const MovieCategory = () => {
  const { id, name } = useParams();
  const api = `https://api.themoviedb.org/3/discover/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&with_genres=${id}`;
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use formattedName instead of the original name
  const resultNames = movies.map((item) => item.original_title);
  const formattedNames = resultNames.map((name) => name.replaceAll('%20', '-').split(" ").join("-"));

  useEffect(() => {
    const movieCategories = async () => {
      try {
        const fetchData = await fetch(api);
        const response = await fetchData.json();
        setLoading(false);
        setMovies(response.results);
      } catch (err) {
        return err.message;
      } finally {
        setLoading(true);
      }
    };
    movieCategories();
  }, [api]); // Remove 'movies' from the dependency array to avoid unnecessary re-renders
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="movie_content_control relative">
      <div className="movie_title">
        <h2>Huru best {name} Films</h2>
      </div>

      <div className="movies_content relative">
        {movies.map((items,index) => (
          <div key={items.id}>
            {loading !== true ? (
              <div className="loading_effect"></div>
            ) : (
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: index * 0.4,
                  ease: "easeInOut",
                  duration: 0.5,
                }}
                viewport={{ amount: 0 }}
              >
                <Link key = {index} to={`/movies/${items.id}/${formattedNames[index]}`}>
                  <img
                    src={imgUrl + items.poster_path}
                    alt={items.original_title}
                  />
                  <p>{items.original_title}</p>
                </Link>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="banner w-100 flex justify-center items-center text-center">
        <p>End of the results.</p>
      </div>
    </div>
  );
};

export default MovieCategory;
