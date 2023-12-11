import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

const Nav = ({ getMovieData }) => {
  const navItem = ["Popular", "Now Playing", "Top Rated", "Upcoming"];
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="bg-navy flex items-center justify-between py-4 px-24 shadow-lg ">
      <button className="md:hidden " onClick={() => setIsNavOpen(!isNavOpen)}>
        <Bars3Icon className="h-6 w-6 text-white" />
      </button>
      
      <div className="text-white">
        <h1>Logo</h1>
      </div>
      <ul className="md:flex items-center  gap-6  justify-between text-white hidden">
        {navItem.map((item) => (
          <li
            className={`cursor-pointer  relative  ${isNavOpen && ""}`}
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
      </ul>
      {/* DESKTOP MENU */}
      {isNavOpen && (
        <ul className="flex items-center justify-between text-white flex-col flex-wrap   md:hidden">
          {navItem.map((item) => (
            <li
              className="cursor-pointer  relative  w-full text-center"
              key={item}
            >
              <NavLink
                className=""
                name={item}
                to="#"
                onClick={(e) => getMovieData(e.target.name)}
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Nav;
