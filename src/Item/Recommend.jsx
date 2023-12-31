import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./css/index.css";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";

const Recommend = () => {
  const api =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US&page=1";
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const [popular, setPopular] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(5);
  const [load, setLoad] = useState(false);

// Use formattedName instead of the original name
const resultNames = popular.map((item) => item.original_title);
const formattedNames = resultNames.map((name) => name.replaceAll('%20', '-').split(" ").join("-"));


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(5);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPopular(data.results);
        setLoad(true);
      } catch (error) {
        return error.message;
      }
    };

    fetchData(api);
  }, []);

  let loadArr = [];
  for (let i = 1; i < 6; i++) {
    loadArr.push(i);
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div
      className="content_list relative"
    >
      <div className="content_title">
        <h2>Editor's Choice</h2>
      </div>
      {!load ? (
        <div className="loading">
          {loadArr.map((number, index) => (
            <div className="loading_item" key={index}></div>
          ))}
        </div>
      ) : (
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={20}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper content_swiper"
        >
          {popular.map((items, index) => (
            <SwiperSlide key={items.id}>
              <motion.div    variants={variants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: index * 0.6,
                    ease: "easeInOut",
                    duration: 0.5,
                  }}
                  viewport={{ amount: 0 }}>
              <Link to={`/movies/${items.id}/${formattedNames[index]}`}>
                <div className="poster">
                  <img
                    src={imgUrl + items.poster_path}
                    alt={items.original_title}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                  <p className="vote">{items.vote_average}</p>
                </div>
                <div className="detail">
                  <div className="detail_info">
                    <p>{items.release_date.slice(0, 4)}</p>
                  </div>
                  <div className="detail_title">
                    <h2>{items.original_title}</h2>
                  </div>
                </div>
              </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Recommend;
