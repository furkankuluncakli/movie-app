import { useState } from "react";
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

export default function App() {
  const [movies, setMovies] = useState(movie_list);

  return (
    <>
      <Nav>
        <Logo />
        <Search />
        <NavSearchResult movies={movies} />
      </Nav>
      <Main>
        <MovieListContainer>
          <MovieList movies={movies} />
        </MovieListContainer>
      </Main>
    </>
  );
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

function Search() {
  return (
    <div className="col-4">
      <input
        type="text"
        className="form-control"
        placeholder="Film arayın..."
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
        <div className="col-md-9">{children}</div>
        <div className="col-md-3">
          <SelectedMovieListContainer />
        </div>
      </div>
    </main>
  );
}

function MovieListContainer({ children }) {
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

function MovieList({ movies }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.Id} />
      ))}
    </div>
  );
}

function Movie({ movie }) {
  return (
    <div className="col mb-2" key={movie.Id}>
      <div className="card">
        <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
        <div className="card-body">
          <h6>{movie.Title}</h6>
        </div>
        <div>
          <i className="bi bi-calendar2-date me-1"></i>
          <span>{movie.Year}</span>
        </div>
      </div>
    </div>
  );
}

function SelectedMovieListContainer() {
  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedMovies, setSelectedMovies] = useState(selected_movie_list);

  function handleSelectedOpenMovie() {
    setIsOpen2((open) => !open);
  }
  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={handleSelectedOpenMovie}
      >
        {isOpen2 ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>

      {isOpen2 && (
        <>
          <Summary selectedMovies={selectedMovies} />
          <MyMovieList selectedMovies={selectedMovies} />
        </>
      )}
    </div>
  );
}

function Summary({ selectedMovies }) {
  const avrRating =
    selectedMovies.reduce((acc, cur) => acc + cur.rating, 0) /
    selectedMovies.length;
  const avrDuration =
    selectedMovies.reduce((acc, cur) => acc + cur.duration, 0) /
    selectedMovies.length;
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
      {selectedMovies.map((selectedMovies) => (
        <MyListMovie selectedMovies={selectedMovies} />
      ))}
    </>
  );
}

function MyListMovie({ selectedMovies }) {
  return (
    <div className="card mb-2" key={selectedMovies.Id}>
      <div className="row">
        <div className="col-4">
          <img
            src={selectedMovies.Poster}
            alt={selectedMovies.Title}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h6 className="card-title">{selectedMovies.Title}</h6>
            <div className="d-flex justify-content-between">
              <p>
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>{selectedMovies.rating}</span>
              </p>
              <p>
                <i className="bi bi-hourglass text-warning me-1"></i>
                <span>{selectedMovies.duration} Dk</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
