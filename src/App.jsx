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
    const [isFavorite, setIsFavorite] = useState(false);

  const [movieList, setMovieList] = useState([]);
  const [favorite, setFavorite] = useLocalStorage({
    key: "Favorite",
    initialState: [],
  });
  console.log("favorite", favorite);
  const [watchList, setWatchList] = useLocalStorage({
    key: "WatchList",
    initialState: [],
  });

  const [movie, setMovie] = useLocalStorage({
    key: "Movie",
    initialState: null,
  });
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  let url = BASE_URL + "/movie/popular?api_key=" + API_KEY;
  const [navUrl, setNavUrl] = useState(url);
  const [id, setId] = useLocalStorage({
    key: "Id",
    initialState: null,
  });

  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   async function fetchSerachData() {
  //     try {
  //       setIsLoading(true);
  //       const { data } = await axios.get(
  //         BASE_URL + `/search/movie?query=${search}&api_key=` + API_KEY,
  //         { signal }
  //       );

  //       setMovieList(data.results);

  //       // setSearch("");
  //       // setMovieList(movieList);
  //     } catch (error) {
  //       console.error("Error fetching movie list:", error);
  //       //  if (!axios.isCancel()) {
  //       //   setMovieList([]);}
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchSerachData();
  //   return () => {
  //     controller.abort();
  //   };
  // }, [search]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const { data } = await axios.get(navUrl);

  //       setMovieList(data.results);
  //     } catch (error) {
  //       console.error("Error fetching movie list:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, [navUrl]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);

        let url = BASE_URL + "/movie/popular?api_key=" + API_KEY;

        if (search) {
          url = BASE_URL + `/search/movie?query=${search}&api_key=` + API_KEY;
        }
        setNavUrl(url);
        const { data } = await axios.get(navUrl, { signal });

        setMovieList(() => {
          // If search is empty, replace the previous movie list with the new results
          // Otherwise, merge the results with the previous movie list
          return search ? data.results : data.results || [];
        });
      } catch (error) {
        if (!axios.isCancel(error)) {
          setMovieList([]);
          console.log("Error fetching movie list:", error);
          //  toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [search]);

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
    if (id) getSingleMovie(Number(id));
  }, [id]);

  // const getMovieData = (movieType) => {
  //   if (movieType === "Popular") {
  //     url = BASE_URL + "/movie/popular?api_key=" + API_KEY;
  //   }
  //   if (movieType === "Now Playing") {
  //     url =
  //       BASE_URL +
  //       "/movie/now_playing?language=en-US&page=1&api_key=" +
  //       API_KEY;
  //   }
  //   if (movieType === "Top Rated") {
  //     url =
  //       BASE_URL + "/movie/top_rated?language=en-US&page=1&api_key=" + API_KEY;
  //   }
  //   if (movieType === "Upcoming") {
  //     url =
  //       BASE_URL + "/movie/upcoming?language=en-US&page=1&api_key=" + API_KEY;
  //   }

  //   setNavUrl(url);
  // };
  const getMovieData = async (movieType) => {
    try {
      let url = "";

      if (movieType === "Popular") {
        url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
      } else if (movieType === "Now Playing") {
        url = `${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`;
      } else if (movieType === "Top Rated") {
        url = `${BASE_URL}/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;
      } else if (movieType === "Upcoming") {
        url = `${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`;
      } else {
        console.error("Invalid movieType:", movieType);
        return;
      }

      setNavUrl(url);

      const { data } = await axios.get(url);
      setMovieList(data.results || []);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  // Example usage:
  // getMovieData("Popular");
  // getMovieData("Now Playing");
  // getMovieData("Top Rated");
  // getMovieData("Upcoming");

  // const addFavoriteHandler = (movieId) => {
  //   const favoriteMovie = movieList.find((fav) => fav.id === Number(movieId));
  //   setFavorite((prev) => setFavorite([...prev, favoriteMovie]));
  // };
  //  const isAddToFavourite = favorite.map((fav) => fav.id).includes(Number(id));
  const addFavoriteHandler = (movieId) => {
    // Check if the movie with the given movieId is already in the favorites list
    const isAlreadyAdded = favorite.some((fav) => fav.id === Number(movieId));

    // If the movie is not already in the favorites list, add it
    if (!isAlreadyAdded) {
      const favoriteMovie = movieList.find((fav) => fav.id === Number(movieId));
      setFavorite((prev) => [...prev, favoriteMovie]);
    } else {
      // Optionally, you can show a message or handle the case where the movie is already in the favorites list
      console.log("Movie is already in favorites.");
    }
  };
  const removeFavoriteHandler = (id) => {
    const updatedFavorites = favorite.filter(
      (movie) => movie.id !== Number(id)
     
    );
    setFavorite(updatedFavorites);
     setIsFavorite(!isFavorite);
  };
  const removeWatchListHandler = (id) => {
    const updatedWatchlist = watchList.filter(
      (movie) => movie.id !== Number(id)
    );
    setWatchList(updatedWatchlist);
  };
  const isAddToFavourite = favorite.map((fav) => fav.id).includes(id);
  // const addWatchList = (movieId) => {
  //   // const isAlreadyWatchList = favorite.some(
  //   //   (fav) => fav.id === Number(movieId)
  //   // );
  //   // if (isAlreadyWatchList) return;

  //   const watchMovie = movieList.find((movie) => movie.id === Number(movieId));
  //   setWatchList((prev) => setWatchList([...prev, watchMovie]));
  // };
  const addWatchList = (movieId) => {
    // Check if the movie with the given movieId is already in the favorites list
    const isAlreadyAdded = watchList.some(
      (movie) => movie.id === Number(movieId)
    );

    // If the movie is not already in the favorites list, add it
    if (!isAlreadyAdded) {
      const watchMovie = movieList.find(
        (movie) => movie.id === Number(movieId)
      );
      setWatchList((prev) => [...prev, watchMovie]);
    } else {
      // Optionally, you can show a message or handle the case where the movie is already in the favorites list
      console.log("Movie is already in favorites.");
    }
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
        isAddToFavourite={isAddToFavourite}
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
              removeFavoriteHandler={removeFavoriteHandler}
              isAddToFavourite={isAddToFavourite}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
