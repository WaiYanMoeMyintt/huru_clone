import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import "./index.css";
const Person = () => {
  const { id, name } = useParams();
  //default  web page name
  document.title = name;
  const creditMovies = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=1b7c076a0e4849aeefd1f3c429c99a36`;
  const personAPI = `https://api.themoviedb.org/3/person/${id}?api_key=1b7c076a0e4849aeefd1f3c429c99a36`;


  // Set the essential image path
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  const [person, setPerson] = useState([]);
  const [credit, setCredit] = useState([]);
  const { scrollYProgress } = useScroll();
 // Use formattedName instead of the original name
  const creditNames = credit.map((item) => item.original_title);
  const formattedNames = creditNames.map((name) => name.replaceAll('%20', '-').split(" ").join("-"));
  // fetch the personal information data
  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const requestPerson = await fetch(personAPI);
        const responseData = await requestPerson.json();
        setPerson(responseData);
      } catch (err) {
        return err.message;
      }
    };
    fetchPerson();
  }, [personAPI]);

  // fetch the creditMovies Data
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requestPerson = await fetch(creditMovies);
        const responseData = await requestPerson.json();
        setCredit(responseData.cast);
      } catch (err) {
        return err.message;
      }
    };
    fetchMovies();
  }, [credit]);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <main>
      <article className="person_content flex flex-wrap flex-col justify-start relative">
        <div className="left_person w-full">
          {person && (
            <img src={imgUrl + person.profile_path} alt={person.name} />
          )}
        </div>
        <div className="right_person">
          {person && (
            <div key={person.id} className="biography">
              <h3>{person.name}</h3>
              <h5>Biography</h5>
              <p>{person.biography}</p>
            </div>
          )}
        </div>
      </article>

      <div className="cast_information">
        <div className="left_info">
          <div className="person_title">
            <h3>Credit Information</h3>
          </div>
          <div className="name personal">
            <h5>Original Name</h5>
            <p>{person.name}</p>
          </div>
          <div className="gender personal">
            <h5>Gender</h5>
            {person && person.gender === 1 ? <p>Female</p> : <p>Male</p>}
          </div>
          <div className="birthday personal">
            <h5>Birthday</h5>
            <p>{person.birthday}</p>
          </div>
          {person && person.deathday === null ? (
            <div className="hidden"></div>
          ) : (
            <div className="deathday personal">
              <h5>DeathDay</h5>
              <p>{person.deathday}</p>
            </div>
          )}
          <div className="birth_place personal">
            <h5>Birth of Place</h5>
            <p>{person.place_of_birth}</p>
          </div>
        </div>
        <div className="right_info">
          <div className="acting_title">
            <h3>Known for {person.name} characters</h3>
          </div>

          <div className="acting_content">
            {credit &&
              credit.map((movies, index) => (
                <Link
                  to={`/movies/${movies.id}/${formattedNames[index]}`}
                  className="acting_movies"
                  key={movies.id}
                  target="_blank"
                >
                  {movies.poster_path === null &&
                  movies.backdrop_path === null ? (
                    <div className="not_availabile">
                      <p>Not Availabile</p>
                    </div>
                  ) : (
                    <motion.div
                      className="acting_movies"
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        delay: index * 0.55,
                        ease: "easeInOut",
                        duration: 0.5,
                      }}
                      viewport={{ amount: 0 }}
                    >
                      <img
                        src={
                          imgUrl + (movies.poster_path || movies.backdrop_path)
                        }
                        className="rounded-lg"
                      />
                      <p>{movies.original_title}</p>
                    </motion.div>
                  )}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Person;
