import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Cast = () => {
  const { id, name } = useParams();

  const creditAPI = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US%27`;
  const [cast, setCast] = useState([]);
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const [slidesPerView, setSlidesPerView] = useState(5);

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

  const castFunc = async () => {
    try {
      if (creditAPI.length !== 0) {
        const fetchData = await fetch(creditAPI);
        const responseData = await fetchData.json();

        if (responseData.cast !== undefined) {
          const castData = responseData.cast;
          setCast(castData);
        }
      }
    } catch (err) {
      return err.message;
    }
  };

  useEffect(() => {
    castFunc();
  }, [name]);

  return (
    <>
      {cast.length === 0 ? (
        <div></div>
      ) : (
        <div className="cast_content">
          <div className="cast_title lg:w-52 md:w-full">
            <h2>Top Cast's</h2>
          </div>

          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={10}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="cast_swiper"
          >
            {cast &&
              cast.map((items) => (
                <SwiperSlide className="cast_list" key={items.id}>
                  <Link to={`/credit/${items.id}/${items.name}`}>
                    {items.profile_path !== null ? (
                      <div>
                        <img
                          src={imgUrl + items.profile_path}
                          alt={items.name}
                        />
                      </div>
                    ) : (
                      <div className="not_found">
                        <p>No Available</p>
                      </div>
                    )}
                    <p className="text-center">{items.original_name}</p>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Cast;
