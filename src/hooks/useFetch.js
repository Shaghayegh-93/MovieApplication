import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(url,query="") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          //   `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&id=${selectedId}`
          `${url}?${query}`
        );
        setData(data);
      } catch (error) {
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url, query]);
  return { isLoading, data };
}
