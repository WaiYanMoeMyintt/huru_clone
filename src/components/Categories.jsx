import React from "react";
import "./css/categories.css";
import { Link } from "react-router-dom";
import { explore } from "./data/film";
import { motion, useScroll } from "framer-motion";
const Categories = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="explore_content">
      <div className="explore_title">
        <h2>Explore Flims Categories</h2>
      </div>
      <div className="explore_control">
        {explore.map((items,index) => (
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
            key={items.id}
          >
            <Link to={`/categories/${items.id}/${items.name}`}>
              <img src={items.poster} alt={items.name} />
            </Link>
            <p>{items.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
