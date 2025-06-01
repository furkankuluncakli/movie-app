export default function MyListMovie({ selectedMovie, onDeleteFromList }) {
  return (
    <div className="card mb-2" key={selectedMovie.id}>
      <div className="row">
        <div className="col-4">
          <img
            src={
              `https://media.themoviedb.org/t/p/w440_and_h660_face` +
              selectedMovie.poster_path
            }
            alt={selectedMovie.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h6 className="card-title">{selectedMovie.Title}</h6>
            <div className="d-flex justify-content-between">
              <p>
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>{selectedMovie.vote_average}</span>
              </p>
              <p>
                <i className="bi bi-hourglass text-warning me-1"></i>
                <span>{selectedMovie.runtime} Dk</span>
              </p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => onDeleteFromList(selectedMovie.id)}
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}