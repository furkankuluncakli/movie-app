import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import StarRating from "./StarRating";

const getAverage = (array) =>
  array.reduce((sum, value) => sum + value / array.length, 0);

const api_key = "c3a794a3386a1e9481790de74e0b3f75";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleSelectedMovie(id) {
    setSelectedMovie((selectedMovie) => (selectedMovie === id ? null : id));
  }

  function handleUnselectedMovie() {
    setSelectedMovie(null);
  }

  function handleAddToSelectedList(movie) {
    setSelectedMovies((selectedMovies) => [...selectedMovies, movie]);
    handleUnselectedMovie();
  }

  function handleDeleteFromList(id) {
    setSelectedMovies((selectedMovies) =>
      selectedMovies.filter((m) => m.id !== id)
    );
  }

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function getMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`,
            { signal: signal }
          );

          if (!res.ok) {
            throw new Error("Bilinmeyen bir hata oluştu.");
          }

          const data = await res.json();

          if (data.total_results === 0) {
            throw new Error("Film bulunamadı");
          }

          setMovies(data.results);
          setLoading(false);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("aborted...");
          } else {
            setError(error.message);
          }
        }

        setLoading(false);
      }

      if (query.length < 4) {
        setMovies([]);
        setError("");

        return;
      }

      getMovies();

      return () => {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NavSearchResult movies={movies} />
      </Nav>
      <Main>
        <ListContainer>
          {loading && <Loading />}
          {!loading && !error && (
            <MovieList
              movies={movies}
              onSelectedMovie={handleSelectedMovie}
              selectedMovieStyle={selectedMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </ListContainer>
        <ListContainer>
          {selectedMovie ? (
            <MovieDetails
              selectedMovie={selectedMovie}
              onUnselectedMovie={handleUnselectedMovie}
              onAddSelectedMovie={handleAddToSelectedList}
              selectedMovies={selectedMovies}
            />
          ) : (
            <>
              <Summary selectedMovies={selectedMovies} />
              <MyMovieList
                selectedMovies={selectedMovies}
                onDeleteFromList={handleDeleteFromList}
              />
            </>
          )}
        </ListContainer>
      </Main>
    </>
  );
}

function Loading() {
  return (
    <div className="spinner-border" role="status">
      <span className="sr-only"></span>
    </div>
  );
}

function ErrorMessage({ message }) {
  return <div className="alert alert-danger">{message}</div>;
}

function Nav({ children }) {
  return (
    <nav className="bg-primary text-white p-2">
      <div className="container">
        <div className="row align-items-center">{children}</div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="col-4">
      <i className="bi bi-camera-reels me-2"></i>
      Movie App
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <div className="col-4">
      <input
        type="text"
        className="form-control"
        placeholder="Film arayın..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </div>
  );
}

function NavSearchResult({ movies }) {
  return (
    <div className="col-4 text-end">
      <strong>{movies.length}</strong> kayıt bulundu
    </div>
  );
}

function Main({ children }) {
  return (
    <main className="container">
      <div className="row mt-2">
        <div className="col-md-9">{children[0]}</div>
        <div className="col-md-3">{children[1]}</div>
      </div>
    </main>
  );
}

function ListContainer({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function handleOpenMovie() {
    setIsOpen((open) => !open);
  }
  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={handleOpenMovie}
      >
        {isOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectedMovie, selectedMovieStyle }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.id}
          onSelectedMovie={onSelectedMovie}
          selectedMovieStyle={selectedMovieStyle}
        />
      ))}
    </div>
  );
}

function MovieDetails({
  selectedMovie,
  onUnselectedMovie,
  onAddSelectedMovie,
  selectedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  useEffect(
    function () {
      async function getMovieDetails() {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${api_key}`
        );
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      }
      getMovieDetails();
    },
    [selectedMovie]
  );

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

function Movie({ movie, onSelectedMovie, selectedMovieStyle }) {
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

function Summary({ selectedMovies }) {
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

function MyMovieList({ selectedMovies, onDeleteFromList }) {
  return (
    <>
      {selectedMovies.map((selectedMovie) => (
        <MyListMovie
          selectedMovie={selectedMovie}
          key={selectedMovie.id}
          onDeleteFromList={onDeleteFromList}
        />
      ))}
    </>
  );
}

function MyListMovie({ selectedMovie, onDeleteFromList }) {
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
