import { redirect, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdPlay } from "react-icons/io";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore as db } from "../firebase/index";
import { useAuthContext } from "./../context/AuthProvider";
import Trailer from "../components/Trailer";
import YouTube from "react-youtube";

export default function DetaillMovies() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState();
  const [showTrailer, setShowTrailer] = useState(false);
  const [reviwe, setReview] = useState({ vote: 0, comentary: "" });
  const { user } = useAuthContext();

  // 33 skill factory firebase app, comienzo de e-commerce
  //https://youtu.be/VjJkWRgg-HA?t=5778
  const favouriteMovie = async (e) => {
    e.preventDefault();
    if (user) {
      const usersCollection = doc(db, "users", user.uid);
      const dataUser = await getDoc(usersCollection);
      await updateDoc(usersCollection, {
        movieFavourites: arrayUnion(id),
      });
      console.log(dataUser.data());
    } else {
      navigate("/signup");
    }
  };
  const getMovie = async () => {
    try {
      let movieInfo = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_KEY
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
  }, [id]);

  // const opts = {
  //   playerVars: {
  //     autoplay: 1,
  //   },
  // };
  console.log(movie);
  return (
    <div>
      {/* {showTrailer ? (
        <Trailer videoId={trailer.key} className="absolute z-[11]" />
      ) : null} */}
      <div className="relative h-scren z-[5]">
        <div className="absolute w-full h-screen top-0 left-0 bg-gradient-to-t from-black z-[2]"></div>
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movie && (movie.backdrop_path || movie.poster_path)
          }`}
          alt=""
          className="absolute w-full h-screen object-cover z-[1]"
        />
        {/* <YouTube videoId={trailer && trailer.key} /> */}
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
              <span>
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
            {/* Put this part before </body> tag */}
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
            <button
              className="pl-2"
              onClick={(e) => {
                favouriteMovie(e);
              }}
            >
              <FaHeart />
            </button>
            <br />
            {/* <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md mt-2">Vote</button> */}
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
                <form action="post" className="flex flex-col">
                  <div className="rating">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      // onSelect={}
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                    />
                  </div>
                  <label>comentary(optional)</label>
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Review..."
                  ></textarea>
                  <input
                    type="submit"
                    value="Send"
                    className="cursor-pointer"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//realizar pedido axios, react-youtube, boton fav y agregar al usuario que esta conectado su pelicula al array en firestore.
//features: comentarios
