import { useState } from "react";
import Loading from "../Loading";
import StarRating from "../StarRating";
import useMovieDetails from "../../hooks/useMovieDetails";

export default function MovieDetails({
  selectedMovie,
  onUnselectedMovie,
  onAddSelectedMovie,
  selectedMovies,
}) {
  const [userRating, setUserRating] = useState("");

  const { movie, loading } = useMovieDetails(selectedMovie);

  const isAddedToList = selectedMovies.map((m) => m.id).includes(selectedMovie);
  const selectedMovieUserRating = selectedMovies.find(
    (m) => m.id === selectedMovie
  )?.userRating;

  function handleAddToList() {
    const newMovie = {
      ...movie,
      userRating,
    };
    onAddSelectedMovie(newMovie);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="border p-2 mb-3">
            <div className="row">
              <div className="col-4">
                <img
                  src={
                    `https://media.themoviedb.org/t/p/w440_and_h660_face` +
                    movie.poster_path
                  }
                  alt={movie.title}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-8">
                <h6>{movie.title}</h6>
                <p>
                  <i className="bi bi-calendar2-date me-1 p-2"></i>
                  <span>
                    {movie.release_date ? movie.release_date.slice(0, 4) : ""}
                  </span>
                </p>
                <p>
                  <i className="bi bi-star-fill text-warning"></i>
                  <span>{movie.vote_average}</span>
                </p>
              </div>
              <div className="col-12 border-top p-3 mt-3">
                <p>{movie.overview}</p>
                <p>
                  {movie.genres &&
                    movie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="badge text-bg-primary me-1"
                      >
                        {genre.name}
                      </span>
                    ))}
                </p>
                {!isAddedToList ? (
                  <>
                    <div className="my-4">
                      <StarRating
                        maxRating={10}
                        size={20}
                        onRating={setUserRating}
                      />
                    </div>
                    <button
                      onClick={() => handleAddToList(movie)}
                      className="btn btn-primary me-1"
                    >
                      Listeye Ekle
                    </button>
                  </>
                ) : (
                  <p className="alert text-danger">
                    Filmi zaten listeye eklediniz.
                    <br />
                    <i className="bi bi-stars text-warning">
                      Değerlendirmeniz :{selectedMovieUserRating}
                    </i>
                  </p>
                )}

                <button onClick={onUnselectedMovie} className="btn btn-danger">
                  Temizle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
