import React from "react";
import { Link } from "react-router-dom";

const Movielist = ({ movieList }) => {
    console.log(movieList)
    const MOVIE_IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="grid grid-cols-6 gap-4">
      {movieList?.map((movie) => {
        return (
          //   <Link key={movie.id} to="/">
          <ul>
            <li>
              <img src={MOVIE_IMAGE_PATH+movie.poster_path} alt="" />
              <p>{movie.title}</p>
            </li>
          </ul>
          //   </Link>
        );
      })}
    </div>
  );
};

export default Movielist;
