import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Movielist from "./components/Movielist";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import MovieInfo from "./components/MovieInfo";

function App() {
  const [isloading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  console.log(movieList);
  const [favorite, setFavorite] = useState([]);
  const [watchList, setWatchList] = useState([]);
  console.log("favorite", favorite);

  const [movie, setMovie] = useState(null);
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  let url = BASE_URL + "/movie/popular?api_key=" + API_KEY;
  const [navUrl, setNavUrl] = useState(url);
  const [id, setId] = useState(null);
  console.log("id", id);

  // let single = BASE_URL + `/movie/${id}`;
  const addToFavorite = () => {
    const favoriteMovie = movieList.find((movie) => movie.id).includes(id);
    setFavorite(favoriteMovie);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(navUrl);

        setMovieList(data.results);
      } catch (error) {
        console.error("Error fetching movie list:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [navUrl]);
  useEffect(() => {
    async function getSingleMovie() {
      try {
        const { data } = await axios.get(
          BASE_URL + `/movie/${id}?api_key=` + API_KEY
        );
        setMovie(data);
        //  setIsLoadingCurrentHotel(false);
      } catch (error) {
        //  toast.error(error.message);
        //  setIsLoadingCurrentHotel(false);
      }
    }
    if (id) getSingleMovie(id);
  }, [id]);

  const getMovieData = (movieType) => {
    console.log(movieType);
    if (movieType === "Popular") {
      url = BASE_URL + "/movie/popular?api_key=" + API_KEY;
    }
    if (movieType === "Now Playing") {
      url =
        BASE_URL +
        "/movie/now_playing?language=en-US&page=1&api_key=" +
        API_KEY;
    }
    if (movieType === "Top Rated") {
      url =
        BASE_URL + "/movie/top_rated?language=en-US&page=1&api_key=" + API_KEY;
    }
    if (movieType === "Upcoming") {
      url =
        BASE_URL + "/movie/upcoming?language=en-US&page=1&api_key=" + API_KEY;
    }

    setNavUrl(url);
  };
  const addFavoriteHandler = (movieId) => {
    const isAlreadyFavorite = favorite.some((fav) => fav.id === Number(movieId));
    if (isAlreadyFavorite) return;
    const favoriteMovie = movieList.find((fav) => fav.id === Number(movieId));
    setFavorite((prev) => setFavorite([...prev, favoriteMovie]));
  };
   const addWatchList = (movieId) => {
     const isAlreadyWatchList = favorite.some(
       (fav) => fav.id === Number(movieId)
     );
     if (isAlreadyWatchList) return;
     const watchMovie = movieList.find((movie) => movie.id === Number(movieId));
     setWatchList((prev) => setWatchList([...prev, watchMovie]));
   };
  // const isAddToFavorites = favorite?.map((fav) => fav.id).includes(id);

  return (
    <div className="">
      <Nav getMovieData={getMovieData} />
      <Routes>
        <Route
          path="/"
          index
          element={<Movielist movieList={movieList} id={id} setId={setId} />}
        />
        <Route
          path="/movie/:id"
          element={
            <MovieInfo
              movie={movie}
              addFavoriteHandler={addFavoriteHandler}
              addWatchList={addWatchList}
              // isAddToFavorites={isAddToFavorites}
              // isAlreadyFavorite={isAlreadyFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
