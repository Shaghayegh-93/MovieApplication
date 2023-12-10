import React from "react";
import Movie from "./Movie";

const Movielist = ({
  movieList,
  getSelectedMovieId,
  getSingleMovie,
  id,
  setId,
}) => {


  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-2">
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
