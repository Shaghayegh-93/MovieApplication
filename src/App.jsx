import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Movielist from "./components/Movielist";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import MovieInfo from "./components/MovieInfo";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [isloading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [favorite, setFavorite] = useLocalStorage({
    key: "Favorite",
    initialState: [],
  });
  const [watchList, setWatchList] = useLocalStorage({
    key: "WatchList",
    initialState: [],
  });

  const [movie, setMovie] = useState(null);
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  let url = BASE_URL + "/movie/popular?api_key=" + API_KEY;
  const [navUrl, setNavUrl] = useState(url);
  const [id, setId] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchSerachData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          BASE_URL + `/search/movie?query=${search}&api_key=` + API_KEY,
          { signal }
        );

        setMovieList(data.results);
        
      } catch (error) {
        console.error("Error fetching movie list:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSerachData();
    return () => {
      controller.abort();
    };
  }, [search]);

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
    const isAlreadyFavorite = favorite.some(
      (fav) => fav.id === Number(movieId)
    );
    if (isAlreadyFavorite) return;
    const favoriteMovie = movieList.find((fav) => fav.id === Number(movieId));
    setFavorite((prev) => setFavorite([...prev, favoriteMovie]));
  };
  const removeFavoriteHandler = (id) => {
    const updatedFavorites = favorite.filter(
      (movie) => movie.id !== Number(id)
    );
    setFavorite(updatedFavorites);
  };
  const removeWatchListHandler = (id) => {
    const updatedWatchlist = watchList.filter(
      (movie) => movie.id !== Number(id)
    );
    setWatchList(updatedWatchlist);
  };
  const addWatchList = (movieId) => {
    const isAlreadyWatchList = favorite.some(
      (fav) => fav.id === Number(movieId)
    );
    if (isAlreadyWatchList) return;
    const watchMovie = movieList.find((movie) => movie.id === Number(movieId));
    setWatchList((prev) => setWatchList([...prev, watchMovie]));
  };

  return (
    <div className="">
      <Nav
        getMovieData={getMovieData}
        search={search}
        setSearch={setSearch}
        favorite={favorite}
        watchList={watchList}
        removeFavoriteHandler={removeFavoriteHandler}
        removeWatchListHandler={removeWatchListHandler}
      />
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
