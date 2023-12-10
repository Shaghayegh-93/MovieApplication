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
  const [movie, setMovie] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  let url = BASE_URL + "/movie/popular?api_key=" + API_KEY;
  const [navUrl, setNavUrl] = useState(url);
  const [id, setId] = useState(null);

  let single = BASE_URL + `/movie/${id}`;

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


  //   case "popular":
  //     {
  //       const URL = BASE_URL + "/movie/popular?api_key=" + API_KEY;
  //       setNavUrl(URL);
  //     }
  //     break;
  //   case "Now Playing":
  //     {
  //       const URL =
  //         BASE_URL +
  //         "/movie/now_playing?language=en-US&page=1&api_key=" +
  //         API_KEY;
  //       setNavUrl(URL);
  //     }
  //     break;
  //   case "Top Rated":
  //     {
  //       const URL =
  //         BASE_URL +
  //         "/movie/top_rated?language=en-US&page=1&api_key=" +
  //         API_KEY;
  //       setNavUrl(URL);
  //     }
  //     break;
  //   case "Upcoming":
  //     {
  //       const URL =
  //         BASE_URL + "/movie/upcoming?language=en-US&page=1&api_key=" + API_KEY;
  //       setNavUrl(URL);
  //     }
  //     break;

  //   default: {
  //   }

  // }

  // const getSelectedMovieId=(id)=>{
  //   setId(Number(id))
  // }
  // const routeParams = useParams();
  // console.log("idddd", routeParams);
  return (
    <div className="bg-gray-100">
      <Nav getMovieData={getMovieData} />
      <Routes>
        <Route
          path="/"
          index
          element={<Movielist movieList={movieList} id={id} setId={setId} />}
        />
        <Route path="/movie/:id" element={<MovieInfo movie={movie} />} />
      </Routes>
    </div>
  );
}

export default App;
