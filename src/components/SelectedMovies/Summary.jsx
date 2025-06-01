import {getAverage} from "../../Helpers"

export default function Summary({ selectedMovies }) {
  const avrRating = getAverage(selectedMovies.map((m) => m.vote_average));
  const avrDuration = getAverage(selectedMovies.map((m) => m.runtime));
  const avrUserRating = getAverage(selectedMovies.map((m) => m.userRating));

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>Listeye {selectedMovies.length} film eklendi.</h5>
        <div className="d-flex justify-content-between">
          <p>
            <i className="bi bi-star-fill text-warning"></i>
            <span>{avrRating.toFixed(2)}</span>
          </p>
          <p>
            <i className="bi bi-stars text-warning"></i>
            <span>{avrUserRating.toFixed(2)}</span>
          </p>
          <p>
            <i className="bi bi-hourglass text-warning"></i>
            <span>{avrDuration}</span>
          </p>
        </div>
      </div>
    </div>
  );
}