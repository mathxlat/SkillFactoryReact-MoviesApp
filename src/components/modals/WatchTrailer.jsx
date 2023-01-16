import { IoMdPlay } from "react-icons/io";
import YouTube from "react-youtube";

export default function WatchTrailer({ showTrailer, setShowTrailer, trailer }) {
  return (
    <>
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
          {showTrailer ? <YouTube videoId={trailer && trailer.key} /> : null}
        </div>
      </div>
    </>
  );
}