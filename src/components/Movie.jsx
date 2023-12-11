import React from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";

const Movie = ({ movie, getSelectedMovieId, setId }) => {
  const MOVIE_IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  const movieRate = (Math.round(movie.vote_average * 100) / 100).toFixed(1);

  return (
    <div className="border-2 border-yellow-500 bg-white ">
      <Link to={`/movie/${movie.id}`}>
        <ul>
          <li onClick={() => setId(movie.id)}>
            <div className="flex md:flex-col items-center justify-center p-2 md:p-4 ">
              <div className="max-h-min ">
                  <img
                src={MOVIE_IMAGE_PATH + movie.poster_path}
                className="w-[20%] object-fill md:h-60  md:w-screen md:mb-4"
                alt=""
              />
              </div>
            

              <div className="w-[80%] md:w-full p-4 md:p-0 ">
                <p className="font-bold md:font-bold text-xl md:text-lg  mb-2 ">
                  {movie?.title}
                </p>
                <p className="line-clamp-3 text-sm font-Helvetica leading-4 mb-2 ">
                  {movie?.overview}
                </p>
                <p className="flex">
                  <span className="flex items-center w-5">
                    <StarIcon className="h-6 w-6 text-yellow-400" />
                  </span>
                  <span className="font-bold text-lg">
                    {movieRate}
                    <span className="text-sm font-normal text-gray-600">
                      /10
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </Link>
    </div>
  );
};

export default Movie;
