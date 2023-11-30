import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import menu_scale from "../assets/menu_scale.svg";
import search from "../assets/search.svg";
import { navLinks } from "../data";
import "./css/nav.css";

// Create a context
const NavContext = createContext();

const Navmenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <NavContext.Provider value={{ open, setOpen }}>
      <nav className="relative">
        <Nav />
        <div className={!open ? "nav_menu_active" : "nav_menu_active nav_active"}>
          <Nav />
          <div className="menu_active_holder">
            <form>
              <input
                type="search"
                name="search"
                placeholder="Search movies or series..."
              />
              <button>
                <img src={search} alt="search" />
              </button>
            </form>
            <ul>
              {navLinks.map((links, index) => (
                <li key={index}>
                  <Link to={`/${links.name}`}>{links.name}</Link>
                </li>
              ))}
            </ul>
            <div className="login">
              <button>Login</button>
            </div>
          </div>
        </div>
      </nav>
    </NavContext.Provider>
  );
};

const Nav = () => {
  const { open, setOpen } = useContext(NavContext);

  return (
    <div className="nav_holder flex flex-1 justify-between items-center">
      <div className="nav_logo">
        <Link to="/">huru</Link>
      </div>
      <div className="nav_hamburger">
        <img
          onClick={() => setOpen((toggle) => !toggle)}
          className="cursor-pointer"
          src={menu_scale}
          alt="menu"
        />
      </div>
    </div>
  );
};

export default Navmenu;
