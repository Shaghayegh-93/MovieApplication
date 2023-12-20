import { useEffect, useState } from "react";

export default function useLocalStorage({ key, initialState }) {
  // const [value, setValue] = useState(
  //   () => JSON.parse(localStorage.getItem(key)) || initialState
  // );
   const [value, setValue] = useState(() => {
     try {
       const storedValue = localStorage.getItem(key);
       return storedValue ? JSON.parse(storedValue) : initialState;
     } catch (error) {
       console.error(`Error parsing local storage for key "${key}":`, error);
       return initialState;
     }
   });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
