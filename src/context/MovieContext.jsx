import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  //fetch the local storage and set favorites
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  //if there is any change in favorites, then update the local storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //Add to Favorite
  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  //Remove from favorites, Remove the movie with the given movieId from the previously known favorites, form a new array and set it as favorite
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  //if we want to make above make functions and props availble to children of MovieContext
  const value = { favorites, addToFavorites, removeFromFavorites, isFavorite };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export default MovieContext;
