import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

const Nav = ({ getMovieData }) => {
  const navItem = ["Popular", "Now Playing", "Top Rated", "Upcoming"];
  const [isNavOpen, setIsNavOpen] = useState(false);
  console.log(isNavOpen);

  return (
    <nav className="bg-navy w-full   py-4 md:px-24 px-2 shadow-lg ">
      <div className="md:flex md:items-center md:justify-between">
        <div className="text-white ">
          <h1>Logo</h1>
        </div>

        <ul className="md:flex md:items-center md:justify-between absolute md:static bg-navy z-[-1] md:z-auto left-0 md:gap-6 text-white md:pb-0 pb-12 ">
          {navItem.map((item) => (
            <li
              className={`cursor-pointer relative md:my-0 my-7 ${isNavOpen && ""}`}
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
        <button className="md:hidden " onClick={() => setIsNavOpen(!isNavOpen)}>
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>

        {/* DESKTOP MENU */}

        {/* {isNavOpen && (
          <ul className="md:flex items-center justify-between text-white flex-col flex-wrap hidden  ">
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
        <button className="md:hidden " onClick={() => setIsNavOpen(!isNavOpen)}>
          <Bars3Icon className="h-6 w-6 text-white" />
        </button>
      // </div> */}
      </div>
    </nav>
  );
};

export default Nav;
