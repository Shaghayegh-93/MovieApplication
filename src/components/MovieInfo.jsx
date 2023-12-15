import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

const MovieInfo = ({ movie }) => {
  // const[id,selectedId]=useState(null)
  console.log("movieeeee:", movie);
  const MOVIE_IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const backgroundImage = movie?.backdrop_path
    ? `${MOVIE_IMAGE_PATH}${movie?.backdrop_path}`
    : "";

  const releaseDate = movie?.release_date.split("-").at(0);
  console.log(releaseDate);

  const toHoursAndMinutes = (movieTime) => {
    const hours = Math.floor(movieTime / 60);
    const minutes = movieTime % 60;
    return { hours, minutes };
  };
  const { hours, minutes } = toHoursAndMinutes(movie?.runtime);
  console.log(hours, minutes);
  const movieReleaseDate = movie?.release_date;
  const movieFormattedReleaseDate = movieReleaseDate
    ? new Date(movieReleaseDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "";
  const userScore = Math.ceil(parseInt(movie?.vote_average * 10));

  return (
    <div className="relative m-auto h-screen my-10 ">
      {/* Navy overlay */}
      <div className="absolute h-full w-full inset-0 bg-navy  bg-opacity-60"></div>

      {/* Backdrop */}
      <div
        className="bg-cover bg-no-repeat bg-center h-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Text content */}
      <div className="absolute  inset-0 flex   text-white">
        <div className=" flex items-center justify-center rounded-lg p-10">
          <img
            src={MOVIE_IMAGE_PATH + movie?.poster_path}
            className="object-cover h-full w-full rounded-2xl"
            alt=""
          />
        </div>

        <div className="flex  flex-col p-10 pt-28">
          <p className="font-bold  text-xl md:text-4xl tracking-wider mb-2 ">
            {movie?.title} <span className="font-normal">({releaseDate})</span>
          </p>
          <div className="flex mb-2">
            <span>{movieFormattedReleaseDate} &nbsp;</span> &bull; &nbsp;
            <p>{`${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`}</p> &nbsp;
            &bull; &nbsp;
            <span className="flex list-none gap-2 ">
              {movie?.genres.map((genre) => (
                <li
                  key={movie.id}
                  className="after:last:content-none after:content-[',']"
                >
                  {genre.name}{" "}
                </li>
              ))}
              &nbsp;
            </span>{" "}
            &nbsp;
          </div>
          <div className="flex  items-center ">
            {" "}
            <span className=" w-6 h-6 p-7  inline-flex items-center justify-center rounded-full bg-yellow-500 text-white ">
              {userScore}%
            </span>
            <button className="bg-slate-700 w-6 h-6  items-center justify-center rounded-full p-6 inline-flex relative ">
              <HeartIcon class="h-6 w-6 text-white absolute " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
//  w-6 h-6 p-7  inline-flex items-center justify-center rounded-full
