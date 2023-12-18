import React from "react";
import error from "../assets/error.png";
import { useParams } from "react-router-dom";
const NotFound = () => {
  const { id, name } = useParams();
  document.title = name;
  return (
    <div className="error_page flex flex-col items-center justify-center w-full h-full">
      <img src={error} alt="error" />
      <p className="text-center  px-4 py-2 lg:text-2xl md:text-base leading-8 tracking-wider break-words font-bold text-white">
        404.That's and error. The requested URL /doesn't exit was not found on
        this server.
      </p>
    </div>
  );
};

export default NotFound;
