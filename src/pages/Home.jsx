import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import { useMovieContext } from "../context/Movies";
import { useAuthContext } from "../context/AuthProvider";
import { useEffect } from "react";

function Home() {
  const { movies, favouritesMovies } = useMovieContext();
  const { user } = useAuthContext();
  const getFavouritesMovies = () => {
    if (user && user.hasOwnProperty("uid")) {
      favouritesMovies(user.uid);
    }
  };
  useEffect(()=>getFavouritesMovies(),[user])
  return (
    <div>
      <Main />
      {user && movies.favouriteMovies && movies.favouriteMovies.length > 0 ? (
        <Row
          title="Favourites Movies"
          movies={movies && movies.favouriteMovies}
        />
      ) : null}
      <Row title="Up Coming" movies={movies && movies.upComing} />
      <Row title="Popular" movies={movies && movies.popular} />
      <Row title="Trending" movies={movies && movies.trending} />
      <Row title="TopRated" movies={movies && movies.topRated} />
      <Row title="Horror" movies={movies && movies.horror} />
    </div>
  );
}

export default Home;