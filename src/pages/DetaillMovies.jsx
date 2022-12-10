import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { IoMdPlay } from "react-icons/io";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { firestore as db } from "../firebase/index";
import { useAuthContext } from "../context/AuthProvider";
import YouTube from "react-youtube";
import { useMovieContext } from "../context/Movies";

export default function DetaillMovies() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState();
  const [showTrailer, setShowTrailer] = useState(false);
  const [review, setReview] = useState({ rating: 0, comentary: "" });
  const [like, setLike] = useState(false);
  const { user } = useAuthContext();
  const { movies, setMoviesReview, getMoviesReview, favouritesMovies } = useMovieContext();

  const favouriteMovie = async (e) => {
    e.preventDefault();
    if (user && user.hasOwnProperty("uid")) {
      const usersCollection = doc(db, "users", user.uid);
      setLike(true);
      const data = {
        id: movie.id.toString(),
        backdrop_path: movie.backdrop_path,
        title: movie.title,
      };
      await setDoc(
        usersCollection,
        {
          movieFavourites: arrayUnion(data),
        },
        { merge: true }
      );
    } else {
      navigate("/signup");
    }
  };

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
      ).then(e=>setLike(false), favouritesMovies())
      // setLike(false);
      // favouritesMovies()
    }
  };

  const getMovie = async () => {
    try {
      let movieInfo = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_KEY_API_MOVIES
        }&append_to_response=videos`
      );
      // https://api.themoviedb.org/3/movie/?api_key=${import.meta.env.VITE_KEY}&append_to_response=videos
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
  console.log(movies);
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
        <div className="absolute flex justify-center w-screen h-screen pt-96 z-[3]">
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
            <label
              htmlFor="my-modal-3"
              className="btn"
              onClick={() => setShowTrailer(true)}
            >
              <IoMdPlay />
              Watch Trailer
            </label>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative w-auto h-auto max-w-none">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                  onClick={() => setShowTrailer(false)}
                >
                  ✕
                </label>
                {showTrailer ? (
                  <YouTube videoId={trailer && trailer.key} />
                ) : null}
              </div>
            </div>
            {like ? (
              <button
                className="pl-2"
                onClick={(e) => {
                  desFavouriteMovie(e);
                }}
              >
                <FaHeart />
                {/* realizar la logica de desfavear */}
              </button>
            ) : (
              <button
                className="pl-2"
                onClick={(e) => {
                  favouriteMovie(e);
                }}
              >
                <FaRegHeart />
              </button>
            )}
            <br />
            <label htmlFor="my-modal-4" className="btn mt-2">
              Vote
            </label>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative w-auto h-auto max-w-none">
                <label
                  htmlFor="my-modal-4"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(), submit(e);
                  }}
                  className="flex flex-col"
                  htmlFor="my-modal-4"
                >
                  <div className="rating">
                    <input
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-orange-400"
                      value={1}
                      onChange={(e) => rating(e)}
                    />
                    <input
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-orange-400"
                      value={2}
                      onChange={(e) => rating(e)}
                    />
                    <input
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-orange-400"
                      value={3}
                      onChange={(e) => rating(e)}
                    />
                    <input
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-orange-400"
                      value={4}
                      onChange={(e) => rating(e)}
                    />
                    <input
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-orange-400"
                      value={5}
                      onChange={(e) => rating(e)}
                    />
                  </div>
                  <label>comentary(optional)</label>
                  <textarea
                    name="comentary"
                    className="textarea textarea-bordered"
                    placeholder="Review..."
                    value={review.comentary}
                    onChange={(e) => rating(e)}
                  ></textarea>
                  <label
                    htmlFor="my-modal-4"
                    className="btn z-30"
                    onClick={(e) => {
                      submit(e);
                    }}
                  >
                    Send
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
