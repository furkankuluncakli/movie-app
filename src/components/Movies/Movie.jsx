export default function Movie({ movie, onSelectedMovie, selectedMovieStyle }) {
  return (
    <div className="col mb-2" key={movie.id}>
      <div
        className={`card movie ${
          selectedMovieStyle === movie.id ? "selectedMovieStyle" : ""
        }`}
        onClick={() => onSelectedMovie(movie.id)}
      >
        <img
          src={
            `https://media.themoviedb.org/t/p/w440_and_h660_face` +
            movie.poster_path
          }
          alt={movie.title}
          className="img-fluid rounded"
        />
        <div className="card-body">
          <h6>{movie.title}</h6>
        </div>
        <div>
          <i className="bi bi-calendar2-date me-1 p-2"></i>
          <span>{movie.release_date.slice(0, 4)}</span>
        </div>
      </div>
    </div>
  );
}