import React from "react";
import Movie from "./Movie";

const Movielist = ({
  movieList,
  getSingleMovie,
  id,
  setId,
}) => {


  return (
    <div className="grid grid-cols-1  md:grid-cols-5 gap-6 md:p-24 p-2">
      {movieList?.map((movie) => {
        return (
          <Movie
            movie={movie}
            key={movie.id}
            getSingleMovie={getSingleMovie}
            id={id}
            setId={setId}
          />
        );
      })}
    </div>
  );
};

export default Movielist;
