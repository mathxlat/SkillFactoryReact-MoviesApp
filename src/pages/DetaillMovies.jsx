import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore as db } from "../firebase/index";
import { useAuthContext } from "../context/AuthProvider";
import { useMovieContext } from "../context/Movies";
import { comments, favouriteMovie } from "../firebase/api";
import WatchTrailer from "../components/modals/WatchTrailer";
import Vote from "../components/modals/Vote";
import Comments from "../components/modals/Comments";

export default function DetaillMovies() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState();
  const [showTrailer, setShowTrailer] = useState(false);
  const [review, setReview] = useState({ rating: 0, comentary: "" });
  const [like, setLike] = useState(false);
  const { user } = useAuthContext();
  const { movies, setMoviesReview, getMoviesReview, favouritesMovies } =
    useMovieContext();

  const desFavouriteMovie = async (e) => {
    e.preventDefault();
    if (
      user &&
      user.hasOwnProperty("uid") &&
      movies.hasOwnProperty("favouriteMovies")
    ) {
      const usersCollection = doc(db, "users", user.uid);
      const moviesFav = await movies.favouriteMovies.filter((e) => e.id !== id);
      setDoc(
        usersCollection,
        { movieFavourites: moviesFav },
        { merge: true }
      ).then((e) => setLike(false), favouritesMovies());
    }
  };

  const getMovie = async () => {
    try {
      let movieInfo = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_KEY_API_MOVIES
        }&append_to_response=videos`
      );
      setMovie(movieInfo.data);
      const trailerid = movieInfo.data.videos.results.find(
        (video) => video.name === "Official Trailer"
      );
      setTrailer(trailerid ? trailerid : movieInfo.data.videos.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie();
    setReview({ rating: 0, comentary: "" });
  }, [id]);
  useEffect(() => {
    vote();
  }, [movie]);
  useEffect(() => {
    fav();
  }, [id, movies]);

  const rating = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (user) {
      const dataUser = { name: user.name, id: user.uid };
      // console.log(dataUser);
      await setMoviesReview(movie.id, dataUser, review);
    } else {
      navigate("/signup");
    }
  };

  const vote = async () => {
    if (movie !== undefined && movie.hasOwnProperty("id") && user) {
      console.log(movie);
      const comentary = await getMoviesReview(
        movie.id.toString(),
        user.uid.toString()
      );
      setReview(comentary.review);
    }
  };

  const fav = async () => {
    if (movies && movies.hasOwnProperty("favouriteMovies") && id) {
      const index = movies.favouriteMovies.findIndex((e) => e.id === id);
      index !== -1 ? setLike(true) : setLike(false);
    }
  };

  // comments(db, id)
  return (
    <div>
      <div className="relative h-scren z-[5]">
        <div className="absolute w-full h-screen top-0 left-0 bg-gradient-to-t from-black z-[2]"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movie && (movie.backdrop_path || movie.poster_path)
          }`}
          alt={movie?.title}
          className="absolute w-full h-screen object-cover z-[1]"
        />
        <div className="absolute flex flex-col items-center w-screen h-screen pt-64 z-[3]">
          <div className="flex flex-row">
            <img
              className="w-[15rem] h-fit"
              src={`https://image.tmdb.org/t/p/original/${
                movie && movie.poster_path
              }`}
              alt=""
            />
            <div className="pl-3 text-base">
              <h1 className="text-3xl">{movie && movie.title}</h1>
              <div>
                <span className="flex items-center">
                  {movie && movie.vote_average !== 0 && <FaStar />}
                  {movie &&
                    movie.vote_average !== 0 &&
                    movie.vote_average.toPrecision(2)}
                </span>
                <p>
                  {movie && "Released: " + movie.release_date},{" "}
                  {movie && movie.runtime !== 0 && movie.runtime + "m"}
                </p>
                <span>
                  {movie &&
                    movie.genres.map(({ name }, index) => {
                      if (movie.genres.length - 1 !== index) return `${name}-`;
                      else return `${name}`;
                    })}
                </span>
              </div>
              <p className="w-80">{movie && movie.overview}</p>
              <WatchTrailer
                showTrailer={showTrailer}
                setShowTrailer={setShowTrailer}
                trailer={trailer}
              />
              {like ? (
                <button
                  className="pl-2"
                  onClick={(e) => {
                    desFavouriteMovie(e);
                  }}
                >
                  <FaHeart />
                </button>
              ) : (
                <button
                  className="pl-2"
                  onClick={(e) => {
                    favouriteMovie(e, db, user, setLike, movie, navigate);
                  }}
                >
                  <FaRegHeart />
                </button>
              )}
              <br />
              <div className="flex">
                <Vote review={review} rating={rating} submit={submit} />
                <Vote review={review} rating={rating} submit={submit} />
                {/* <Comments /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
