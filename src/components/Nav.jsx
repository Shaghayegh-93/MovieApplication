import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  TrashIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

import { Link, NavLink, useLocation } from "react-router-dom";
import Modal from "./Modal";

const Nav = ({
  getMovieData,
  search,
  setSearch,
  favorite,
  watchList,
  removeFavoriteHandler,
  removeWatchListHandler,
}) => {
  const navItem = ["Popular", "Now Playing", "Top Rated", "Upcoming"];
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isMovielistRoute = location.pathname === "/";

  return (
    <nav className="bg-navy   py-4 md:px-24 px-8 shadow-lg ">
      <div className="flex items-center justify-between">
        <div className="text-white ">
          <Link to="/">
            <h1 className="font-bold text-lg">Logo</h1>
          </Link>
        </div>
        <div>
        
          {isMovielistRoute && (
            <input
              type="text"
              placeholder="Search movies..."
              onChange={(e) => setSearch(e.target.value)}
              className="py-3 px-4 rounded-lg text-slate100 bg-slate500 text-base hidden md:inline-block"
            />
          )}
        </div>

        <ul
          className={`md:flex md:items-center md:justify-between absolute md:static bg-navy z-50  md:z-auto left-0 w-full md:w-auto pl-9 md:pl-0 transition-all duration-500 ease-in md:gap-6 text-white md:pb-0 pb-2  ${
            isNavOpen ? "top-14" : "top-[-490px]"
          } `}
        >
          {navItem.map((item) => (
            <li
              className={`cursor-pointer relative md:my-0 my-4  ${
                isNavOpen && ""
              }`}
              key={item}
            >
              <NavLink
                className="transition-all ease-in-out duration-300 after:content-[''] after:w-full after:h-[2px]  after:bg-white after:absolute after:left-0 after:bottom-[-8px] after:opacity-0 hover:after:opacity-100 "
                name={item}
                to="#"
                onClick={(e) => getMovieData(e.target.name)}
              >
                {item}
              </NavLink>
            </li>
          ))}
          <li>
            <Favorites
              favorite={favorite}
              removeFavoriteHandler={removeFavoriteHandler}
            />{" "}
          </li>
          <li>
            <WatchList
              watchList={watchList}
              removeWatchListHandler={removeWatchListHandler}
            />{" "}
          </li>
        </ul>
        <button className="md:hidden " onClick={() => setIsNavOpen(!isNavOpen)}>
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>
      </div>
    </nav>
  );
};

export default Nav;

function Favorites({ favorite, removeFavoriteHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {favorite?.map((movie) => (
          <div
            className="flex items-center justify-between mb-4"
            movie={movie}
            key={movie.id}
          >
            <div>
              <p>{movie?.title}</p>
            </div>
            <button onClick={() => removeFavoriteHandler(movie.id)}>
              <TrashIcon className="w-6 h-6 text-rose-500" />
            </button>
          </div>
        ))}
      </Modal>
      <button onClick={() => setIsOpen((is) => !is)} className="relative  ">
        <HeartIcon className="w-8 h-8 text-red-600" />
        <span className="absolute text-xs top-0 -right-2 h-4 leading-4 text-center bg-red-600 text-white rounded-full   py-2 px-[5px]  flex items-center justify-center">
          {favorite?.length}
        </span>
      </button>
    </>
  );
}

function WatchList({ watchList, removeWatchListHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {watchList?.map((movie) => (
          <div
            className="flex items-center justify-between mb-4"
            movie={movie}
            key={movie.id}
          >
            <div>
              <p>{movie.title}</p>
            </div>
            <button onClick={() => removeWatchListHandler(movie.id)}>
              <TrashIcon className="w-6 h-6 text-rose-500" />
            </button>
          </div>
        ))}
      </Modal>
      <button onClick={() => setIsOpen((is) => !is)} className="relative ">
        <ListBulletIcon className="w-8 h-8 text-red-600" />
        <span className="absolute text-xs top-0 -right-2 h-4 leading-4 text-center bg-red-600 text-white rounded-full   py-2 px-[5px]  flex items-center justify-center">
          {watchList.length}
        </span>
      </button>
    </>
  );
}
