import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon } from "@heroicons/react/24/solid";

const MovieInfo = ({
  movie,
  addFavoriteHandler,
  addWatchList,
  removeFavoriteHandler,
  isAddToFavourite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const MOVIE_IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";
  // const DEFAULT_IMAGE_URL = `${MOVIE_IMAGE_PATH}${movie?.backdrop_path}`;
  // console.log("bbbbbbbb", movie?.backdrop_path);

  const backgroundImage = movie?.backdrop_path
    ? `${MOVIE_IMAGE_PATH}${movie?.backdrop_path}`
    : "";

  const releaseDate = movie?.release_date.split("-").at(0);

  const toHoursAndMinutes = (movieTime) => {
    const hours = Math.floor(movieTime / 60);
    const minutes = movieTime % 60;
    return { hours, minutes };
  };
  const { hours, minutes } = toHoursAndMinutes(movie?.runtime);

  const movieReleaseDate = movie?.release_date;

  const movieFormattedReleaseDate = movieReleaseDate
    ? new Date(movieReleaseDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : "";

  const userScore = Math.ceil(parseInt(movie?.vote_average * 10));
  const toggleFavorite = () => {
    addFavoriteHandler(movie?.id);
    setIsFavorite(!isFavorite);
    if (isFavorite) removeFavoriteHandler(movie?.id);
    console.log("isFavorite", isFavorite);
  };

  return (
    <div className="relative m-auto   h-screen my-5 md:my-10 ">
      {/* Navy overlay */}
      <div className="absolute h-full w-full inset-0 bg-navy  bg-opacity-60"></div>

      {/* Backdrop */}
      <div
        className="bg-cover bg-no-repeat bg-center h-full"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Text content */}
      <div className="absolute  inset-0 flex   text-white">
        <div className=" md:flex items-center justify-center rounded-lg p-20 hidden">
          <img
            src={MOVIE_IMAGE_PATH + movie?.poster_path}
            className="object-cover h-full w-full rounded-2xl"
            alt=""
          />
        </div>

        <div className="flex p-4  flex-col md:p-10 md:pt-52">
          <p className="font-bold  text-xl md:text-4xl tracking-wider mb-2 ">
            {movie?.title} <span className="font-normal">({releaseDate})</span>
          </p>
          <div className="flex mb-4 items-center flex-col md:gap-2 md:flex-row md:text-lg ">
            <span>{movieFormattedReleaseDate} </span> &nbsp;
            <p>{`${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`}</p>&nbsp;
            <span className="flex list-none md:gap-2 gap-1 text-sm md:text-lg ">
              {movie?.genres.map((genre) => (
                <li
                  key={genre.id}
                  className="after:last:content-none after:content-[',']"
                >
                  {genre.name}{" "}
                </li>
              ))}
              &nbsp;
            </span>{" "}
            &nbsp;
          </div>
          <div className="flex  items-center  w-60 ">
            {/* <div className=" items-center relative ">
              <div
                className={` border-2 p-6 rounded-full top-0 -left-1 w-2 h-2${
                 Number( userScore )<= 40
                    ? "border-red-500"
                    : userScore <= 60
                    ? "border-yellow-400"
                    : "border-green-500"
                }`}
              ></div>
              <span className="  w-6 h-6 p-6 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white ">
                {userScore}%
              </span>
            </div> */}
            {/* <div className="items-center relative">
                <div
                  className={`border-2 p-6 rounded-full top-1 left-0 w-2 h-2 absolute ${
                    Number(userScore) <= 40
                      ? "border-red-500"
                      : userScore <= 60
                      ? "border-yellow-400"
                      : "border-green-500"
                  }`}
                ></div>
                <span className="w-6 h-7 p-7 inline-flex items-center justify-center rounded-full bg-slate-700 text-white">
                  {userScore}%
                </span>
            </div> */}
            <div className="items-center relative mr-3 group">
              <div
                className={`border-4 p-5 rounded-full top-0  left-0 w-6 h-6 absolute ${
                  Number(userScore) <= 30
                    ? "border-red-500"
                    : userScore <= 50
                    ? "border-yellow-400"
                    : "border-green-500"
                }`}
              ></div>
              <span className="w-6 h-6 p-6 inline-flex items-center justify-center rounded-full bg-slate-700 text-white">
                {userScore}%
              </span>
              <div className="w-auto mx-auto rounded-md  px-4 py-2 bg-slate-700 text-white hidden absolute top-12 -left-5 group-hover:flex">
                User Score
              </div>
            </div>

            <div className="flex items-center gap-2 ">
              <button
                onClick={toggleFavorite}
                className="bg-slate-700 w-6 h-6  items-center justify-center rounded-full p-6 inline-flex relative group "
              >
                <div className="w-auto mx-auto rounded-md  px-4 py-2 bg-slate-700 text-white hidden absolute top-12 -left-5 group-hover:flex">
                  Add to Favourite
                </div>
                <HeartIcon
                  className={`cursor-pointer h-6 w-6 text-white absolute ${
                    isFavorite ? "text-red-800 " : ""
                  }`}
                />
              </button>
              <button
                onClick={() => addWatchList(movie?.id)}
                className="bg-slate-700 w-6 h-6  items-center justify-center rounded-full p-6 inline-flex relative group   "
              >
                <div className="w-auto mx-auto rounded-md  px-4 py-2 bg-slate-700 text-white hidden absolute top-12 -left-5 group-hover:flex">
                  Add to WatchList
                </div>
                <ListBulletIcon className="cursor-pointer h-6 w-6 text-white absolute" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
