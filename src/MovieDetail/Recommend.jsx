import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./movieDetail.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Recommend = () => {
  const { id, name } = useParams();
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const movieRecommendAPI = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=1b7c076a0e4849aeefd1f3c429c99a36`;

  const [recommend, setRecommend] = useState([]);
// Use formattedName instead of the original name
const resultNames = recommend.map((item) => item.original_title);
const formattedNames = resultNames.map((name) => name.replaceAll('%20', '-').split(" ").join("-"));

  const recommendFunc = async () => {
    try {
      if (movieRecommendAPI.length !== 0) {
        const fetchData = await fetch(movieRecommendAPI);
        const responseData = await fetchData.json();
        setRecommend(responseData.results);
      }
    } catch (err) {
      return err.message;
    }
  };
  useEffect(() => {
    recommendFunc();
  }, []);

  return (
    recommend.length === 0 ? (<div></div>) : (
      <div className="recommend_content">
        <div className="recommend_title">
          <h2>If you like {name} then try,</h2>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper popular_swiper"
        >
          {recommend.map((items,index) => (
            <SwiperSlide key={items.id}>
              <Link target="_blank" to={`/entertainment/recommendation/${items.id}/${formattedNames[index]}`}>
                <div className="poster">
                  <img src={imgUrl + items.poster_path} alt={items.original_title} />
                  <p className="vote">{Math.round(items.vote_average * 10) / 10}</p>
                </div>
                <div className="detail">
                  <div className="detail_info">
                    <p>{items.release_date.slice(0, 4)}</p>
                  </div>
                  <div className="detail_title">
                    <h1>{items.original_title}</h1>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  );
};

export default Recommend;