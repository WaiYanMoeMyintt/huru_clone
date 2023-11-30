import React from "react";
import "./css/categories.css";
import right from "../assets/right.svg";
import { Link } from "react-router-dom";
import { films } from "../data/Flim";
import { motion } from "framer-motion";
const Categories = () => {
  return (
    <div className="huru_categories">
      <div className="huru_title">
        <h2>Choose the types of Films You liked</h2>
      </div>

      <div className="film_list">
        {films.map((items) => (
          <Link
            to={`/categories/${items.id}/${items.title}`}
            className="film_information"
            key={items.d}
          >
            <motion.div
              whileHover={{ scale: 1, rotate: 10 }}
              whileTap={{
                scale: 0.8,
                x: 0,
                y: 0,
                rotate: 2,
                borderRadius: "100%",
              }}
            >
              <div className="film_control">
                <div className="icon">
                  <img
                    src={items.name}
                    alt={items.name}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="info">
                  <h3>{items.title}</h3>
                  <p>{items.items}+</p>
                </div>
              </div>
              <div className="flex film-link justify-center items-center mt-3 gap-3">
                <button>View More</button>
                <img src={right} width={20} height={20} alt="right" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="explore">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link to="/categories">Explore Categories</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
