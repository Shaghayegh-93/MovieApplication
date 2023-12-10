import React from "react";

const MovieInfo = ({ movie }) => {

  console.log("movieeeee:", movie);
  const MOVIE_IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const backgroundImage = movie?.backdrop_path
    ? `${MOVIE_IMAGE_PATH}${movie?.backdrop_path}`
    : "";

  const releaseDate = movie?.release_date.split("-").at(0);
  console.log(releaseDate);
  //

  return (
 
    <div className="relative m-auto h-screen my-10 ">
      {/* Navy overlay */}
      <div className="absolute h-full w-full inset-0 bg-navy bg-opacity-80"></div>

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
        <div className="p-10 pt-28">
          <p className="font-bold  text-xl md:text-4xl tracking-wider mb-2 ">
            {movie?.title} <span className="font-normal">({releaseDate})</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default MovieInfo;
