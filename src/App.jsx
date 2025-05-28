import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const movie_list = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  },
  {
    Id: "27205",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://image.tmdb.org/t/p/original/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
  },

  {
    Id: "105",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://image.tmdb.org/t/p/original/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
  },
];

const selected_movie_list = [
  {
    Id: "769",
    Title: "GoodFellas",
    Year: "1990",
    Poster:
      "https://image.tmdb.org/t/p/original/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    duration: 120,
    rating: 8.4,
  },
  {
    Id: "120",
    Title: "The Lord of the Rings",
    Year: "2001",
    Poster:
      "https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    duration: 125,
    rating: 8.8,
  },
];

const api_key = "c3a794a3386a1e9481790de74e0b3f75";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  console.log(selectedMovie);

  function handleSelectedMovie(id) {
    setSelectedMovie(id);
  }

  function handleUnselectedMovie() {
    setSelectedMovie(null);
  }

  useEffect(
    function () {
      async function getMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
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
          setError(error.message);
        }

        setLoading(false);
      }

      if (query.length < 4) {
        setMovies([]);
        setError("");

        return;
      }

      getMovies();
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
          <Summary selectedMovies={selectedMovies} />
          <MyMovieList selectedMovies={selectedMovies} />

          {selectedMovie && (
            <MovieDetails
              selectedMovie={selectedMovie}
              onUnselectedMovie={handleUnselectedMovie}
            />
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

function MovieDetails({ selectedMovie, onUnselectedMovie }) {
  return (
    <div>
      <p className="alert alert-primary">{selectedMovie}</p>
      <button onClick={onUnselectedMovie} className="btn btn-danger">
        Temizle
      </button>
    </div>
  );
}

function Movie({ movie, onSelectedMovie, selectedMovieStyle }) {
  return (
    <div className="col mb-2" key={movie.id}>
      <div className={`card movie ${selectedMovieStyle === movie.id ? "selectedMovieStyle" : ""}`} onClick={() => onSelectedMovie(movie.id)}>
        <img
          src={
            `https://media.themoviedb.org/t/p/w440_and_h660_face` +
            movie.poster_path
          }
          alt={movie.title}
          className="card-img-top"
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
  const avrRating = selectedMovies.reduce(
    (acc, cur) => acc + cur.rating / selectedMovies.length,
    0
  );
  const avrDuration = selectedMovies.reduce(
    (acc, cur) => acc + cur.duration / selectedMovies.length,
    0
  );

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
            <i className="bi bi-hourglass text-warning"></i>
            <span>{avrDuration}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function MyMovieList({ selectedMovies }) {
  return (
    <>
      {selectedMovies.map((selectedMovie) => (
        <MyListMovie selectedMovie={selectedMovie} key={selectedMovie.Id} />
      ))}
    </>
  );
}

function MyListMovie({ selectedMovie }) {
  return (
    <div className="card mb-2" key={selectedMovie.Id}>
      <div className="row">
        <div className="col-4">
          <img
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h6 className="card-title">{selectedMovie.Title}</h6>
            <div className="d-flex justify-content-between">
              <p>
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>{selectedMovie.rating}</span>
              </p>
              <p>
                <i className="bi bi-hourglass text-warning me-1"></i>
                <span>{selectedMovie.duration} Dk</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
