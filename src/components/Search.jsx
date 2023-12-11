import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import search from "../assets/search.svg";
import "./css/results.css";
const Search = () => {
  const navLinks = [
    {
      id: 1,
      name: "Movies",
    },
    {
      id: 2,
      name: "Series",
    },
    {
      id: 3,
      name: "Categories",
    },
  ];

  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const searchMoviesData = (e) => {
    e.preventDefault();
    navigate(`/search_results/${searchValue}`);
  };

  return (

    // for desktop
    <div className="nav_holder nav_large_content hidden lg:flex justify-between items-center">
      <div className="nav_logo">
        <Link to="/">huru</Link>
      </div>
      <div className="nav_right_content">
        <div className="nav_links_content">
          {navLinks.map((links, index) => (
            <ul key={index}>
              <Link to={`/${links.name}`}>{links.name}</Link>
            </ul>
          ))}
        </div>
        <form onSubmit={searchMoviesData} className="menu_form">
          <input
            type="text"
            placeholder="Search movies or series..."
            value={searchValue}
            onChange={(e)=> setSearchValue(e.target.value)}
          />
          <button onClick={searchMoviesData} type="submit">
            <img src={search} alt="search" />
          </button>
        </form>
        <Link
          onClick={() => setOpen((toggle) => !toggle)}
          to="/auth-success/login-to-account"
          className="login"
        >
          <button className="login_content">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Search;
