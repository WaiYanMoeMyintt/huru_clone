import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/results.css";
import { motion, useScroll } from "framer-motion";
import error from "../assets/error.png";
const Results = () => {
  const { id, name } = useParams();
  const api = `https://api.themoviedb.org/3/search/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&query=${name}`;
  const posterURL = "https://image.tmdb.org/t/p/w500";
  const [result, setResults] = useState([]);
  useEffect(() => {
    const searchMovies = async () => {
      try {
        const startFetch = await fetch(api);
        const responseData = await startFetch.json();
        setResults(responseData.results);
      } catch (err) {
        return err.message;
      }
    };
    searchMovies();
  }, [name]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="result_control">
      <div className="result_title">
        <h2>Result for: {name}</h2>
      </div>
      {result.length !== 0 ? (
        <div className="results_content">
          {result.map((items, index) => (
            <div className="detail_results">
              {items.poster_path !== null ? (
                <motion.div
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: index * 0.6,
                    ease: "easeInOut",
                    duration: 0.5,
                  }}
                  viewport={{ amount: 0 }}
                  key={items.id}
                >
                  <Link to={`/movies/${items.id}/${items.original_title}`}>
                    <img
                      src={posterURL + items.poster_path}
                      alt={items.original_title}
                      className="rounded-lg"
                    />
                  </Link>
                </motion.div>
              ) : (
                <div className="not_found text-white">
                  <h2>Unavailable</h2>
                </div>
              )}
              <p>{items.release_date.slice(0, 4)}</p>
              <h1>{items.original_title}</h1>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex rounded-md items-center py-12 px-4 justify-center mt-12 flex-1  h-1/3 ">
          <img src={error} alt={"404 error"} />
        </div>
      )}
    </div>
  );
};

export default Results;
